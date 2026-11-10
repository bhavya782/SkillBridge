import mongoose from 'mongoose';

const freelancerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    title: {
      type: String,
      default: 'Full-Stack Developer',
      trim: true,
    },
    hourlyRate: {
      type: Number,
      default: 35,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    experienceYears: {
      type: Number,
      default: 2,
    },
    githubUrl: {
      type: String,
      default: '',
    },
    linkedinUrl: {
      type: String,
      default: '',
    },
    portfolioUrl: {
      type: String,
      default: '',
    },
    overview: {
      type: String,
      default: 'Experienced software engineer focused on building performant web applications.',
    },
    trustScore: {
      type: Number,
      default: 85,
      min: 0,
      max: 100,
    },
    trustBreakdown: {
      completedProjectsWeight: { type: Number, default: 30 },
      ratingsWeight: { type: Number, default: 25 },
      onTimeDeliveryWeight: { type: Number, default: 20 },
      verifiedEvidenceWeight: { type: Number, default: 15 },
      disputePenalty: { type: Number, default: 0 },
    },
    completedProjectsCount: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    availability: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available',
    },
  },
  { timestamps: true }
);

export default mongoose.model('FreelancerProfile', freelancerProfileSchema);
