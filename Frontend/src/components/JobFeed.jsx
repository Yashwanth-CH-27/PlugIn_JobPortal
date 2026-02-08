import { useEffect, useState } from "react";
import { getJobFeed } from "../api/jobseekerApi";
import toast from "react-hot-toast";
import JobCard from "./JobCard";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await getJobFeed();
        setJobs(res.data.jobs || res.data || []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to Load Jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div>Loading Jobs....</div>;

  return (
    <div>
      <h1>Job Feed</h1>
      {jobs.length === 0 ? (
        <p>No Jobs available!!</p>
      ) : (
        jobs.map((job) => <JobCard key={job._id} job={job} />)
      )}
    </div>
  );
};

export default JobFeed;
