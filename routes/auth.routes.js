import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { requireUser } from '../middlewares/requireUser.js';

const controller = new AuthController();

const router = Router();

router.post('/register/', controller.register);
router.post('/login/', controller.login);

router.get('/user/', requireUser, controller.getUser);

export default router;