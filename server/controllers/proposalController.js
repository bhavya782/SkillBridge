import Proposal from '../models/Proposal.js';
import Project from '../models/Project.js';
import FreelancerProfile from '../models/FreelancerProfile.js';
import Notification from '../models/Notification.js';
import { IntelligenceEngine } from '../services/intelligenceEngine.js';

// @desc    Submit a proposal
// @route   POST /api/proposals
// @access  Private (Freelancer)
export const submitProposal = async (req, res) => {
  try {
    const { projectId, bidAmount, deliveryDays, coverLetter, portfolioLinks } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.status !== 'open' && project.status !== 'bidding') {
      return res.status(400).json({ success: false, message: 'Project is not currently accepting proposals' });
    }

    // Check duplicate
    const existing = await Proposal.findOne({ project: projectId, freelancer: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already submitted an active proposal for this project' });
    }

    const freelancerProfile = await FreelancerProfile.findOne({ user: req.user._id });

    // Perform Smart Bid Analysis
    const analysis = IntelligenceEngine.analyzeBid(
      {
        bidAmount: Number(bidAmount),
        deliveryDays: Number(deliveryDays),
        coverLetter,
        freelancerExperience: freelancerProfile ? freelancerProfile.experienceYears : 2,
      },
      project
    );

    const proposal = await Proposal.create({
      project: projectId,
      freelancer: req.user._id,
      bidAmount: Number(bidAmount),
      deliveryDays: Number(deliveryDays),
      coverLetter,
      portfolioLinks: Array.isArray(portfolioLinks) ? portfolioLinks : (portfolioLinks ? [portfolioLinks] : []),
      analysis,
    });

    // Update project count
    await Project.findByIdAndUpdate(projectId, {
      $inc: { proposalsCount: 1 },
      status: 'bidding',
    });

    // Notify client
    await Notification.create({
      recipient: project.client,
      sender: req.user._id,
      type: 'proposal',
      title: 'New Proposal Received',
      message: `${req.user.name} submitted a $${bidAmount} proposal on '${project.title}'`,
      link: `/client/projects/${projectId}/proposals`,
    });

    res.status(201).json({ success: true, data: proposal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get proposals for a project (Client view)
// @route   GET /api/proposals/project/:projectId
// @access  Private (Client of project or Admin)
export const getProjectProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ project: req.params.projectId })
      .populate('freelancer', 'name email avatar bio location')
      .sort({ 'analysis.score': -1 });

    res.json({ success: true, count: proposals.length, data: proposals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get freelancer's submitted proposals
// @route   GET /api/proposals/my
// @access  Private (Freelancer)
export const getMyProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ freelancer: req.user._id })
      .populate('project', 'title category budgetMin budgetMax deadline status')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: proposals.length, data: proposals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
