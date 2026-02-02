import api from "./authApi"

export const getJobFeed = () => api.get("/jobfeed")
export const getJobInfo = (jobId) => api.get(`/jobinfo/${jobId}`)