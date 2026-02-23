import { apiRequest } from "@/utils/httpClient";
import type {
  IAnnouncement,
  IAnnouncementPayload,
} from "@/interfaces/IAnnouncement";

//obtener
export const getContents = async () => {
  return apiRequest<IAnnouncement[]>("/announcements", {
    method: "GET",
  });
};

//Crear nuevo contenido
export const createContent = async (
  payload: IAnnouncementPayload,
  file?: File | null,
) => {
  // Si no hay archivo, enviamos JSON normal como antes
  if (payload.Type === "Comunicado" && !file) {
    return apiRequest<IAnnouncement>("/announcements", {
      method: "POST",
      data: payload,
    });
  }

  // Si hay archivo, usamos FormData
  const formData = new FormData();

  // Agregamos los campos del payload al FormData
  formData.append("Titule", payload.Titule);
  formData.append("Description", payload.Description);
  formData.append("Type", payload.Type);
  formData.append("IsAnAdvice", String(payload.IsAnAdvice));
  formData.append("IsActive", String(payload.IsActive));

  // Agregamos el archivo físico
  formData.append("file", "");

  if (payload.EndDate) {
    formData.append("EndDate", payload.EndDate);
  }

  if (file) {
    formData.append("file", file);
  }

  return apiRequest<IAnnouncement>("/announcements", {
    method: "POST",
    data: formData,
  });
};

export const toggleAnnouncementStatus = async (id: number) => {
  return apiRequest<IAnnouncement>(`/announcements/${id}/toggle`, {
    method: "PATCH",
  });
};

//actualizar contenido
export const updateContent = async (
  id: number,
  payload: IAnnouncementPayload,
) => {
  return apiRequest<IAnnouncement>(`/announcements/${id}`, {
    method: "PUT",
    data: payload,
  });
};
