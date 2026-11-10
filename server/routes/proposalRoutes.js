import express from 'express';
import { submitProposal, getProjectProposals, getMyProposals } from '../controllers/proposalController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, authorize('freelancer', 'admin'), submitProposal);
router.get('/my', protect, authorize('freelancer', 'admin'), getMyProposals);
router.get('/project/:projectId', protect, authorize('client', 'admin'), getProjectProposals);

export default router;
