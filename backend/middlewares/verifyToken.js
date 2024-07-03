const jwt = require('jsonwebtoken')
const verifyToken = (req,res,next) =>{
    try{
        const token = req.cookies.jwt
        if(!token){
            return res.json({success:false,message:"token missing."})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.json({success:false,message:"token expired."})
        }

        req.userId = decoded.userId;
        next()
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Internal server error"})
    }
}

module.exports = verifyToken