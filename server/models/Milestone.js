import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'submitted', 'approved', 'revision-requested'],
      default: 'pending',
    },
    deliverableUrl: {
      type: String,
      default: '',
    },
    submissionNotes: {
      type: String,
      default: '',
    },
    submittedAt: {
      type: Date,
    },
    revisionNotes: {
      type: String,
      default: '',
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Milestone', milestoneSchema);
