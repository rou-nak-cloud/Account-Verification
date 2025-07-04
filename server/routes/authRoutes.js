import express from 'express'
const authRouter = express.Router();

// Import the auth controllers
import { login, logout, register } from '../controllers/auth.controller.js';

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;