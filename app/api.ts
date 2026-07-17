// src/api/api.ts

import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiURL,
  withCredentials: true, // 🔥 IMPORTANT for cookies
});

// separate instance (no interceptor loop)
const refreshClient = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

/* -------------------------------------------------------------------------- */
/*                             RESPONSE INTERCEPTOR                           */
/* -------------------------------------------------------------------------- */

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Skip login endpoint
    if (originalRequest.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    // Handle 401 → try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔥 Cookie (refresh token) will be sent automatically
        await refreshClient.post("/auth/refresh");

        // Retry original request (cookie now refreshed)
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout user
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { api };
