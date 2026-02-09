import { defineStore } from "pinia";
import { ref } from "vue";
import * as contentService from "@/api/content.api";
import type {
  IContentPage,
  IContentPagePayload,
} from "@/interfaces/IContentPage";

export const useContentStore = defineStore("content", () => {
  const contents = ref<IContentPage[]>([]);
  const isLoading = ref(false);

  async function fetchContents() {
    isLoading.value = true;
    try {
      contents.value = await contentService.getAllContents();
    } finally {
      isLoading.value = false;
    }
  }

  async function addContent(payload: IContentPagePayload) {
    const newRecord = await contentService.createContent(payload);
    contents.value.push(newRecord);
  }

  async function editContent(id: number, payload: IContentPagePayload) {
    const updatedRecord = await contentService.updateContent(id, payload);
    const index = contents.value.findIndex((item) => item.Id === id);
    if (index !== -1) {
      contents.value[index] = updatedRecord;
    }
  }

  async function removeContent(id: number) {
    await contentService.deleteContent(id);
    contents.value = contents.value.filter((item) => item.Id !== id);
  }

  return {
    contents,
    isLoading,
    fetchContents,
    addContent,
    editContent,
    removeContent,
  };
});