import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import FreelancerProfile from '../models/FreelancerProfile.js';
import ClientProfile from '../models/ClientProfile.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'skillbridge_super_secret_jwt_key_2026_dev_mode',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, title, skills, hourlyRate, companyName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'freelancer',
    });

    // Create corresponding profile
    if (user.role === 'freelancer') {
      await FreelancerProfile.create({
        user: user._id,
        title: title || 'Full-Stack Developer',
        skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map((s) => s.trim()) : ['React', 'Node.js', 'JavaScript']),
        hourlyRate: hourlyRate || 35,
      });
    } else if (user.role === 'client') {
      await ClientProfile.create({
        user: user._id,
        companyName: companyName || `${name}'s Projects`,
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let profile = null;

    if (user.role === 'freelancer') {
      profile = await FreelancerProfile.findOne({ user: user._id });
    } else if (user.role === 'client') {
      profile = await ClientProfile.findOne({ user: user._id });
    }

    res.json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, location, avatar, ...extraFields } = req.body;

    const user = await User.findById(req.user.id);
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (location) user.location = location;
    if (avatar) user.avatar = avatar;
    await user.save();

    let profile = null;
    if (user.role === 'freelancer') {
      profile = await FreelancerProfile.findOneAndUpdate(
        { user: user._id },
        { $set: extraFields },
        { new: true, upsert: true }
      );
    } else if (user.role === 'client') {
      profile = await ClientProfile.findOneAndUpdate(
        { user: user._id },
        { $set: extraFields },
        { new: true, upsert: true }
      );
    }

    res.json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
