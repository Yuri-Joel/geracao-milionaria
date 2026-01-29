import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//verificar token

/*api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});*/


//erro 401

/*api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn("Não autorizado!");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);*/

export default api;
