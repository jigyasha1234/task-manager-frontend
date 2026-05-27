import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-backend-esgw.onrender.com/api",
});

export default API;