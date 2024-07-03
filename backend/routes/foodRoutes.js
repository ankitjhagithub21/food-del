const express = require('express');
const multer = require('multer');

const { addFood, removeFood, foodList } = require('../controllers/foodController');
const verifyToken = require('../middlewares/verifyToken');

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage });

foodRouter.post("/add", verifyToken, upload.single('image'), addFood);
foodRouter.delete("/remove/:id", verifyToken, removeFood);
foodRouter.get("/list", foodList);

module.exports = foodRouter;
