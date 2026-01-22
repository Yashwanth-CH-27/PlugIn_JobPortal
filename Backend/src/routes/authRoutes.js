const express = require("express");
const authRouter = express.Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs")

authRouter.post("/register", async (req,res) => {
  try{
    const {name, email, password, role} = req.body

    if(!name || !email || !password || !role){
      return res.status(400).json({message: "All fields are required"})
    }

    const existingUser =await User.findOne({email})
    if(existingUser){
      return res.status(400).json({message: "User already exist"})
    }

    let finalRole = "jobseeker"
    if(role === "recruiter"){
      finalRole = "recruiter"
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user  = await User.create({
      name,
      email,
      password: hashedPassword,
      role: finalRole,
    })

    const token = await user.getJWT()

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({message: "Registration Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    })
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

authRouter.post("/login", async(req, res) => {
  try{
  const {email, password} = req.body
  const user = await User.findOne({email})

  if(!user){
    return res.status(401).json({message: "Invalid emailID"})
  }

  const isValidPassword = await user.decrypt(password)
  if(!isValidPassword){
    return res.status(401).json({message: "Invalid password"})
  }

  if(!user.isApproved){
    return res.status(403).json({message: "Account not approved yet"})
  }

  const token = await user.getJWT()
  res.cookie("token", token, {
    httpOnly:true,
    secure:true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.status(200).json({message: "LogIn successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

module.exports = authRouter;
