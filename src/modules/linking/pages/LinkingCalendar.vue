<script setup lang="ts">
import { ref } from "vue";
import LinkingLayout from "../components/LinkingLayout.vue";
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
  <LinkingLayout>
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

      <!-- Imágenes -->
      <div class="flex flex-wrap gap-6">
        <LinkingImages
          title="Banner Calendario"
          :images="bannerCalendar"
          :maxImages="1"
          description="Imagen principal del banner para la sección de calendario."
          @update:images="bannerCalendar = $event"
        />

        <LinkingImages
          title="Calendario Académico"
          :images="academicCalendar"
          :maxImages="1"
          description="Calendario que detalla las fechas importantes del ciclo escolar."
          @update:images="academicCalendar = $event"
        />

        <LinkingImages
          title="Calendario Ambiental"
          :images="environmentalCalendar"
          :maxImages="1"
          description="Calendario con actividades y eventos ambientales."
          @update:images="environmentalCalendar = $event"
        />
      </div>

      <!-- Comunicados -->
      <LinkingCommuniques />
    </div>
  </LinkingLayout>
</template>
