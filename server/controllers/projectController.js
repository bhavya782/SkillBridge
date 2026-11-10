import Project from '../models/Project.js';
import Proposal from '../models/Proposal.js';
import FreelancerProfile from '../models/FreelancerProfile.js';
import { IntelligenceEngine } from '../services/intelligenceEngine.js';

// @desc    Get all projects with filtering and search
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { category, search, minBudget, maxBudget, experienceLevel, status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    } else {
      query.status = { $ne: 'cancelled' };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (experienceLevel && experienceLevel !== 'All') {
      query.experienceLevel = experienceLevel;
    }

    if (minBudget || maxBudget) {
      query.budgetMax = {};
      if (minBudget) query.budgetMax.$gte = Number(minBudget);
      if (maxBudget) query.budgetMax.$lte = Number(maxBudget);
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skillsRequired: { $regex: search, $options: 'i' } },
      ];
    }

    const projects = await Project.find(query)
      .populate('client', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project details + AI analysis for viewing freelancer
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'name email avatar')
      .populate({
        path: 'proposalsCount',
      });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Client only)
export const createProject = async (req, res) => {
  try {
    const { title, description, category, skillsRequired, budgetMin, budgetMax, deadline, experienceLevel } = req.body;

    const project = await Project.create({
      client: req.user._id,
      title,
      description,
      category,
      skillsRequired: Array.isArray(skillsRequired) 
        ? skillsRequired 
        : (skillsRequired ? skillsRequired.split(',').map((s) => s.trim()) : []),
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      deadline: new Date(deadline),
      experienceLevel: experienceLevel || 'Intermediate',
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get client's posted projects
// @route   GET /api/projects/my/client
// @access  Private (Client only)
export const getMyClientProjects = async (req, res) => {
  try {
    const projects = await Project.find({ client: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get AI Matched Freelancers for a project
// @route   GET /api/projects/:id/talent-matches
// @access  Private (Client only)
export const getProjectTalentMatches = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const freelancerProfiles = await FreelancerProfile.find()
      .populate('user', 'name email avatar bio location');

    const matches = freelancerProfiles.map((profile) => {
      const matchResult = IntelligenceEngine.calculateTalentMatch(profile, project);
      return {
        freelancer: profile.user,
        profile,
        ...matchResult,
      };
    });

    // Sort descending by match percentage
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Skill Gap Detection for current freelancer on a project
// @route   GET /api/projects/:id/skill-gap
// @access  Private (Freelancer)
export const getProjectSkillGap = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const profile = await FreelancerProfile.findOne({ user: req.user._id });
    const freelancerSkills = profile ? profile.skills : [];

    const gapReport = IntelligenceEngine.detectSkillGaps(freelancerSkills, project.skillsRequired);

    res.json({ success: true, data: gapReport });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
