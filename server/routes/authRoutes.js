import express from 'express'
const authRouter = express.Router();

// Import the auth controllers
import { isAuthenticated, 
    login, 
    logout, 
    register, 
    sendVerifyOtp, 
    verifyEmail } from '../controllers/auth.controller.js';
import userAuth from '../middleware/userAuth.js';

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.post('/send-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-email', userAuth, verifyEmail);
authRouter.post('/is-auth', userAuth, isAuthenticated);

export default authRouter;