import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Ensure this matches your backend URL
});

export default axiosInstance;