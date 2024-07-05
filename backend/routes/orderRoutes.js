const express = require('express')
const { placeOrder, verifyOrder, userOrders,allOrders, changeStatus } = require('../controllers/orderController')
const verifyToken = require('../middlewares/verifyToken')
const orderRouter = express.Router()


orderRouter.post("/place",verifyToken,placeOrder)
orderRouter.post("/verify",verifyToken,verifyOrder)
orderRouter.get("/user",verifyToken,userOrders)
orderRouter.get("/all",verifyToken,allOrders)
orderRouter.put("/update/:id",verifyToken,changeStatus)


module.exports = orderRouter
