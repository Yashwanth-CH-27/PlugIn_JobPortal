const Job = require("../models/job");
const Application = require("../models/application");

exports.createApplication = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!job.isApproved) {
      return res.status(403).json({ message: "Job not approved yet" });
    }

    const duplicateApplication = await Application.findOne({
      jobId: job._id,
      applicantId: req.user._id,
    });

    if (duplicateApplication) {
      return res.status(400).json({ message: "You have already applied" });
    }

    const application = await Application.create({
      jobId: job._id,
      applicantId: req.user._id,
      recruiterId: job.createdBy,
      status: "applied",
    });
    res.status(200).json({ message: "Applied Successfull" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
