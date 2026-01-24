<script setup lang="ts">
import { ref } from "vue";
import LinkingLayout from "../components/LinkingLayout.vue";
import LinkingImages, { type ImageItem } from "../components/LinkingImages.vue";

// HARDCODE TEMPORAL 
const banner = ref<ImageItem[]>([
  {
    src: "/images/Nosotros.webp",
    name: "Banner Nosotros",
  },
]);

const descripcion = ref<ImageItem[]>([
  {
    src: "/images/Placeholder.webp",
    name: "Imagen Descripción",
  },
]);

const mision = ref<ImageItem[]>([
  {
    src: "/images/Mision.webp",
    name: "Imagen Misión",
  },
]);

const vision = ref<ImageItem[]>([
  {
    src: "/images/Vision.webp",
    name: "Imagen Visión",
  },
]);
</script>

<template>
  <LinkingLayout>
    <div class="flex flex-col w-full p-6 gap-6">

      <!-- Header -->
      <div>
        <h1 class="text-3xl font-semibold text-gray-900">
          Contenido: Nosotros
        </h1>
        <p class="text-gray-500 text-base font-semibold">
          Gestión de imágenes de la vista Nosotros
        </p>
      </div>

      <!-- Secciones -->
      <div class="flex flex-wrap gap-6">
        <LinkingImages
          title="Banner - Nosotros"
          :images="banner"
          :maxImages="1"
          description="Imagen principal que se muestra en la parte superior de la página Nosotros."
          @update:images="banner = $event"
        />

        <LinkingImages
          title="Imagen Descripción"
          :images="descripcion"
          :maxImages="1"
          description="Imagen que acompaña la descripción general de la institución."
          @update:images="descripcion = $event"
        />

        <LinkingImages
          title="Imagen Misión"
          :images="mision"
          :maxImages="1"
          description="Imagen representativa de la misión institucional."
          @update:images="mision = $event"
        />

        <LinkingImages
          title="Imagen Visión"
          :images="vision"
          :maxImages="1"
          description="Imagen que ilustra la visión a futuro de la institución."
          @update:images="vision = $event"
        />
      </div>
    </div>
  </LinkingLayout>
</template>
