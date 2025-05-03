import express from 'express';
import userController from '../controllers/user.controller.js';
import userServices from '../services/user.services.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userServices.login);

export default router;