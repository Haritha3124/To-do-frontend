// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically add token to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Adjust if you're using a different storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
