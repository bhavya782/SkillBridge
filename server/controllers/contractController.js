import Contract from '../models/Contract.js';
import Milestone from '../models/Milestone.js';
import Proposal from '../models/Proposal.js';
import Project from '../models/Project.js';
import Payment from '../models/Payment.js';
import FreelancerProfile from '../models/FreelancerProfile.js';
import ClientProfile from '../models/ClientProfile.js';
import Notification from '../models/Notification.js';

// @desc    Accept proposal and create contract with initial milestones
// @route   POST /api/contracts/accept-proposal
// @access  Private (Client)
export const acceptProposalAndCreateContract = async (req, res) => {
  try {
    const { proposalId, milestones = [] } = req.body;

    const proposal = await Proposal.findById(proposalId)
      .populate('project')
      .populate('freelancer');

    if (!proposal) {
      return res.status(404).json({ success: false, message: 'Proposal not found' });
    }

    const project = proposal.project;

    // Check ownership
    if (project.client.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to accept proposals for this project' });
    }

    // Set proposal accepted
    proposal.status = 'accepted';
    await proposal.save();

    // Reject other proposals
    await Proposal.updateMany(
      { project: project._id, _id: { $ne: proposal._id } },
      { status: 'rejected' }
    );

    // Calculate delivery date
    const deliveryDeadline = new Date();
    deliveryDeadline.setDate(deliveryDeadline.getDate() + (proposal.deliveryDays || 14));

    // Create contract
    const contract = await Contract.create({
      project: project._id,
      client: req.user._id,
      freelancer: proposal.freelancer._id,
      proposal: proposal._id,
      totalAmount: proposal.bidAmount,
      deliveryDeadline,
      status: 'active',
    });

    // Create default milestones if none provided
    const milestoneDocs = [];
    if (milestones.length > 0) {
      for (const m of milestones) {
        const doc = await Milestone.create({
          contract: contract._id,
          title: m.title,
          description: m.description || '',
          amount: Number(m.amount),
          dueDate: m.dueDate ? new Date(m.dueDate) : deliveryDeadline,
          status: 'pending',
        });
        milestoneDocs.push(doc._id);
      }
    } else {
      // Create 2 default balanced milestones (50% Milestone 1, 50% Final Deliverable)
      const halfAmount = Math.round(proposal.bidAmount / 2);
      const midDate = new Date();
      midDate.setDate(midDate.getDate() + Math.round(proposal.deliveryDays / 2));

      const m1 = await Milestone.create({
        contract: contract._id,
        title: 'Phase 1: Architecture, Core Components & Design Approval',
        description: 'Initial structural implementation and milestone demo review.',
        amount: halfAmount,
        dueDate: midDate,
        status: 'in-progress',
      });
      const m2 = await Milestone.create({
        contract: contract._id,
        title: 'Phase 2: Final Integration, Testing & Production Deliverables',
        description: 'Complete codebase, documentation and deployment verification.',
        amount: proposal.bidAmount - halfAmount,
        dueDate: deliveryDeadline,
        status: 'pending',
      });
      milestoneDocs.push(m1._id, m2._id);
    }

    contract.milestones = milestoneDocs;
    await contract.save();

    // Update project state
    project.status = 'in-progress';
    project.acceptedProposal = proposal._id;
    project.contract = contract._id;
    await project.save();

    // Notify Freelancer
    await Notification.create({
      recipient: proposal.freelancer._id,
      sender: req.user._id,
      type: 'contract',
      title: 'Proposal Accepted! Contract Created',
      message: `Congratulations! Your proposal on '${project.title}' was accepted. Contract is now active.`,
      link: `/freelancer/contracts`,
    });

    res.status(201).json({ success: true, data: contract });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's contracts (both client and freelancer)
// @route   GET /api/contracts/my
// @access  Private
export const getMyContracts = async (req, res) => {
  try {
    const filter = req.user.role === 'client' 
      ? { client: req.user._id } 
      : { freelancer: req.user._id };

    const contracts = await Contract.find(filter)
      .populate('project', 'title category skillsRequired deadline')
      .populate('client', 'name email avatar')
      .populate('freelancer', 'name email avatar')
      .populate('milestones')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: contracts.length, data: contracts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single contract with all milestones
// @route   GET /api/contracts/:id
// @access  Private
export const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('project')
      .populate('client', 'name email avatar')
      .populate('freelancer', 'name email avatar')
      .populate('milestones');

    if (!contract) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    // Authorization check
    if (
      contract.client._id.toString() !== req.user._id.toString() &&
      contract.freelancer._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ success: false, message: 'Access denied to this contract' });
    }

    res.json({ success: true, data: contract });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit deliverable for a milestone
// @route   PUT /api/contracts/milestones/:milestoneId/submit
// @access  Private (Freelancer)
export const submitMilestoneWork = async (req, res) => {
  try {
    const { deliverableUrl, submissionNotes } = req.body;
    const milestone = await Milestone.findById(req.params.milestoneId).populate('contract');

    if (!milestone) {
      return res.status(404).json({ success: false, message: 'Milestone not found' });
    }

    milestone.deliverableUrl = deliverableUrl;
    milestone.submissionNotes = submissionNotes;
    milestone.submittedAt = new Date();
    milestone.status = 'submitted';
    await milestone.save();

    // Notify Client
    await Notification.create({
      recipient: milestone.contract.client,
      sender: req.user._id,
      type: 'milestone',
      title: 'Milestone Deliverable Submitted',
      message: `Deliverable submitted for "${milestone.title}". Ready for review.`,
      link: `/client/contracts`,
    });

    res.json({ success: true, data: milestone });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve milestone work & release simulated payment
// @route   PUT /api/contracts/milestones/:milestoneId/approve
// @access  Private (Client)
export const approveMilestoneWork = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.milestoneId).populate('contract');
    if (!milestone) {
      return res.status(404).json({ success: false, message: 'Milestone not found' });
    }

    milestone.status = 'approved';
    milestone.paidAt = new Date();
    await milestone.save();

    const contract = await Contract.findById(milestone.contract._id).populate('milestones');
    contract.paidAmount += milestone.amount;

    // Check if all milestones approved -> complete contract
    const allApproved = contract.milestones.every((m) => m.status === 'approved');
    if (allApproved) {
      contract.status = 'completed';
      contract.completedAt = new Date();

      await Project.findByIdAndUpdate(contract.project, { status: 'completed' });
      await FreelancerProfile.findOneAndUpdate(
        { user: contract.freelancer },
        { 
          $inc: { completedProjectsCount: 1, totalEarnings: contract.totalAmount },
        }
      );
      await ClientProfile.findOneAndUpdate(
        { user: contract.client },
        { $inc: { totalSpent: contract.totalAmount } }
      );
    }
    await contract.save();

    // Create payment record
    const payment = await Payment.create({
      contract: contract._id,
      milestone: milestone._id,
      client: contract.client,
      freelancer: contract.freelancer,
      amount: milestone.amount,
      status: 'completed',
      paymentMethod: 'Stripe Simulated Escrow',
      transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    });

    // Notify Freelancer
    await Notification.create({
      recipient: contract.freelancer,
      sender: req.user._id,
      type: 'payment',
      title: 'Milestone Approved & Payment Released',
      message: `Client approved "${milestone.title}". $${milestone.amount} has been credited to your earnings.`,
      link: `/freelancer/contracts`,
    });

    res.json({ success: true, message: 'Milestone approved and payment credited', milestone, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
