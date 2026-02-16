import { apiRequest } from "@/utils/httpClient";
import type { IContent } from "@/interfaces/Icontent";
import type { IContentPayload } from "@/interfaces/Icontentpayload";

//obtener
export const getContents = async () => {
  return apiRequest<IContent[]>("/contents/", {
    method: "GET",
  });
};

//Crear nuevo contenido
export const createContent = async (payload: IContentPayload) => {
  return apiRequest<IContent>("/contents/", {
    method: "POST",
    data: payload,
  });
};

//activar contenido
export const enableContent = async (id: number) => {
  return apiRequest<IContent>(`/contents/${id}/enable`, {
    method: "PATCH",
  });
};

//desactivar contenido
export const disableContent = async (id: number) => {
  return apiRequest<IContent>(`/contents/${id}/disable`, {
    method: "PATCH",
  });
};  

//actualizar contenido
export const updateContent = async (id: number, payload: IContentPayload) => {
  return apiRequest<IContent>(`/contents/${id}`, {
    method: "PUT",
    data: payload,
  });
};