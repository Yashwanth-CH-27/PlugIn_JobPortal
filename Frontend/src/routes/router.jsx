import { createBrowserRouter } from "react-router-dom";

import ApproveJobs from "../pages/admin/ApproveJobs";
import ApproveRecruiters from "../pages/admin/ApproveRecruiters";
import Dashboard from "../pages/admin/Dashboard";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/jobs/Home";
import JobDetails from "../pages/jobs/JobDetails";

import AppliedJobs from "../pages/jobseeker/AppliedJobs";

import CreateJob from "../pages/recruiter/CreateJob";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import JobApplicants from "../pages/recruiter/JobApplicants";
import MyJobs from "../pages/recruiter/MyJobs";

import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/job/:jobId",
    element: <JobDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/jobseeker/applied-jobs",
    element: (
      <ProtectedRoute allowedRoles={["jobseeker"]}>
        <AppliedJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <RecruiterDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/create-job",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <CreateJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/my-jobs",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <MyJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/job/:jobId/applicants",
    element: (
      <ProtectedRoute allowedRoles={["recruiter"]}>
        <JobApplicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/approve-recruiters",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <ApproveRecruiters />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/approve-jobs",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <ApproveJobs />
      </ProtectedRoute>
    ),
  },
]);
