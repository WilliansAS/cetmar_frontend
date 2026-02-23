import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  IAnnouncement,
  IAnnouncementPayload,
} from "@/interfaces/IAnnouncement";
import * as announcementService from "@/api/announcement.api";

export const useAnnouncementStore = defineStore("announcement", () => {
  // State
  const announcements = ref<IAnnouncement[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Getters
  const activeAnnouncements = computed(() =>
    announcements.value.filter((a) => a.IsActive),
  );

  // Actions
  const fetchAnnouncements = async () => {
    loading.value = true;
    try {
      announcements.value = await announcementService.getContents();
    } catch (err) {
      error.value = "Error al obtener los comunicados";
    } finally {
      loading.value = false;
    }
  };

  const createAnnouncement = async (
    payload: IAnnouncementPayload,
    file?: File | null,
  ) => {
    loading.value = true;
    try {
      // Pasamos el archivo al servicio
      const newRecord = await announcementService.createContent(payload, file);
      announcements.value.push(newRecord);
      error.value = null;
    } catch (err) {
      error.value = "Error al crear el comunicado";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateAnnouncement = async (
    id: number,
    payload: IAnnouncementPayload,
  ) => {
    try {
      const updated = await announcementService.updateContent(id, payload);
      const index = announcements.value.findIndex((a) => a.Id === id);
      if (index !== -1) announcements.value[index] = updated;
    } catch (err) {
      error.value = "Error al actualizar";
      throw err;
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      const updated = await announcementService.toggleAnnouncementStatus(id);
      const index = announcements.value.findIndex((a) => a.Id === id);
      if (index !== -1) {
        announcements.value[index] = updated;
      }
    } catch (err) {
      error.value = "Error al cambiar el estado del comunicado";
      console.error(err);
    }
  };

  return {
    announcements,
    loading,
    error,
    activeAnnouncements,
    fetchAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    toggleStatus,
  };
});
