import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Web Development',
        'Mobile Development',
        'AI & Machine Learning',
        'UI/UX Design',
        'DevOps & Cloud',
        'Data Engineering',
        'Blockchain & Web3',
      ],
      default: 'Web Development',
    },
    skillsRequired: [
      {
        type: String,
        trim: true,
      },
    ],
    budgetMin: {
      type: Number,
      required: true,
      default: 100,
    },
    budgetMax: {
      type: Number,
      required: true,
      default: 1000,
    },
    deadline: {
      type: Date,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ['Entry', 'Intermediate', 'Expert'],
      default: 'Intermediate',
    },
    status: {
      type: String,
      enum: ['open', 'bidding', 'in-progress', 'completed', 'cancelled', 'disputed'],
      default: 'open',
    },
    proposalsCount: {
      type: Number,
      default: 0,
    },
    acceptedProposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
    },
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
