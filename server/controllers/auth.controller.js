import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from "../config/nodeMailer.js";

export const register = async (req,res) => {
    const { name: rawName,
        email: rawEmail,
        password } = req.body;
        const name = rawName?.trim();
        const email = rawEmail?.trim();
        
        if(!name || !email ||  !password ){
            return res.status(400).json({
                success: false,
                message:"Please fill all the fields"
            })
        }

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "User already existed"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({
            name,
            email,
            password: hashedPassword,
        })
        await user.save();
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
    
        //  Send Welcome Email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Authentication server",
            text: `Hello ${name},\n\nThank you for registering on our platform with your email id: ${email}. We are excited to have you on board!\n\nBest regards,\nAuthentication Server Team`
        }
        await transporter.sendMail(mailOptions);
    
         return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
} catch (error) {
    return res.status(400).json({
        success: false,
        message: "Something went wrong while registering user",
        error: error.message
    })
}
}

export const login = async (req,res) => {
    const { email: rawEmail,
         password } = req.body;
         const email = rawEmail?.trim();

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        })
    }

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "User Logged in successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials",
            error: error.message
        })
    }
}

export const logout = async (req,res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.status(200).json({
            success: true,
            message: "User Logged out successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while logging out",
            error: error.message
        })
    }
}


// Check verified account
export const sendVerifyOtp = async (req,res) => {
    try {
    // const {userId} = req.body;  NOT safe anyone can change if it is in body
    const userId = req.user?.id; // take it from middleware

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
    
    const user = await User.findById(userId)
     if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

    if(user.isAccountVerified){
        return res.status(400).json({
            success: false,
            message: "Account already verified"
        })
    }
    
        const otp = String(Math.floor(100000 + Math.random() * 900000)) // generate a 6 digit random number
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 mins from now
    
            await user.save();
        
            // Send otp via email
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: "Verify your account with OTP",
                text: `Hello ${user.name},\n\nYour OTP for verifying your account is: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nBest regards,\nAuthentication Server Team`
            }
            await transporter.sendMail(mailOptions);
            return res.status(200).json({
                success: true,
                message: "OTP sent to your email successfully. Please check your email to verify your account."
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while sending otp..",
            error: error.message
        })
    }
}   

//  Verify email using OTP
export const verifyEmail = async (req,res) => {
    // const {userId, otp} = req.body;
    const userId = req.user?.id;   // Get from token, not req.body
    const { otp } = req.body;

    if(!userId || !otp){
        return res.status(400).json({
            success: false,
            message: "Please provide userId and OTP",
        })
    }
    
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }
        if(user.verifyOtpExpireAt < Date.now()){
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new OTP."
            })
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.status(200).json({
            success: true,
            message: "Account verified successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while verifying email", 
            error: error.message
        })
    }
}

//  check user is Authenticated or not ??
export const isAuthenticated = async (req,res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "User is Original."
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "User is NOT Authenticated or Something went wrong..",
            error: error.message
        })
    }
}

// Send password reset otp
export const sendResetOtp = async (req,res) => {
    const { email: rawEmail } = req.body
    const email = rawEmail?.trim();

    if(!email){
        return res.status(400).json({
            success: false,
            message: "Email is required."
        })
    }

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found.."
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000)) // generate a 6 digit random number
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 mins from now
    
            await user.save();
        
            // Send otp via email
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: "Password Reset OTP",
                text: `Hello ${user.name},\n\nYour password reset OTP for your account is: ${otp}\n\nThis OTP is valid for 15 minutes.Use this OTP for resetting your password.\n\nBest regards,\nAuthentication Server Team`
            }
            await transporter.sendMail(mailOptions);
            return res.status(200).json({
                success: true,
                message: "Reset OTP sent to your email successfully. Please check your email to reset your password."
            })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while sending reset OTP..",
            error: error.message
        })
    }
}

//  Reset user Password
export const resetPassword = async (req,res) => {
    const { email: rawEmail,
         otp, newPassword } = req.body;
         const email = rawEmail?.trim();

         if(!email || !otp || !newPassword){
            return res.status(400).json({
                success: false,
                message: "Email, OTP and your new password is required"
            })
         }

    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.."
            })
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.status(400).json({
                success: false,
                message: "OTP Expired. Generate again."
            })
        }

        // store new Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while updating password with your credentials.",
            error: error.message
        })
    }
}
