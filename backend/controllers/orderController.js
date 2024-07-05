const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const isAdmin = require('../helpers/isAdmin');
const Cart = require('../models/cart');
const Order = require('../models/order')
const User = require('../models/user')


const placeOrder = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.json({ success: false, message: "User not found." });
  }

  let cart = await Cart.findOne({ userId: user._id })

  if (!cart) {
    return res.json({ success: false, message: "Cart not found." })
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

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    
    const user = await User.findById(req.userId);

    if (!user) {
     
      await Order.findByIdAndDelete(orderId);
      await Cart.findOneAndDelete({ userId: req.userId });
      return res.json({ success: false, message: "User not found." });
    }

    if (success === "true") {
      
      await Order.findByIdAndUpdate(orderId, { payment: true, status: "Pending" });
      
     
      await Cart.findOneAndDelete({ userId: req.userId });

      return res.json({ success: true, message: "Payment successful." });
    } else {
    
      await Order.findByIdAndDelete(orderId);
      
      return res.json({ success: false, message: "Please complete payment." });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, error: "Error processing request." });
  }
};



const userOrders = async (req, res) => {
  try {

    const user = await User.findById(req.userId)

    if (!user) {
      return res.json({ success: false, message: "user not found." })
    }
    const orders = await Order.find({ userId: user._id })

    res.json({ success: true, orders })

  } catch (error) {
    res.json({ success: false, message: "Error" })
  }
}


const allOrders = async (req, res) => {
  try {

    const admin = await isAdmin(req.userId);
    if (!admin) {
      return res.status(403).json({ success: false, message: "You are not authorized." });
    }

    const orders = await Order.find({})

    res.json({ success: true, orders })

  } catch (error) {
    res.json({ success: false, message: "Error" })
  }
}

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;


  try {
    const admin = await isAdmin(req.userId);
    if (!admin) {
      return res.status(403).json({ success: false, message: "You are not authorized." });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, message: 'Order status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}



module.exports = {
  placeOrder,
  verifyOrder,
  userOrders,
  allOrders,
  changeStatus
}
