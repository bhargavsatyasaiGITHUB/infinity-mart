// src/api/axios.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

console.log(BASE_URL);

export default axiosInstance;
