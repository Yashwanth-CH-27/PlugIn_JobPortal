import api from "./axiosApi"

export const applyJob = (jobId) => api.post(`/create-application/${jobId}`)

export const getAppliedJobs = () => api.get("/view-applications")