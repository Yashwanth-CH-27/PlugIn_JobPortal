const express = require("express");
const applicationRouter = express.Router();
const authentication = require("../middlewares/authMiddleware");
const restrictTo = require("../middlewares/roleMiddleware");

const {
  createApplication,
  getApplications,
} = require("../controllers/applicationController");

applicationRouter.post(
  "/create-application/:jobId",
  authentication,
  restrictTo("jobseeker"),
  createApplication,
);

applicationRouter.get(
  "/view-applications",
  authentication,
  restrictTo("jobseeker"),
  getApplications,
);

module.exports = applicationRouter;
