import { apiRequest } from "@/utils/httpClient";
import type {
  User,
  UsersCountResponse,
  IUpdateUserPayload,
} from "@/interfaces/IUser";

// Obtener todos los usuarios
export function getAllUsers() {
  return apiRequest<User[]>("/users", {
    method: "GET",
  });
}

// Obtener conteo de usuarios
export function getUsersCount() {
  return apiRequest<UsersCountResponse>("/users/count", {
    method: "GET",
  });
}

// Editar usuario
export function updateUser(id: number, payload: IUpdateUserPayload) {
  return apiRequest<User>(`/users/${id}`, {
    method: "PUT",
    data: payload,
  });
}
