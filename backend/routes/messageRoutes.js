const express = require('express')
const { sendMessage } = require('../controllers/messageController')
const verifyToken = require('../middlewares/verifyToken')

const messageRouter = express.Router()

messageRouter.post("/send",verifyToken,sendMessage)

module.exports = messageRouter