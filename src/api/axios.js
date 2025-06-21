// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backendpayrents.onrender.com/api', // ✅ no trailing slash
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
