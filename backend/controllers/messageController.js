const isAdmin = require("../helpers/isAdmin");
const Message = require("../models/message");
const User = require("../models/user");

const sendMessage = async(req,res) =>{
    try{
        const user = await User.findById(req.userId)

        if(!user){
            return res.json({success:false,message:"Please login to send message."})
        }

        const {username,email,message} = req.body;

        if(!username || !email || !message){
            return res.json({success:false,message:"All fields are required."})
        }

        const newmessage = new Message({
            username,
            email,
            message,
            userId:user._id
        })

        await newmessage.save()

        res.json({success:true,message:"Message sent successfully."})

    }catch(error){
        res.json({success:false,message:"Error."})
    }
}

const getAllMessages = async(req,res)=>{
    try{
        const admin = await isAdmin(req.userId);
        if (!admin) {
            return res.status(403).json({ success: false, message: "You are not authorized." });
        }


        const messages = await Message.find({})
        res.json({success:true,messages})


    }catch(error){
        res.json({success:false,message:"Error."})
    }
}

module.exports = {
    sendMessage,
    getAllMessages
}
