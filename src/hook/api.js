import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
        //logout();
        window.location.href = "/login";
        console.log(
          "Usuário não autorizado. Redirecionando para a página de login."
        );
      }
      if (status === 403) {
        console.error("Acesso negado: Você não tem permissão para isso.");
      }
      if (status === 500) {
        console.error("Erro interno no servidor.");
      }
    } else {
      console.error("Erro na conexão com o servidor.");
    }

    return Promise.reject(error);
  }
);

export default api;
