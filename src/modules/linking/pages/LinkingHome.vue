<script setup lang="ts">
import { ref } from "vue";
import LinkingImages, { type ImageItem } from "../components/LinkingImages.vue";
import LinkingVideo from "../components/LinkingVideo.vue";

const bannerImages = ref<ImageItem[]>([
  { src: "/images/Home1.webp", name: "Primera imagen del banner" },
  { src: "/images/Home2.webp", name: "Segunda imagen del banner" },
  { src: "/images/Home3.webp", name: "Tercera imagen del banner" },
]);

// Cambia a un array de objetos con nombre fijo
const specialtiesCovers = ref<Array<ImageItem & { slotName: string }>>([
  { 
    src: "/images/VID.webp", 
    name: "Portada de Vida Saludable",
    slotName: "Vida Saludable"
  },
  { 
    src: "/images/HOS.webp", 
    name: "Portada de Servicios de Hospedaje",
    slotName: "Servicios de Hospedaje"
  },
  { 
    src: "/images/Lab.webp", 
    name: "Portada de Laboratorio Ambiental",
    slotName: "Laboratorio Ambiental"
  },
  { 
    src: "/images/SIG.webp", 
    name: "Portada de Sistemas de Organización Global",
    slotName: "Sistemas de Organización Global"
  },
]);

// Define los slots fijos
const specialtySlots = [
  "Vida Saludable",
  "Servicios de Hospedaje",
  "Laboratorio Ambiental",
  "Sistemas de Organización Global",
];

const galleryImages = ref<ImageItem[]>([
  { src: "/images/HomeImg1.svg", name: "Primera imagen de la galería" },
  { src: "/images/HomeImg2.svg", name: "Segunda imagen de la galería" },
  { src: "/images/HomeImg3.svg", name: "Tercera imagen de la galería" },
]);

// Función para manejar el update de especialidades
const updateSpecialties = (newImages: ImageItem[]) => {
  // Mantiene los slotNames existentes
  const updated = newImages.map((img, index) => ({
    ...img,
    slotName: specialtiesCovers.value[index]?.slotName || specialtySlots[index] || `Especialidad ${index + 1}`
  }));
  specialtiesCovers.value = updated;
};
</script>

<template>
  <div class="flex flex-col w-full p-6 gap-10">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-semibold text-gray-900">Contenido: Inicio</h1>
      <p class="text-gray-500 text-base font-semibold">
        Administración del contenido principal visible en la página de inicio
      </p>
    </div>

    <!-- Banner -->
    <LinkingImages
      title="Imágenes del banner"
      :images="bannerImages"
      :maxImages="5"
      layout="list"
      @update:images="bannerImages = $event"
    />

    <!-- Especialidades - Ahora con slotLabels -->
    <LinkingImages
      title="Portadas de especialidades"
      :images="specialtiesCovers"
      :maxImages="4"
      :slotLabels="specialtySlots"
      layout="grid"
      keepSlots
      fixedSlots
      @update:images="updateSpecialties"
    />

    <!-- Video -->
    <LinkingVideo />

    <!-- Galería -->
    <LinkingImages
      title="Galería inferior"
      :images="galleryImages"
      layout="list"
      @update:images="galleryImages = $event"
    />
  </div>
</template>