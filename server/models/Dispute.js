import mongoose from 'mongoose';

const disputeSchema = new mongoose.Schema(
  {
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: true,
    },
    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
      required: true,
      enum: [
        'Milestone Deliverable Unsatisfactory',
        'Missed Deadlines',
        'Communication Breakdown',
        'Scope Disagreement',
        'Payment Issue',
      ],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'in-review', 'resolved', 'dismissed'],
      default: 'open',
    },
    resolutionNotes: {
      type: String,
      default: '',
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Dispute', disputeSchema);
