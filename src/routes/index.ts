import { Router } from 'express';
import authRoutes from './auth';
import auth from '../middlewares/jwt';
import userRoutes from './user';

const router = Router();

router.use('/', authRoutes);
router.use('/users', auth, userRoutes);

export default router;
