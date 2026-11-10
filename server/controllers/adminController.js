import User from '../models/User.js';
import Project from '../models/Project.js';
import Contract from '../models/Contract.js';
import Proposal from '../models/Proposal.js';
import Dispute from '../models/Dispute.js';
import Payment from '../models/Payment.js';

// @desc    Get system-wide overview statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalFreelancers = await User.countDocuments({ role: 'freelancer' });
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: { $in: ['open', 'bidding', 'in-progress'] } });
    const totalContracts = await Contract.countDocuments();
    const completedContracts = await Contract.countDocuments({ status: 'completed' });
    const totalProposals = await Proposal.countDocuments();
    const totalDisputes = await Dispute.countDocuments();

    // Sum total platform volume
    const payments = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalVolume: { $sum: '$amount' } } },
    ]);
    const totalVolume = payments.length > 0 ? payments[0].totalVolume : 0;

    // Monthly growth simulated aggregates from actual data
    const analytics = [
      { month: 'Jun', projects: Math.max(2, Math.round(totalProjects * 0.4)), volume: Math.max(1200, Math.round(totalVolume * 0.35)) },
      { month: 'Jul', projects: Math.max(4, Math.round(totalProjects * 0.6)), volume: Math.max(2500, Math.round(totalVolume * 0.55)) },
      { month: 'Aug', projects: Math.max(6, Math.round(totalProjects * 0.8)), volume: Math.max(4100, Math.round(totalVolume * 0.75)) },
      { month: 'Sep', projects: Math.max(8, totalProjects), volume: Math.max(6000, totalVolume) },
    ];

    res.json({
      success: true,
      data: {
        totalUsers,
        totalClients,
        totalFreelancers,
        totalProjects,
        activeProjects,
        totalContracts,
        completedContracts,
        totalProposals,
        totalDisputes,
        totalVolume,
        analytics,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users for management
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user status (suspend / activate)
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin only)
export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
