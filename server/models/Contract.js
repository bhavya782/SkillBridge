import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    proposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    deliveryDeadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'in-progress', 'completed', 'disputed', 'cancelled'],
      default: 'active',
    },
    milestones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Milestone',
      },
    ],
    terms: {
      type: String,
      default: 'Standard SkillBridge Freelance Terms and Quality Assurance.',
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Contract', contractSchema);
