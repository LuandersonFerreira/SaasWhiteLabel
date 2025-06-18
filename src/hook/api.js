import axios from "axios";
import { logout } from "./useAuth";
import { message } from "antd";

export const baseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        logout();
        message.error(
          "Sessão expirada ou não autenticado. Por favor, faça login novamente."
        );
      }
      if (status === 403) {
        message.error("Acesso negado: Você não tem permissão para isso.");
      }
      if (status === 500) {
        message.error("Erro interno no servidor. Tente novamente mais tarde.");
      }
    } else {
      message.error("Erro de rede ou servidor indisponível.");
    }

    return Promise.reject(error);
  }
);

export default api;
