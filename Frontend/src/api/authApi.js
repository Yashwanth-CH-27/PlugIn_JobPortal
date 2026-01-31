import api from "./axiosApi";

export const registerUser = (data) => api.post("/register", data);

export const loginUser = (data) => api.post("/login", data);

export const logoutUser = () => api.post("/logout");
