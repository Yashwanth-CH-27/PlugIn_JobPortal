const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const userRouter = require("./routes/userRoutes")
const jobRouter = require("./routes/jobRoutes")
const applicationRouter = require("./routes/applicationRoutes")
const authRouter = require("./routes/authRoutes")
const adminRouter = require("./routes/adminRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/",userRouter)
app.use("/",jobRouter)
app.use("/",applicationRouter)
app.use("/",authRouter)
app.use("/",adminRouter)

module.exports = app