const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../models/cart');
const Order = require('../models/order')
const User = require('../models/user')


const placeOrder = async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    let cart = await Cart.findOne({userId:user._id})

    if(!cart){
        return res.json({success:false,message:"Cart not found."})
    }
 

   
  
    try {
      const newOrder = new Order({
        userId: user._id,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address
      });

      await newOrder.save();
  
     
  
      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.food.name,
           
          },
          unit_amount: item.food.price * 100 
        },
        quantity: item.quantity
      }));
  
  
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${process.env.ORIGIN}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${process.env.ORIGIN}/verify?success=false&orderId=${newOrder._id}`,
      });
     
      res.json({ success: true, url: session.url });
    
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async(req,res)=>{
    try{
        const {orderId,success} = req.body;

        if(success=="true"){
            await Order.findByIdAndUpdate(orderId,{payment:true,status:"Food Processing."})
            return res.json({success:true,message:"Payment successfull."})
        }else{
            await Order.findByIdAndDelete(orderId)
        }   
        return res.json({success:false,message:"Please complete payment."})


    }catch(error){
        res.json({success:false,error:"Error"})
    }
}

const userOrders = async(req,res)=>{
    try{

        const user = await User.findById(req.userId)

        if(!user){
            return res.json({success:false,message:"user not found."})
        }
        const orders = await Order.find({userId:user._id})
        
        res.json({success:true,orders})

    }catch(error){
        res.json({success:false,message:"Error"})
    }
}
  

module.exports = {
    placeOrder,
    verifyOrder,
    userOrders
}
