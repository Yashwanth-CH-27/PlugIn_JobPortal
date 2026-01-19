const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_CNT_STR)
}

module.exports = connectDB