import { apiRequest } from "@/utils/httpClient";
import type {
  IContentPage,
  IContentPagePayload,
} from "@/interfaces/IContentPage";
import type { IContent, IContentPayload } from "@/interfaces/IContent";

// Auxiliar para IContentPage
const preparePageFormData = (payload: IContentPagePayload): FormData => {
  const formData = new FormData();
  if (payload.Titule) formData.append("Titule", payload.Titule);
  if (payload.Description) formData.append("Description", payload.Description);
  if (payload.Page) formData.append("Page", payload.Page);
  if (payload.ComponentPage)
    formData.append("ComponentPage", payload.ComponentPage);
  if (payload.image) formData.append("image", payload.image);
  return formData;
};

// Auxiliar para IContent (General) - Actividades, Anuncios
const prepareGeneralFormData = (payload: IContentPayload): FormData => {
  const formData = new FormData();
  formData.append("Titule", payload.Titule);
  formData.append("Description", payload.Description);
  formData.append("Type", payload.Type);
  formData.append("IsAnAdvice", payload.IsAnAdvice ? "true" : "false");
  if (payload.CreationDate) formData.append("CreationDate", payload.CreationDate);
  if (payload.EndDate) formData.append("EndDate", payload.EndDate);
  if (payload.IsActive !== undefined) formData.append("IsActive", payload.IsActive ? "true" : "false");
  if (payload.image) formData.append("image", payload.image);
  if (payload.document) formData.append("document", payload.document);
  return formData;
};

/* =========================================
   Endpoints para Páginas (/content-pages)
   ========================================= */

export function getAllContents() {
  return apiRequest<IContentPage[]>("/content-pages/", {
    method: "GET",
  });
}

export function getContentByPage(pageName: string) {
  return apiRequest<IContentPage[]>(`/content-pages/page/${pageName}/`, {
    method: "GET",
  });
}

export function createContent(payload: IContentPagePayload) {
  const data = preparePageFormData(payload);
  return apiRequest<IContentPage>("/content-pages/", {
    method: "POST",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function updateContent(id: number, payload: IContentPagePayload) {
  const data = preparePageFormData(payload);
  return apiRequest<IContentPage>(`/content-pages/${id}/`, {
    method: "PUT",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deleteContent(id: number) {
  return apiRequest<{ message: string }>(`/content-pages/${id}/`, {
    method: "DELETE",
  });
}

/* =========================================
   Endpoints para Contenidos Generales/Actividades (/contents)
   ========================================= */

export function getAllGeneralContents() {
  return apiRequest<IContent[]>("/contents/", {
    method: "GET",
  });
}

export function createGeneralContent(payload: IContentPayload) {
  const data = prepareGeneralFormData(payload);
  return apiRequest<IContent>("/contents/", {
    method: "POST",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function updateGeneralContent(id: number, payload: IContentPayload) {
  const data = prepareGeneralFormData(payload);
  return apiRequest<IContent>(`/contents/${id}/`, {
    method: "PUT",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deleteGeneralContent(id: number) {
  return apiRequest<{ message: string }>(`/contents/${id}/`, {
    method: "DELETE",
  });
}
