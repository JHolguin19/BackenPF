import { Router } from 'express';
import UserController from '../controllers/user.controllers.js';
import { checkAuth } from '../middlewares/authJwt.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
const controller = new UserController();
const router = Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/', checkAuth,controller.getUsers)

router.get('/profile', checkAuth, controller.profile);

router.post('/reset-pass', checkAuth, controller.tokenResetPass)
router.post('/new-pass', checkAuth, controller.updatePass)

router.delete('/inactivity', checkAuth, checkAdmin, controller.checkUserLastConnection)

export default router;