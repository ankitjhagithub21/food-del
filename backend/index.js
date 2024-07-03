require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/conn')
const authRouter = require('./routes/authRoutes')
const messageRouter = require('./routes/messageRoutes')
const foodRouter = require('./routes/foodRoutes')
const cartRouter = require('./routes/cartRoutes')
const app = express()


const port = process.env.PORT || 3000
connectDB()

app.use(express.json())
app.use(cors({
  origin:[process.env.ORIGIN,process.env.ORIGIN_TWO],
  credentials:true
}))

app.use(cookieParser())


app.use("/api/auth",authRouter)
app.use("/api/message",messageRouter)
app.use("/api/food",foodRouter)
app.use("/api/cart",cartRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})