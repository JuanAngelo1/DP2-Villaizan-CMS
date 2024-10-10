// app/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api", // Base URL para las rutas API de Next.js
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;