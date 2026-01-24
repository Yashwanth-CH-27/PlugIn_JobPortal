const express = require("express");
const adminRouter = express.Router();

const authentication = require("../middlewares/authMiddleware");
const restrictTo = require("../middlewares/roleMiddleware");
const {
  approveRecruiter,
  approveJob,
} = require("../controllers/adminController");

adminRouter.patch(
  "/approve-recruiter/:userId",
  authentication,
  restrictTo("admin"),
  approveRecruiter,
);

adminRouter.patch(
  "/approve-job/:jobId",
  authentication,
  restrictTo("admin"),
  approveJob,
);

module.exports = adminRouter