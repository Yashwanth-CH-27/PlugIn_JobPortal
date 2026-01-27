const Job = require("../models/job");
const Application = require("../models/application");
const { findById } = require("../models/user");

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
    res.status(200).json({ message: "Applied Successfull", application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user._id })
      .populate(
        "jobId",
        "title company location salaryRange jobType description",
      )
      .sort({ createdAt: -1 });

    if (!applications) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json({
      applicationsCount: applications.length,
      applications,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    const allowedUpdate = ["status"];
    const updates = Object.keys(req.body);

    const isValid = updates.every((field) => allowedUpdate.includes(field));

    if (!isValid) {
      return res
        .status(404)
        .json({ message: "You can only update status of the application" });
    }

    const { status } = req.body;

    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }

    if (!application.recruiterId.equals(req.user._id)) {
      return res
        .status(404)
        .json({ message: "You are not authorized to update the application" });
    }

    application.status = status;
    await application.save();
    res.status(200).json({message: "Updation of status successful", application});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
