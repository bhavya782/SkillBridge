import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  getMyClientProjects,
  getProjectTalentMatches,
  getProjectSkillGap,
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/my/client', protect, authorize('client', 'admin'), getMyClientProjects);
router.get('/:id', getProjectById);
router.post('/', protect, authorize('client', 'admin'), createProject);
router.get('/:id/talent-matches', protect, authorize('client', 'admin'), getProjectTalentMatches);
router.get('/:id/skill-gap', protect, authorize('freelancer', 'admin'), getProjectSkillGap);

export default router;
