<template>
  <Sidebar :navItems="navItems">
    <template #default>
      <main>
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-1">
            ¡Bienvenido de Nuevo, José UG!
          </h1>
        </div>

        <div class="flex gap-6 justify-between items-stretch mb-8">
          <div
            class="flex-1 bg-white rounded-xl shadow-sm p-7 flex flex-col min-w-[280px]"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-gray-600 text-base font-normal">
                Promedio Actual
              </h3>
              <img src="/images/podium.svg" alt="Podium" class="w-7 h-7" />
            </div>
            <div class="flex flex-col justify-center items-center flex-1 py-2">
              <span class="text-3xl font-bold text-gray-900 mb-1">9.2</span>
              <span class="text-gray-500 text-base"
                >Durante el&nbsp; 5º Semestre</span
              >
            </div>
          </div>

          <div
            class="flex-1 bg-white rounded-xl shadow-sm p-7 flex flex-col min-w-[280px]"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-gray-600 text-base font-normal">
                Estado del alumno
              </h3>
              <img src="/images/podium.svg" alt="Podium" class="w-7 h-7" />
            </div>
            <div class="flex flex-col justify-center items-center flex-1 py-2">
              <span class="text-2xl font-bold text-gray-900 mb-1">Regular</span>
              <span class="text-gray-500 text-base"
                >Durante el&nbsp; 5º Semestre</span
              >
            </div>
          </div>

          <div
            class="flex-1 bg-white rounded-xl shadow-sm p-7 flex flex-col justify-between min-w-[280px]"
          >
            <div class="flex justify-between items-start mb-6">
              <h3 class="text-gray-600 text-lg font-normal">
                Anuncios Recientes
              </h3>
              <img
                src="/images/megaphone.svg"
                alt="Megaphone"
                class="w-8 h-8"
              />
            </div>
            <div class="space-y-5">
              <div v-if="loading" class="text-sm text-gray-400">
                Cargando anuncios...
              </div>
              <template v-else-if="recentAnnouncements.length">
                <div v-for="(ann, index) in recentAnnouncements" :key="ann.Id">
                  <div class="flex items-center gap-3">
                    <img
                      src="/images/classroom.svg"
                      alt="Icon"
                      class="w-6 h-6 text-blue-700"
                    />
                    <div>
                      <span class="font-semibold text-blue-900 leading-tight">{{
                        ann.Titule
                      }}</span
                      ><br />
                      <span class="text-gray-500 text-xs">{{
                        formatDate(ann.CreationDate)
                      }}</span>
                    </div>
                  </div>
                  <div
                    v-if="index === 0 && recentAnnouncements.length > 1"
                    class="border-t border-gray-100 mt-4"
                  ></div>
                </div>
              </template>
              <div v-else class="text-sm text-gray-400 italic">
                No hay anuncios vigentes.
              </div>
            </div>
          </div>
        </div>

        <section class="mb-8">
          <h2 class="text-2xl font-bold mb-6">
            Evaluaciones recientes y Consulta de Boletas
          </h2>
          <BaseTable :columns="gradeColumns" :data="gradeData" />

          <div class="mt-12">
            <h2 class="text-2xl font-bold mb-6">Descarga de Boletas</h2>
            <div class="flex justify-center">
              <button
                class="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                  />
                </svg>
                Descargar Boleta
              </button>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 class="text-lg font-semibold mb-4">Formatos Administrativos</h3>
          <div v-if="loading" class="text-sm text-gray-400">
            Obteniendo formatos...
          </div>
          <ul v-else-if="downloadableFormats.length" class="space-y-4">
            <li
              v-for="format in downloadableFormats"
              :key="format.Id"
              class="flex flex-col border-b border-gray-50 pb-2 last:border-0"
            >
              <span class="text-sm font-bold text-gray-800">{{
                format.Titule
              }}</span>
              <button
                @click="downloadAction(format.UrlDocument, format.Titule)"
                class="text-blue-700 hover:underline text-xs flex items-center gap-1 mt-1 cursor-pointer w-fit"
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {{ getFileName(format.UrlDocument) }}
              </button>
            </li>
          </ul>
          <div v-else class="text-sm text-gray-400 italic">
            No hay formatos disponibles en este momento.
          </div>
        </section>
      </main>
    </template>
  </Sidebar>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAnnouncementStore } from "@/store/announcement.store";
import Sidebar from "@/components/layouts/Sidebar.vue";
import BaseTable from "@/components/elements/BaseTable.vue";

// Inicialización del Store
const announcementStore = useAnnouncementStore();
const { announcements, loading } = storeToRefs(announcementStore);

onMounted(async () => {
  await announcementStore.fetchAnnouncements();
});

// Lógica de filtrado para Anuncios Recientes (Máximo 2)
const recentAnnouncements = computed(() => {
  return announcements.value
    .filter((a) => a.Type === "Comunicado" && a.IsActive)
    .sort(
      (a, b) =>
        new Date(b.CreationDate).getTime() - new Date(a.CreationDate).getTime(),
    )
    .slice(0, 2);
});

// Lógica para Formatos Descargables
const downloadableFormats = computed(() => {
  return announcements.value.filter((a) => a.Type === "Formato" && a.IsActive);
});

// Utilidades para archivos
const getFileName = (urlPath: string | null) => {
  if (!urlPath) return "documento.pdf";
  const parts = urlPath.split(/[\\/]/);
  return parts[parts.length - 1];
};

const downloadAction = async (urlPath: string | null, title: string) => {
  if (!urlPath) return;
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const cleanPath = urlPath.startsWith("app/")
      ? urlPath.replace("app/", "")
      : urlPath;
    const response = await fetch(`${baseUrl}/${cleanPath}`);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", `${title}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (e) {
    console.error("Error al descargar el archivo:", e);
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
  });
};

// Datos estáticos de la tabla
const gradeColumns = [
  { label: "Materia", field: "materia" },
  { label: "1º Parcial", field: "parcial1" },
  { label: "2º Parcial", field: "parcial2" },
  { label: "3º Parcial", field: "parcial3" },
  { label: "Promedio", field: "promedio" },
  {
    label: "Estado",
    field: "estado",
    className: (row) =>
      row.estado === "Aprobado"
        ? "text-green-500 font-medium"
        : "text-red-500 font-medium",
  },
];

const gradeData = [
  {
    materia: "Materia 1",
    parcial1: 9.2,
    parcial2: 9.2,
    parcial3: 9.2,
    promedio: 9.2,
    estado: "Aprobado",
  },
  {
    materia: "Materia 2",
    parcial1: 9.2,
    parcial2: 9.2,
    parcial3: 9.2,
    promedio: 9.2,
    estado: "Aprobado",
  },
  {
    materia: "Materia 3",
    parcial1: 9.2,
    parcial2: 9.2,
    parcial3: 9.2,
    promedio: 9.2,
    estado: "Aprobado",
  },
];

const navItems = [{ label: "Inicio", icon: "home", to: "/dashboard" }];
</script>
