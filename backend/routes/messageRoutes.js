const express = require('express')
const { sendMessage, getAllMessages } = require('../controllers/messageController')
const verifyToken = require('../middlewares/verifyToken')

const messageRouter = express.Router()

messageRouter.post("/send",verifyToken,sendMessage)
messageRouter.get("/",verifyToken,getAllMessages)

module.exports = messageRouter