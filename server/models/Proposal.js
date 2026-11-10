import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bidAmount: {
      type: Number,
      required: [true, 'Please provide your proposed bid amount'],
    },
    deliveryDays: {
      type: Number,
      required: [true, 'Please provide estimated delivery time in days'],
    },
    coverLetter: {
      type: String,
      required: [true, 'Please provide a cover letter'],
      minlength: 20,
    },
    portfolioLinks: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending',
    },
    // AI Smart Bid Analysis snapshot
    analysis: {
      score: { type: Number, default: 80 },
      budgetCompatibility: { type: String, default: 'Within Budget' },
      deliveryFeasibility: { type: String, default: 'Realistic' },
      completenessScore: { type: Number, default: 85 },
      recommendations: [{ type: String }],
    },
  },
  { timestamps: true }
);

// Prevent duplicate active proposals on same project from same freelancer
proposalSchema.index({ project: 1, freelancer: 1 }, { unique: true });

export default mongoose.model('Proposal', proposalSchema);
