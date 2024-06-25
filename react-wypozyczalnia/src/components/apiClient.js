import axios from "axios";

// Tworzenie instancji axios z podstawową konfiguracją
const apiClient = axios.create({
  baseURL: "http://localhost:8090/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Dodawanie tokenu do nagłówków
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
