import axios from "axios";

const API = axios.create({
  // baseURL: "https://task-manager-backend-esgw.onrender.com/api",
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;