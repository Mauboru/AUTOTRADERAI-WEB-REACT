import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(config => {
    config.headers.Authorization = import.meta.env.VITE_API_SECRET;
    return config;
});

export default api;
