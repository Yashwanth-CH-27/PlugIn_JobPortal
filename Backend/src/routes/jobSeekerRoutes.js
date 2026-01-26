const express = require("express");
const jobSeekerRoute = express.Router();
const authentication = require("../middlewares/authMiddleware")
const restrictTo = require("../middlewares/roleMiddleware")

const {getApprovedJobs, singleApprovedJob} = require("../controllers/jobController")

jobSeekerRoute.get("/jobfeed",
  authentication,
  restrictTo("jobseeker"),
  getApprovedJobs
)

jobSeekerRoute.get("/jobinfo/:jobId",
    authentication,
    restrictTo("jobseeker"),
    singleApprovedJob
)

module.exports = jobSeekerRoute;
