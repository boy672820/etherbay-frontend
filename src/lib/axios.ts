import axios from 'axios';
import { variables } from '$lib/variables';

const axiosInstance = axios.create({
  baseURL: variables.apiUrl
});

axiosInstance.interceptors.response.use(
  (response) => response
  // (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
