import { apiRequest } from "@/utils/httpClient";
import type {
  IContentPage,
  IContentPagePayload,
} from "@/interfaces/IContentPage";

// Auxiliar para preparar el envío de archivos y textos
const prepareFormData = (payload: IContentPagePayload): FormData => {
  const formData = new FormData();
  if (payload.Titule) formData.append("Titule", payload.Titule);
  if (payload.Description) formData.append("Description", payload.Description);
  if (payload.Page) formData.append("Page", payload.Page);
  if (payload.ComponentPage)
    formData.append("ComponentPage", payload.ComponentPage);
  if (payload.image) formData.append("image", payload.image);
  return formData;
};

export function getAllContents() {
  return apiRequest<IContentPage[]>("/content-pages", {
    method: "GET",
  });
}

export function createContent(payload: IContentPagePayload) {
  const data = prepareFormData(payload);
  return apiRequest<IContentPage>("/content-pages", {
    method: "POST",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function updateContent(id: number, payload: IContentPagePayload) {
  const data = prepareFormData(payload);
  return apiRequest<IContentPage>(`/content-pages/${id}`, {
    method: "PUT",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deleteContent(id: number) {
  return apiRequest<{ message: string }>(`/content-pages/${id}`, {
    method: "DELETE",
  });
}
