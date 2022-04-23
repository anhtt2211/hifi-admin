import axios from 'axios';

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  baseURL: 'http://localhost:5000/api',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   "Access-Control-Allow-Methods": "*",
  //   "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'"
  // },
});
axiosClient.interceptors.request.use();
axiosClient.interceptors.response.use();

export default axiosClient;
