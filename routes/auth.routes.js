import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const controller = new AuthController();

const router = Router();

router.post('/register/', controller.register);

export default router;