const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const jobSeekerRouter = require("./routes/jobSeekerRoutes")
const jobRouter = require("./routes/jobRoutes")
const applicationRouter = require("./routes/applicationRoutes")
const authRouter = require("./routes/authRoutes")
const adminRouter = require("./routes/adminRoutes")

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/",jobSeekerRouter)
app.use("/",jobRouter)
app.use("/",applicationRouter)
app.use("/",authRouter)
app.use("/",adminRouter)

module.exports = app