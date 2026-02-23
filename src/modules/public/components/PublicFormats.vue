<template>
  <div class="w-full">
    <div v-if="loading" class="text-center py-20 text-gray-500 font-medium">
      <div
        class="animate-spin inline-block w-8 h-8 border-4 border-[#1226AB] border-t-transparent rounded-full mb-4"
      ></div>
      <p>Obteniendo documentos oficiales...</p>
    </div>

    <div
      v-else-if="filteredFormats.length"
      class="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div
        v-for="format in filteredFormats"
        :key="format.Id"
        class="flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
      >
        <div class="flex items-start gap-4 mb-4">
          <div
            class="p-3 bg-[#1226AB]/10 rounded-xl group-hover:bg-[#1226AB] transition-colors duration-300"
          >
            <svg
              class="w-6 h-6 text-[#1226AB] group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 leading-tight">
              {{ format.Titule }}
            </h3>
            <span
              class="inline-block mt-1 text-[10px] bg-[#1226AB] text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider"
            >
              Recurso Descargable
            </span>
          </div>
        </div>

        <p
          class="text-gray-600 text-sm mb-6 flex-1 leading-relaxed line-clamp-3"
        >
          {{
            format.Description ||
            "Este documento es un formato oficial para uso administrativo de la institución."
          }}
        </p>

        <div
          class="pt-4 border-t border-gray-100 flex items-center justify-between"
        >
          <div class="min-w-0 pr-2">
            <span
              class="text-[10px] text-gray-400 uppercase font-bold block mb-1"
              >Archivo</span
            >
            <p class="text-gray-500 text-xs truncate font-mono italic">
              {{ getFileName(format.UrlDocument) }}
            </p>
          </div>

          <button
            @click="downloadFile(format.UrlDocument, format.Titule)"
            class="inline-flex items-center gap-2 bg-[#1226AB] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#0e1d85] transition-all active:scale-95 shadow-lg shadow-blue-900/20 cursor-pointer flex-shrink-0"
          >
            <span>Descargar</span>
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-400 font-medium italic italic">
        No se encontraron formatos disponibles en esta categoría.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAnnouncementStore } from "@/store/announcement.store";
import { storeToRefs } from "pinia";

const announcementStore = useAnnouncementStore();
const { announcements, loading } = storeToRefs(announcementStore);

onMounted(async () => {
  await announcementStore.fetchAnnouncements();
});

const filteredFormats = computed(() =>
  announcements.value.filter(
    (item) => item.Type === "Formato" && item.IsActive,
  ),
);

const getDownloadUrl = (urlPath: string | null) => {
  if (!urlPath) return "";
  const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const cleanPath = urlPath.startsWith("app/")
    ? urlPath.replace("app/", "")
    : urlPath;
  return `${baseUrl}/${cleanPath}`;
};

const getFileName = (urlPath: string | null) => {
  if (!urlPath) return "archivo.pdf";
  const parts = urlPath.split(/[\\/]/);
  return parts[parts.length - 1];
};

const downloadFile = async (urlPath: string | null, title: string) => {
  if (!urlPath) return;

  try {
    const url = getDownloadUrl(urlPath);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al descargar");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const extension = urlPath.split(".").pop() || "pdf";

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", `${title}.${extension}`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Fallo en la descarga:", error);
    window.open(getDownloadUrl(urlPath), "_blank");
  }
};
</script>