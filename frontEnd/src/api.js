import axios from 'axios';

// Create a single, configured axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Use an interceptor to automatically attach the token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;