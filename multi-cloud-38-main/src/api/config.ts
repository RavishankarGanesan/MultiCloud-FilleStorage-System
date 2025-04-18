import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { tokenService } from '@/services/token.service';
import { config } from '@/config/env.config';

// Extend AxiosRequestConfig to include _retry property
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await tokenService.refreshToken();
      
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken.token}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;