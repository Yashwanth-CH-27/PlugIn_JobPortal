const User = require("../models/user")
const job = require("../models/job")

exports.approveRecruiter = async(req,res) => {
    try{
        const user = await User.findById(req.params.userId)

        if(!user){
            return res.status(404).json({message: "Recruiter not found"})
        }

        if(user.role !== "recruiter"){
            return res.status(400).json({message: "User is not a recruiter"})
        }

        user.isApproved = true
        await user.save()

        res.status(200).json({message: "Recruiter is approved"})
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

exports.approveJob = async(req,res) => {
    try{
        const job = await job.findById(req.params.jobId)

        if(!job){
            return res.status(401).json({message: "job not found"})
        }

        job.isApproved = true
        await job.save()

        res.status(200).json({message: "Job approved"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}