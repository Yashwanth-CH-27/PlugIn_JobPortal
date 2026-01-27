const express = require("express");
const jobRouter = express.Router();
const authentication = require("../middlewares/authMiddleware");
const restrictTo = require("../middlewares/roleMiddleware");
const recruiterApproval = require("../middlewares/recruiterApproved");
const {
  createJob,
  getMyJobs,
  updateJob,
  deleteJob,
  getApplicationsForJob,
} = require("../controllers/jobController");

jobRouter.post(
  "/createjobs",
  authentication,
  restrictTo("recruiter"),
  recruiterApproval,
  createJob,
);

jobRouter.get(
  "/viewjobs",
  authentication,
  restrictTo("recruiter"),
  recruiterApproval,
  getMyJobs,
);

jobRouter.patch(
  "/updatejob/:jobId",
  authentication,
  restrictTo("recruiter"),
  recruiterApproval,
  updateJob,
);

jobRouter.delete(
  "/deletejob/:jobId",
  authentication,
  restrictTo("recruiter"),
  recruiterApproval,
  deleteJob,
);

jobRouter.get(
  "/view-applications-owner/:jobId",
  authentication,
  restrictTo("recruiter"),
  recruiterApproval,
  getApplicationsForJob,
);

module.exports = jobRouter;
