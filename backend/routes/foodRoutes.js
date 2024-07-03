const express = require('express');
const multer = require('multer');
const { addFood, removeFood, foodList, getAllCategories, getSingleFood } = require('../controllers/foodController');
const verifyToken = require('../middlewares/verifyToken');
const foodRouter = express.Router();

const storage = multer.diskStorage({
 
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

foodRouter.post("/add", verifyToken, upload.single('image'), addFood);
foodRouter.delete("/remove/:id", verifyToken, removeFood);
foodRouter.get("/list", foodList);
foodRouter.get("/categories", getAllCategories);
foodRouter.get("/:id", getSingleFood);

module.exports = foodRouter;
