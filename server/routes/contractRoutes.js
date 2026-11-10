import express from 'express';
import {
  acceptProposalAndCreateContract,
  getMyContracts,
  getContractById,
  submitMilestoneWork,
  approveMilestoneWork,
} from '../controllers/contractController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/accept-proposal', protect, authorize('client', 'admin'), acceptProposalAndCreateContract);
router.get('/my', protect, getMyContracts);
router.get('/:id', protect, getContractById);
router.put('/milestones/:milestoneId/submit', protect, authorize('freelancer', 'admin'), submitMilestoneWork);
router.put('/milestones/:milestoneId/approve', protect, authorize('client', 'admin'), approveMilestoneWork);

export default router;
