import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(function (config) {
  var accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers!.Authorization = 'Bearer ' + accessToken;
  }

  return config;
});

axiosClient.interceptors.response.use();

export default axiosClient;
