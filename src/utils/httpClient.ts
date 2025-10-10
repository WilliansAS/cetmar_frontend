import axios, { AxiosError } from "axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Instancia base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor de solicitud
 * - Agrega token solo si existe
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función genérica para peticiones HTTP
export async function apiRequest<T>(
  endpoint: string,
  {
    method = "GET",
    data,
    headers,
    params,
  }: {
    method?: HttpMethod;
    data?: any;
    headers?: Record<string, string>;
    params?: Record<string, any>;
  } = {}
): Promise<T> {
  try {
    const response = await api.request<T>({
      url: endpoint,
      method,
      data,
      headers,
      params,
    });

    // Retornamos directamente la respuesta del servidor
    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error en la petición:", {
      endpoint,
      status: err.response?.status,
      data: err.response?.data,
    });

    // Manejo genérico
    if (err.response?.status === 401) {
      throw new Error("No autorizado. Por favor inicia sesión nuevamente.");
    }

    if (err.response?.status === 403) {
      throw new Error("Acceso denegado. No tienes permisos para esta acción.");
    }

    if (err.response?.status === 404) {
      throw new Error("Recurso no encontrado.");
    }

    if (err.response?.status && err.response.status >= 500) {
      throw new Error("Error del servidor. Inténtalo más tarde.");
    }

    throw new Error("Error en la comunicación con el servidor.");
  }
}

export default api;
