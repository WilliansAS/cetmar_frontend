import { defineStore } from "pinia";
import { ref } from "vue";
import { loginService } from "@/api/auth.api";
import type { LoginPayload } from "@/interfaces/Auth";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const tokenType = ref<string | null>(null);
  const error = ref("");

  async function login(payload: LoginPayload) {
    try {
      error.value = "";

      const response = await loginService(payload);

      token.value = response.access_token;
      tokenType.value = response.token_type;

      return true;
    } catch (err: any) {
      error.value = err.message || "Error al iniciar sesión";
      return false;
    }
  }

  async function logout() {
    token.value = null;
    tokenType.value = null;
  }

  return {
    token,
    tokenType,
    error,
    login,
    logout,
  };
});
