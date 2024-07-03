const Food = require('../models/food');
const isAdmin = require('../helpers/isAdmin');
const fs = require('fs')

const addFood = async (req, res) => {
    try {
        const admin = await isAdmin(req.userId);
        if (!admin) {
            return res.status(403).json({ success: false, message: "You are not authorized." });
        }

        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename
        });

        await food.save();
        res.status(201).json({ success: true, message: "Food added." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

const removeFood = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await isAdmin(req.userId);
        if (!admin) {
            return res.status(403).json({ success: false, message: "You are not authorized." });
        }

        const food = await Food.findByIdAndDelete(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found." });
        } 
        fs.unlink(`uploads/${food.image}`,()=>{

        })

        res.status(200).json({ success: true, message: "Food removed." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
const foodList = async(req,res)=>{
  try{
      const foods = await Food.find({})

      res.status(200).json({ success: true,foods});
  }catch(error){
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Food.distinct('category');
        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
module.exports = {
    addFood,
    removeFood,
    foodList,
    getAllCategories
};
