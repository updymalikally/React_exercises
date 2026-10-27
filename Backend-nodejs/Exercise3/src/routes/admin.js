import { Router } from 'express';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', protect, authorize('admin'), (req, res) => {
  res.json({ message: `Welcome to the admin dashboard, ${req.user.name}.`, user: req.user });
});

export default router;
