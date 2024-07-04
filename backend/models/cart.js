const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique:true
    },
    foods: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true
        },
        quantity: Number,
        _id: false 
      }
    ]
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
