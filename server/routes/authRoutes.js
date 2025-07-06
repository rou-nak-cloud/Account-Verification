import express from 'express'
const authRouter = express.Router();

// Import the auth controllers
import { isAuthenticated, 
    login, 
    logout, 
    register, 
    resetPassword, 
    sendResetOtp, 
    sendVerifyOtp, 
    verifyEmail } from '../controllers/auth.controller.js';
import userAuth from '../middleware/userAuth.js';

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.post('/send-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-email', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);

authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;