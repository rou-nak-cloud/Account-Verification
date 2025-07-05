import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next) => {
    const { token } = req.cookies;

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Not Authorized. Login again" 
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if(tokenDecode.id){
            // req.body.userId = tokenDecode.id  -> can be undefined..
            req.user = { id: tokenDecode.id };
        } else{
            return res.status(400).json({
                success: false,
                message: "Token Id not found."
            })
        }
        next();

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while finding token.",
            error: error.message
        })
    }
}

export default userAuth;