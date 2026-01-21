import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    if (!config.skipAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authApi = {
  register: (email: string, password: string) =>
    api.post(
      "/api/auth/register",
      { email, password },
      { skipAuth: true } as CustomAxiosRequestConfig
    ),

  login: (email: string, password: string) =>
    api.post(
      "/api/auth/login",
      { email, password },
      { skipAuth: true } as CustomAxiosRequestConfig
    ),
};

// Task API calls
export const taskApi = {
  create: (title: string, description?: string) =>
    api.post("/api/tasks", { title, description }),

  getAll: () => api.get("/api/tasks"),

  update: (id: number, title?: string, description?: string, completed?: boolean) =>
    api.put(`/api/tasks/${id}`, { title, description, completed }),

  delete: (id: number) => api.delete(`/api/tasks/${id}`),

  toggleComplete: (id: number) => api.patch(`/api/tasks/${id}/complete`),
};

export default api;
