import api from "./axiosApi"

export const getJobFeed = () => api.get("/jobfeed")
export const getJobInfo = (jobId) => api.get(`/jobinfo/${jobId}`)