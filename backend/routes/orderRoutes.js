const express = require('express')
const { placeOrder, verifyOrder, userOrders } = require('../controllers/orderController')
const verifyToken = require('../middlewares/verifyToken')
const orderRouter = express.Router()


orderRouter.post("/place",verifyToken,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.get("/all",verifyToken,userOrders)


module.exports = orderRouter
