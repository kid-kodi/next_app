import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';


const BASE_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api: AxiosInstance = axios.create({
  baseURL: `${BASE_API_URL}/api`,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
