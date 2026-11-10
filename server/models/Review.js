import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    onTimeDelivery: {
      type: Boolean,
      default: true,
    },
    qualityScore: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
