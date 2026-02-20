<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">{{ specialtyTitle }}</h1>
      </div>

      <div class="mb-12">
        <LinkingImages 
          :images="bannerImages" 
          @add="handleAddBanner"
          @delete="handleDeleteContent"
        />
      </div>

      <div>
        <SpecialtyActivities 
          :activities="activities" 
          @add="handleAddActivity"
          @edit="handleEditActivity"
          @delete="handleDeleteContent"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

// Componentes hijos
import LinkingImages from "@/modules/linking/components/LinkingImages.vue";
import SpecialtyActivities from "@/modules/linking/components/SpecialtyActivities.vue";

// Servicios de API e Interfaces
import { getAllContents, createContent, updateContent, deleteContent } from "@/api/content.api";
import type { IContentPagePayload } from "@/interfaces/IContentPage";

const route = useRoute();

// --- MAPEOS DE DATOS ---
// Mapea el slug de la URL con el campo "Page" de tu Base de Datos
const pageBackendMap: Record<string, string> = {
  "hospedaje": "ServiciosHospedaje",
  "vida-saludable": "VidaSaludable",
  "ambiental": "LaboratorioAmbiental",
  "sig": "SIG",
};

// Mapea el slug con el título visual
const titleMap: Record<string, string> = {
  "hospedaje": "Servicios de Hospedaje",
  "vida-saludable": "Vida Saludable",
  "ambiental": "Laboratorio Ambiental",
  "sig": "Sistemas de Información Geográfica",
};

// --- ESTADO ---
const specialtyTitle = ref("");
const bannerImages = ref<any[]>([]);
const activities = ref<any[]>([]);
const isLoading = ref(false);

// --- LÓGICA DE CARGA ---
const fetchSpecialtyData = async () => {
  const currentSlug = route.params.slug as string;
  const backendPageName = pageBackendMap[currentSlug];
  
  if (!backendPageName) return;
  
  specialtyTitle.value = titleMap[currentSlug] || "Especialidad";
  isLoading.value = true;

  try {
    const allContents = await getAllContents();
    
    // Filtrar por la página actual (ej. "VidaSaludable")
    const pageContents = allContents.filter(item => item.Page === backendPageName);

    // Procesar Banners (ComponentPage: "BannerPrincipal")
    bannerImages.value = pageContents
      .filter(item => item.ComponentPage === "BannerPrincipal")
      .map(item => ({
        id: item.Id,
        name: item.Titule,
        // Concatenamos la URL del backend para que la imagen sea visible
        src: item.UrlImage ? `http://127.0.0.1:8000${item.UrlImage}` : '/placeholder.png'
      }));

    // Procesar Actividades (ComponentPage: "Actividad")
    activities.value = pageContents
      .filter(item => item.ComponentPage === "Actividad")
      .map(item => ({
        id: item.Id,
        title: item.Titule,
        description: item.Description,
        image: item.UrlImage ? `http://127.0.0.1:8000${item.UrlImage}` : '/placeholder.png'
      }));

  } catch (error) {
    console.error("Error al cargar datos del servidor:", error);
  } finally {
    isLoading.value = false;
  }
};

// --- OPERACIONES CRUD ---

// 1. Crear Actividad
const handleAddActivity = async (payload: { title: string, description: string, file: File | null }) => {
  const data: IContentPagePayload = {
    Page: pageBackendMap[route.params.slug as string],
    ComponentPage: "Actividad",
    Titule: payload.title,
    Description: payload.description,
    image: payload.file || undefined
  };

  try {
    await createContent(data);
    await fetchSpecialtyData(); // Refrescar vista
  } catch (e) {
    alert("Error al crear actividad");
  }
};

// 2. Editar Actividad
const handleEditActivity = async (id: number, payload: { title: string, description: string, file: File | null }) => {
  const data: IContentPagePayload = {
    Page: pageBackendMap[route.params.slug as string],
    ComponentPage: "Actividad",
    Titule: payload.title,
    Description: payload.description,
  };
  
  if (payload.file) data.image = payload.file;

  try {
    await updateContent(id, data);
    await fetchSpecialtyData();
  } catch (e) {
    alert("Error al actualizar");
  }
};

// 3. Crear Banner
const handleAddBanner = async (payload: { name: string, file: File }) => {
  const data: IContentPagePayload = {
    Page: pageBackendMap[route.params.slug as string],
    ComponentPage: "BannerPrincipal",
    Titule: payload.name,
    Description: "Imagen de Banner",
    image: payload.file
  };

  try {
    await createContent(data);
    await fetchSpecialtyData();
  } catch (e) {
    alert("Error al subir banner");
  }
};

// 4. Eliminar (Genérico para ambos)
const handleDeleteContent = async (id: number) => {
  try {
    await deleteContent(id);
    await fetchSpecialtyData();
  } catch (e) {
    alert("Error al eliminar el registro");
  }
};

// --- WATCHERS ---
// Re-ejecutar si el usuario navega entre especialidades
watch(
  () => route.params.slug,
  () => fetchSpecialtyData(),
  { immediate: true }
);

onMounted(() => {
  fetchSpecialtyData();
});
</script>