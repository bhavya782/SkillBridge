import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import FreelancerProfile from '../models/FreelancerProfile.js';
import ClientProfile from '../models/ClientProfile.js';
import Project from '../models/Project.js';
import Proposal from '../models/Proposal.js';
import Contract from '../models/Contract.js';
import Milestone from '../models/Milestone.js';
import Payment from '../models/Payment.js';
import { IntelligenceEngine } from '../services/intelligenceEngine.js';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillbridge';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 });
    console.log('[Seed] Connected to MongoDB for seeding...');

    // Clear existing
    await User.deleteMany();
    await FreelancerProfile.deleteMany();
    await ClientProfile.deleteMany();
    await Project.deleteMany();
    await Proposal.deleteMany();
    await Contract.deleteMany();
    await Milestone.deleteMany();
    await Payment.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // 1. Create Users
    const admin = await User.create({
      name: 'Eleanor Vance (Admin)',
      email: 'admin@skillbridge.io',
      password: passwordHash,
      role: 'admin',
      bio: 'SkillBridge Platform Security and Operations Administrator',
      location: 'San Francisco, CA',
    });

    const client1 = await User.create({
      name: 'Marcus Sterling',
      email: 'client@skillbridge.io',
      password: passwordHash,
      role: 'client',
      bio: 'Head of Product at Nexus Dynamics. Building enterprise AI applications.',
      location: 'New York, NY',
    });

    const freelancer1 = await User.create({
      name: 'Aria Chen',
      email: 'freelancer@skillbridge.io',
      password: passwordHash,
      role: 'freelancer',
      bio: 'Senior Full-Stack & AI Systems Architect. 6+ years specializing in React, Node, Python & Vector DBs.',
      location: 'Seattle, WA',
    });

    const freelancer2 = await User.create({
      name: 'Liam Vance',
      email: 'liam@skillbridge.io',
      password: passwordHash,
      role: 'freelancer',
      bio: 'Lead UI/UX Designer and Frontend Engineer. Specialized in Tailwind, Next.js & Framer Motion.',
      location: 'Austin, TX',
    });

    // 2. Profiles
    await ClientProfile.create({
      user: client1._id,
      companyName: 'Nexus Dynamics AI',
      industry: 'Enterprise Software',
      website: 'https://nexusdynamics.example.com',
      totalSpent: 4800,
      projectsPostedCount: 3,
    });

    const f1Profile = await FreelancerProfile.create({
      user: freelancer1._id,
      title: 'Senior Full-Stack & AI Systems Architect',
      skills: ['React', 'Node.js', 'Python', 'Tailwind CSS', 'MongoDB', 'Docker', 'REST APIs', 'FastAPI'],
      hourlyRate: 65,
      experienceYears: 6,
      githubUrl: 'https://github.com/ariachen-dev',
      linkedinUrl: 'https://linkedin.com/in/ariachen',
      portfolioUrl: 'https://ariachen.dev',
      trustScore: 94,
      completedProjectsCount: 14,
      totalEarnings: 38400,
      averageRating: 4.95,
      ratingsCount: 12,
    });

    const f2Profile = await FreelancerProfile.create({
      user: freelancer2._id,
      title: 'Lead Frontend & Design Systems Specialist',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'UI/UX Design'],
      hourlyRate: 50,
      experienceYears: 4,
      githubUrl: 'https://github.com/liamvance',
      linkedinUrl: 'https://linkedin.com/in/liamvance',
      portfolioUrl: 'https://liamdesign.io',
      trustScore: 88,
      completedProjectsCount: 8,
      totalEarnings: 19200,
      averageRating: 4.88,
      ratingsCount: 7,
    });

    // 3. Projects
    const project1 = await Project.create({
      client: client1._id,
      title: 'Real-time AI Document Processing & Search Dashboard',
      description: 'We need an enterprise-grade web application to upload PDFs, extract text with OCR/LLMs, and provide semantic instant search with high responsiveness.',
      category: 'AI & Machine Learning',
      skillsRequired: ['React', 'Python', 'Node.js', 'Docker', 'REST APIs'],
      budgetMin: 1500,
      budgetMax: 3000,
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      experienceLevel: 'Expert',
      status: 'in-progress',
      proposalsCount: 2,
    });

    const project2 = await Project.create({
      client: client1._id,
      title: 'Fintech Micro-investing SaaS Design & UI Architecture',
      description: 'Seeking a seasoned UI engineer to craft a dark-mode, animated analytics portal with interactive charts and clean accessible components.',
      category: 'UI/UX Design',
      skillsRequired: ['React', 'Tailwind CSS', 'Framer Motion', 'Figma'],
      budgetMin: 800,
      budgetMax: 1800,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      experienceLevel: 'Intermediate',
      status: 'open',
      proposalsCount: 1,
    });

    const project3 = await Project.create({
      client: client1._id,
      title: 'Cloud DevOps CI/CD Pipeline Automation with Docker',
      description: 'Setup continuous deployment across staging and production clusters with automated linting, security scans, and database migrations.',
      category: 'DevOps & Cloud',
      skillsRequired: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'AWS'],
      budgetMin: 1000,
      budgetMax: 2200,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      experienceLevel: 'Intermediate',
      status: 'open',
      proposalsCount: 0,
    });

    // 4. Proposals
    const bidAnalysis1 = IntelligenceEngine.analyzeBid({
      bidAmount: 2200,
      deliveryDays: 16,
      coverLetter: 'I have built multiple semantic search architectures integrating React with Python microservices and vector indices. I can deliver clean modular code with Docker containerization.',
      freelancerExperience: 6,
    }, project1);

    const prop1 = await Proposal.create({
      project: project1._id,
      freelancer: freelancer1._id,
      bidAmount: 2200,
      deliveryDays: 16,
      coverLetter: 'I have built multiple semantic search architectures integrating React with Python microservices and vector indices. I can deliver clean modular code with Docker containerization.',
      portfolioLinks: ['https://github.com/ariachen-dev/ai-search-engine'],
      status: 'accepted',
      analysis: bidAnalysis1,
    });

    const contract1 = await Contract.create({
      project: project1._id,
      client: client1._id,
      freelancer: freelancer1._id,
      proposal: prop1._id,
      totalAmount: 2200,
      paidAmount: 1100,
      deliveryDeadline: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
      status: 'active',
    });

    const m1 = await Milestone.create({
      contract: contract1._id,
      title: 'Phase 1: Backend Parsing Microservice & Ingestion Engine',
      description: 'Build text extraction pipeline and semantic embedding endpoints.',
      amount: 1100,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'approved',
      deliverableUrl: 'https://github.com/ariachen-dev/ai-search-engine/pull/1',
      submissionNotes: 'Backend services are up, test suite passing at 98% coverage.',
      paidAt: new Date(),
    });

    const m2 = await Milestone.create({
      contract: contract1._id,
      title: 'Phase 2: React Frontend Search UI & Real-Time Analytics',
      description: 'Interactive dashboard with instant keyword highlight and filter widgets.',
      amount: 1100,
      dueDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
      status: 'in-progress',
    });

    contract1.milestones = [m1._id, m2._id];
    await contract1.save();

    await Payment.create({
      contract: contract1._id,
      milestone: m1._id,
      client: client1._id,
      freelancer: freelancer1._id,
      amount: 1100,
      status: 'completed',
      paymentMethod: 'Stripe Simulated Escrow',
      transactionId: `TXN_${Date.now()}_M1_SEED`,
    });

    console.log('[Seed] Database seeded successfully with demo accounts:');
    console.log('  Admin:      admin@skillbridge.io / password123');
    console.log('  Client:     client@skillbridge.io / password123');
    console.log('  Freelancer: freelancer@skillbridge.io / password123');
    console.log('  Freelancer: liam@skillbridge.io / password123');
    process.exit(0);
  } catch (error) {
    console.warn('[Seed Info] Mongo seed skipped or failed (Atlas or local URI):', error.message);
    process.exit(0);
  }
};

seedData();
