<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/layouts/Navbar.vue";
import HeroEspecialidad from "@/modules/public/components/HeroEspecialidad.vue";
import IntroEspecialidad from "@/modules/public/components/IntroEspecialidad.vue";
import CardsActividades from "@/modules/public/components/CardsActividades.vue";
import Footer from "@/components/layouts/Footer.vue";

import { getAllContents } from "@/api/content.api";
import { hospedaje } from "@/modules/linking/data/specialties/hospedaje";
import { laboratorio } from "@/modules/linking/data/specialties/laboratorio";
import { sig } from "@/modules/linking/data/specialties/sig";
import { vidaSaludable } from "@/modules/linking/data/specialties/vidaSaludable";

const route = useRoute();
const API_URL = import.meta.env.VITE_API_URL;

// Las llaves deben ser IDENTICAS al URL del navegador
const specialtiesMap: Record<string, any> = {
  "vida-saludable": vidaSaludable,           // URL: /vida-saludable
  "servicios-hospedaje": hospedaje,      
  "laboratorio-ambiental": laboratorio,    
  "organizacion-geografica": sig,           
};

const pageBackendMap: Record<string, string> = {
  "vida-saludable": "VidaSaludable",
  "servicios-hospedaje": "ServiciosHospedaje",
  "laboratorio-ambiental": "LaboratorioAmbiental",
  "organizacion-geografica": "SIG",
};

const dynamicBanner = ref("");
const dynamicActivities = ref<any[]>([]);
const isDataLoaded = ref(false);

const especialidad = computed(() => {
  const slug = route.params.slug as string;
  return specialtiesMap[slug] || null;
});

const loadDynamicContent = async () => {
  const slug = route.params.slug as string;
  const backendPage = pageBackendMap[slug];
  // console.log("Buscando en BD por:", backendPage);

  // // Si sigue saliendo undefined, esto te avisará en la consola
  // if (!backendPage) {
  //   console.error(`ERROR: El slug '${slug}' no tiene un nombre de página asignado en pageBackendMap.`);
  //   return;
  // }

  // console.log("¡Éxito! Buscando en BD por:", backendPage);
  try {
    const allData = await getAllContents();
    // Filtramos con "Page"
    const myContents = allData.filter(item => item.Page === backendPage);

    // Buscar Banner Principal
    const bannerObj = myContents.find(item => item.ComponentPage === "BannerPrincipal");
    if (bannerObj) {
      dynamicBanner.value = `${API_URL}${bannerObj.UrlImage}`;
      console.log("Banner encontrado en API:", dynamicBanner.value)
    }

    // Mapeo de Actividades
    dynamicActivities.value = myContents
      .filter(item => item.ComponentPage === "Actividad")
      .map(item => ({
        titulo: item.Titule,
        descripcion: item.Description,
        imagen: `${API_URL}${item.UrlImage}`,        
      }));

    isDataLoaded.value = true;
  } catch (error) {
    console.error("Error cargando API:", error);
    isDataLoaded.value = true;
  }
};

watch(() => route.params.slug, () => {
  loadDynamicContent();
}, { immediate: true });
</script>

<template>
  <div v-if="!especialidad" class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-xl font-bold text-red-500">Error: Especialidad "{{ $route.params.slug }}" no encontrada.</h1>
    <p class="text-gray-500">Verifica que el slug en la URL coincida con las llaves de specialtiesMap.</p>
  </div>

  <div v-else class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main class="flex-1">
      <HeroEspecialidad :hero="{
        titulo: especialidad.hero?.titulo || '',
        descripcion: especialidad.hero?.descripcion || '',
        imagen: dynamicBanner || especialidad.hero?.imagen
      }" :colores="especialidad.colores" />

      <section class="py-16 md:py-20 px-6">
        <div class="max-w-5xl mx-auto">
          <IntroEspecialidad v-if="especialidad && especialidad.intro" :intro="especialidad.intro"
            :colores="especialidad.colores" />
        </div>
      </section>

      <section class="px-6 pb-20">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Actividades que puedes realizar
            </h2>
            <div class="mx-auto h-1 w-24 rounded-full" :class="especialidad.colores?.fondoCard || 'bg-blue-600'"></div>
          </div>

          <CardsActividades :actividades="dynamicActivities.length > 0 ? dynamicActivities : especialidad.actividades"
            :colores="especialidad.colores" />
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>