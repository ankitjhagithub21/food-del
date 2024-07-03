const validator = require('validator')
const User = require("../models/user");
const bcrypt = require('bcrypt');
const createToken = require('../helpers/createToken');

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.json({ success: false, message: "All fields are required." });
        }

        const existingEmail = await User.findOne({ email })

        if (existingEmail) {
            return res.json({ success: false, message: "Please login." });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email." });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password length must be at least 6 characters." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            
        });

        await newUser.save();

        createToken(newUser._id, res);

    
        let user = {
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            
        }
        res.json({ success: true, message: "Account created.", user });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.json({ success: false, message: "Wrong email or password." });
        }

        const comparePassword = await bcrypt.compare(password, existingUser.password);

        if (!comparePassword) {
            return res.json({ success: false, message: "Wrong email or password." });
        }

        createToken(existingUser._id, res);

        let user = {
            _id:existingUser._id,
            fullName:existingUser.fullName,
            email:existingUser.email,
            isAdmin:existingUser.isAdmin
        }

        res.json({ success: true, message: "Login successful.", user });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};


const logout = async(req,res) =>{
    try{
        res.cookie('jwt','',{
            expires:new Date(Date.now())
        }).json({success:true,message:"Logout successfull."})

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Internal Server Error"})
    }
}


const getUser = async(req,res) =>{
    try{

        const user = await User.findById(req.userId).select("-password")
        if(!user){
            return res.json({success:false,message:"User not found."})
        }

        res.json({success:true,user})


    }catch(error){
        console.log(error)
        res.json({success:false,message:"Internal Server Error"})
    }
}


module.exports = {
    register,
    login,
    logout,
    getUser
}