const mongoose = require("mongoose")
const jwt = require("jasonwebtoken")
const User = require("../models/user")
require("dotenv").config()

const authentication = async(req, res, next) => {
    try{
        const token = req.cookies?.token
        
        if(!token){
            return res.status(401).json({message: "Authentication required"})
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodeToken.id).select("-password")

        if(!user){
            return res.status(401).json({message: "User no longer exists"})
        }

        req.user = user
        next()
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = authentication