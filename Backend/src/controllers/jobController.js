const Job = require("../models/job");
const Application = require("../models/application");

exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salaryRange, jobType } =
      req.body;

    if (!title || !description || !company || !jobType) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salaryRange,
      jobType,
      createdBy: req.user._id,
    });

    res.status(200).json({ message: "Job created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    if (!jobs) {
      return res.status(401).json({ message: "No jobs were found" });
    }

    res.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(401).json({ message: "Job not found" });
    }

    if (!job.createdBy.equals(req.user._id)) {
      return res.status(401).json({ message: "You can update only your jobs" });
    }

    const allowedUpdated = [
      "title",
      "description",
      "company",
      "location",
      "salaryRange",
      "jobType",
    ];

    allowedUpdated.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    job.isApproved = false;
    await job.save();
    res
      .status(200)
      .json({ message: "Job updation successful, Admin re-approval needed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!job.createdBy.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You can delete only your job posts" });
    }

    await Job.findByIdAndDelete(jobId);

    await Application.deleteMany({ jobId });

    return res.status(200).json({ message: "Deletion successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getApplicationsForJob = async (req, res) => {
  try {
    const applications = await Application.find({ recruiterId: req.user._id })
      .populate(
        "applicantId",
        "name email role",
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

exports.getApprovedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isApproved: true })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res
        .status(401)
        .json({ message: "No jobs were found, come again later" });
    }

    res.status(200).json({
      totalJobs: jobs.length,
      jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.singleApprovedJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.jobId,
      isApproved: true,
    }).populate("createdBy", "name email");

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or not Apprroved" });
    }

    res.status(200).json({ job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
