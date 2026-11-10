import mongoose from 'mongoose';

const clientProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      default: '',
      trim: true,
    },
    industry: {
      type: String,
      default: 'Technology',
    },
    website: {
      type: String,
      default: '',
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    projectsPostedCount: {
      type: Number,
      default: 0,
    },
    paymentVerified: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('ClientProfile', clientProfileSchema);
