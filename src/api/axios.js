// api.js or axios.js
import axios from 'axios';

//const token = localStorage.getItem('access_token'); // adjust if you store the token differently

const axiosInstance = axios.create({
  baseURL: 'https://backendpayrents.onrender.com',
  //headers: {
  //  'Content-Type': 'application/json',
  //  ...(token && { Authorization: `Bearer ${token}` }),
  //},
});

export default axiosInstance;
