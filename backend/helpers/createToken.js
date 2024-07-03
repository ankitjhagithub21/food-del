const jwt = require('jsonwebtoken')
const createToken = (userId,res) =>{
    try{    

        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"})
        
        res.cookie('jwt',token,{
            httpOnly:true,
            secure:true,
            expires:new Date(Date.now()+1*24*60*60*1000)
        })

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Internal Server Error"})
    }
}

module.exports = createToken