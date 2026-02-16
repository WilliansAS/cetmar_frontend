import { defineStore } from "pinia";
import { ref } from "vue";
import * as contentService from "@/api/content.api";
import type {
  IContentPage,
  IContentPagePayload,
} from "@/interfaces/IContentPage";
import type { IContent, IContentPayload } from "@/interfaces/IContent";

export const useContentStore = defineStore("content", () => {
  const contents = ref<IContentPage[]>([]);
  const generalContents = ref<IContent[]>([]); // Para /contents
  const isLoading = ref(false);

  /* --- Page Contents (/content-pages) --- */
  async function fetchContents() {
    isLoading.value = true;
    try {
      contents.value = await contentService.getAllContents();
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchContentByPage(pageName: string) {
    isLoading.value = true;
    try {
      const result = await contentService.getContentByPage(pageName);
      // Asegurar que devuelve un array, incluso si la API falla o devuelve algo inesperado
      return Array.isArray(result) ? result : [];
    } catch (error) {
       console.error("fetchContentByPage failed", error);
       return [];
    } finally {
      isLoading.value = false;
    }
  }

  async function addContent(payload: IContentPagePayload) {
    const newRecord = await contentService.createContent(payload);
    contents.value.push(newRecord);
    return newRecord;
  }

  async function editContent(id: number, payload: IContentPagePayload) {
    const updatedRecord = await contentService.updateContent(id, payload);
    const index = contents.value.findIndex((item) => item.Id === id);
    if (index !== -1) {
      contents.value[index] = updatedRecord;
    }
    return updatedRecord;
  }

  async function removeContent(id: number) {
    await contentService.deleteContent(id);
    contents.value = contents.value.filter((item) => item.Id !== id);
  }

  /* --- General Contents (/contents) --- */
  async function fetchGeneralContents() {
    isLoading.value = true;
    try {
      generalContents.value = await contentService.getAllGeneralContents();
    } finally {
      isLoading.value = false;
    }
  }

  async function addGeneralContent(payload: IContentPayload) {
    const newRecord = await contentService.createGeneralContent(payload);
    generalContents.value.push(newRecord);
    return newRecord;
  }

  async function editGeneralContent(id: number, payload: IContentPayload) {
    const updatedRecord = await contentService.updateGeneralContent(id, payload);
    const index = generalContents.value.findIndex((item) => item.Id === id);
    if (index !== -1) {
      generalContents.value[index] = updatedRecord;
    }
    return updatedRecord;
  }

  async function removeGeneralContent(id: number) {
    await contentService.deleteGeneralContent(id);
    generalContents.value = generalContents.value.filter((item) => item.Id !== id);
  }


  return {
    contents,
    generalContents,
    isLoading,
    fetchContents,
    fetchContentByPage,
    addContent,
    editContent,
    removeContent,
    // Nuevas acciones
    fetchGeneralContents,
    addGeneralContent,
    editGeneralContent,
    removeGeneralContent
  };
});