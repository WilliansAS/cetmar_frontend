import { apiRequest } from "@/utils/httpClient";
import type { LoginPayload, LoginResponse } from "@/interfaces/Auth";

export async function loginService(
  payload: LoginPayload
): Promise<LoginResponse> {
  return await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    data: payload,
  });
}
