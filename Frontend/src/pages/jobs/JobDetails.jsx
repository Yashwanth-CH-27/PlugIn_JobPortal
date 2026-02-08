import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../customHooks/useAuth";
import { getJobInfo } from "../../api/jobseekerApi";
import toast from "react-hot-toast";
import { applyJob } from "../../api/applicationApi";

const JobDetails = () => {
  const { jobId } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await getJobInfo(jobId);
        setJob(res.data.job || res.data);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to Load Job");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = async () => {
    if (!user) {
      toast.error("Please Login to apply!");
      navigate("/login");
      return;
    }

    if (user.role !== "jobseeker") {
      toast.error("Only jobseekers can apply for jobs!");
      return;
    }

    try {
      setApplyLoading(true);
      const res = await applyJob(jobId);
      console.log(res)
      toast.success("Applied Successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Apply Failed");
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading) return <p>Loading Job Details...</p>;
  if (!job) return <p>No Details found...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{job.title}</h1>
      <p>
        <b>Company:</b> {job.companyName}
      </p>
      <p>
        <b>Location:</b> {job.location}
      </p>

      <h3>Description</h3>
      <p>{job.description}</p>

      <p><b>JobType:</b>{job.jobType}</p>
      <p><b>Salary:</b>{job.salaryRange}</p>
      <p><b>Location:</b>{job.location}</p>

      <button disabled={applyLoading} onClick={handleApply}>
        {applyLoading ? "Applying..." : "Apply Job"}
      </button>
    </div>
  );
};

export default JobDetails;
