// /services/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores para manejar errores globales, autenticación, etc.
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Manejar errores globales aquí
    return Promise.reject(error);
  }
);

export default axiosInstance;