<script setup lang="ts">
import { ref } from "vue";
import LinkingImages, { type ImageItem } from "../components/LinkingImages.vue";
import LinkingCommuniques from "../components/LinkingCommuniques.vue";

// HARDCODE TEMPORAL
const bannerCalendar = ref<ImageItem[]>([
  {
    src: "/images/CulturalesDeportivas.webp",
    name: "Banner Calendario",
  },
]);

const academicCalendar = ref<ImageItem[]>([
  {
    src: "/images/Calendario2025-2026.webp",
    name: "Calendario Académico",
  },
]);

const environmentalCalendar = ref<ImageItem[]>([
  {
    src: "/images/calendario_ambiental.webp",
    name: "Calendario Ambiental",
  },
]);
</script>

<template>
  <div class="flex flex-col w-full p-6 gap-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-semibold text-gray-900">
        Contenido: Calendario
      </h1>
      <p class="text-gray-500 text-base font-semibold">
        Gestiona los calendarios del ciclo escolar y los comunicados para la comunidad
      </p>
    </div>

    <!-- Secciones de calendarios -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Banner Calendario -->
      <LinkingImages
        title="Banner Calendario"
        :images="bannerCalendar"
        :maxImages="1"
        description="Imagen principal del banner para la sección de calendario. Se muestra en la parte superior de la página. Tamaño recomendado: 1920x600px."
        variant="banner"
        @update:images="bannerCalendar = $event"
      />

      <!-- Calendario Académico -->
      <LinkingImages
        title="Calendario Académico"
        :images="academicCalendar"
        :maxImages="1"
        description="Calendario que detalla las fechas importantes del ciclo escolar (inicio de cursos, períodos vacacionales, exámenes, etc.). Tamaño recomendado: 1200x1600px."
        variant="banner"
        @update:images="academicCalendar = $event"
      />

      <!-- Calendario Ambiental -->
      <LinkingImages
        title="Calendario Ambiental"
        :images="environmentalCalendar"
        :maxImages="1"
        description="Calendario con actividades, eventos y fechas importantes relacionadas con el medio ambiente y sustentabilidad. Tamaño recomendado: 1200x1600px."
        variant="banner"
        @update:images="environmentalCalendar = $event"
      />
    </div>
    <div class="mt-6">
      <LinkingCommuniques />
    </div>
  </div>
</template>