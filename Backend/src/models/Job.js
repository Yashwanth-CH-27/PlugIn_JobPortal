const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
            required: true,
        },
        company:{
            type: String,
            required: true,
            trim: true,
        },
        location:{
            type: String,
            trim:true,
        },
        salaryRange:{
            type: String,
        },
        jobType:{
            type: String,
            enum: ["Full-time", "Part-time", "Internship"],
            required: true,
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isApproved:{
            type: Boolean,
            default: false,
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Job",jobSchema)