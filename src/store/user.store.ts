import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllUsers, getUsersCount, updateUser } from "@/api/users.api";
import type { User, IUpdateUserPayload } from "@/interfaces/IUser";

export const useUsersStore = defineStore("users", () => {
  const users = ref<User[]>([]);
  const totalUsers = ref<number>(0);
  const error = ref("");

  // Obtener todos los usuarios
  async function fetchUsers() {
    try {
      error.value = "";
      const data = await getAllUsers();
      users.value = data;
    } catch (err: any) {
      error.value = err.message || "Error al obtener usuarios";
    }
  }

  // Obtener conteo de usuarios
  async function fetchUsersCount() {
    try {
      error.value = "";
      const data = await getUsersCount();
      totalUsers.value = data.total_usuarios;
    } catch (err: any) {
      error.value = err.message || "Error al obtener el conteo de usuarios";
    }
  }

  // Editar usuario
  async function editUser(id: number, payload: IUpdateUserPayload) {
    try {
      error.value = "";
      const updatedUser = await updateUser(id, payload);

      // Actualizar lista local
      const index = users.value.findIndex((u) => u.Id === id);
      if (index !== -1) {
        users.value[index] = updatedUser;
      }

      return updatedUser;
    } catch (err: any) {
      error.value = err.message || "Error al editar usuario";
      throw err;
    }
  }

  return {
    users,
    totalUsers,
    error,
    fetchUsers,
    fetchUsersCount,
    editUser,
  };
});
