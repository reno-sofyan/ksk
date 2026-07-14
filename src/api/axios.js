import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let accessToken = null;
let refreshPromise = null;

export const setAccessToken = (token) => { accessToken = token; };
export const getAccessToken = () => accessToken;

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url?.includes("/api/auth/refresh")
    ) {
      original._retry = true;
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${BASE_URL}/api/auth/refresh`, {}, { withCredentials: true })
          .then((r) => {
            accessToken = r.data.accessToken;
            return accessToken;
          })
          .catch(() => {
            accessToken = null;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      await refreshPromise;
      if (accessToken) {
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
