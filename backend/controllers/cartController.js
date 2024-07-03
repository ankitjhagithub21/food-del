const Cart = require("../models/cart");
const User = require("../models/user")

const addToCart = async (req, res) => {
    const { foodId, quantity } = req.body;
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.json({ success: false, message: "You are not logged in." })
        }

        let cart = await Cart.findOne({ userId: user._id });

        if (cart) {

            let itemIndex = cart.foods.findIndex(f => f.food == foodId);

            if (itemIndex > -1) {

                let foodItem = cart.foods[itemIndex];
                foodItem.quantity = quantity;
                cart.foods[itemIndex] = foodItem;
            } else {

                cart.foods.push({ food:foodId, quantity });
            }
            await cart.save();
            return res.status(201).json({ success: true, message: "food added in cart."});
        } else {
            const newCart = new Cart({
                userId: user._id,
                foods: [{ food:foodId, quantity }]
            })
            newCart.save()
            return res.status(201).json({ success: true, message: "food added in cart."});
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Internal server error" })
    }

}
const removeFromCart = async (req, res) => {
    const foodId = req.params.id
    try {

        const user = await User.findById(req.userId);
        if (!user) {
            return res.json({ success: false, message: "You are not logged in." });
        }

        let cart = await Cart.findOne({ userId: user._id });


        if (!cart) {
            return res.json({ success: false, message: "Cart not found." });
        }


       
        const itemIndex = cart.foods.findIndex(f => f._id == foodId);

        if (itemIndex > -1) {
            cart.foods.splice(itemIndex, 1); 
            cart = await cart.save();
            return res.status(200).json({ success: true, message: "Food removed from cart."});
        } else {
            return res.json({ success: false, message: "Food not found in cart." });
        }


    } catch (error) {
        res.json({ success: false, message: "Internal server error" })
    }
}

const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.json({ success: false, message: "You are not logged in." });
        }

        let cart = await Cart.findOne({ userId: user._id }).populate('foods.food', 'name price image');

        if (!cart) {
            return res.json({ success: false, message: "Cart not found." });
        }

        return res.status(200).json({ success: true, cart:cart.foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


module.exports = {
    addToCart,
    removeFromCart,
    getCart
}