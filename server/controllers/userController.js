import { User } from "../models/user.model.js";

export const getUserData = async (req,res) => {
    try {
        const userId = req.user?.id // take from middleware
        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "user not found."
            })
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "No user details here to show",
            error: error.message
        })
    }
}