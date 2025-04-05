/**
 * * Created a single Axios instance for full control over requests and responses.
 * * Centralizes configs, interceptors, and lets us handle auth headers globally.
 */

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
