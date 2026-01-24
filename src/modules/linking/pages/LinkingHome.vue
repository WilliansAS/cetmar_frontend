<script setup lang="ts">
import { ref } from "vue";
import LinkingLayout from "../components/LinkingLayout.vue";
import LinkingImages, { type ImageItem } from "../components/LinkingImages.vue";
import LinkingVideo from "../components/LinkingVideo.vue";

/* HARDCODE TEMPORAL */
const bannerImages = ref<ImageItem[]>([
  { src: "/images/Home1.webp", name: "Primera imagen del banner" },
  { src: "/images/Home2.webp", name: "Segunda imagen del banner" },
  { src: "/images/Home3.webp", name: "Tercera imagen del banner" },
]);

const specialtiesCovers = ref<ImageItem[]>([
  { src: "/images/VID.webp", name: "Portada de Vida Saludable" },
  { src: "/images/HOS.webp", name: "Portada de Servicios de Hospedaje" },
  { src: "/images/Lab.webp", name: "Portada de Laboratorio Ambiental" },
  { src: "/images/SIG.webp", name: "Portada de Sistemas de Organización Global" },
]);

const galleryImages = ref<ImageItem[]>([
  { src: "/images/HomeImg1.svg", name: "Primera imagen de la galería" },
  { src: "/images/HomeImg2.svg", name: "Segunda imagen de la galería" },
  { src: "/images/HomeImg3.svg", name: "Tercera imagen de la galería" },
]);

</script>

<template>
  <LinkingLayout>
    <div class="flex flex-col w-full p-6 gap-10">

      <!-- Header -->
      <div>
        <h1 class="text-3xl font-semibold text-gray-900">
          Contenido: Inicio
        </h1>
        <p class="text-gray-500 text-base font-semibold">
          Administración del contenido principal visible en la página de inicio
        </p>
      </div>

      <!-- Banner -->
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">
            Banner principal
          </h2>
          <p class="text-gray-500 text-sm">
            Imágenes que conforman el carrusel superior de la página de inicio.
          </p>
        </div>

        <LinkingImages
          title="Imágenes del banner"
          :images="bannerImages"
          :maxImages="3"
          :expectedNames="['Primera imagen del banner', 'Segunda imagen del banner', 'Tercera imagen del banner']"
          @update:images="bannerImages = $event"
        />
      </section>

      <!-- Especialidades -->
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">
            Portadas de especialidades
          </h2>
          <p class="text-gray-500 text-sm">
            Imágenes principales que representan cada especialidad.
          </p>
        </div>

        <LinkingImages
          title="Imágenes de especialidades"
          :images="specialtiesCovers"
          :maxImages="4"
          :expectedNames="['Portada de Vida Saludable', 'Portada de Servicios de Hospedaje', 'Portada de Laboratorio Ambiental', 'Portada de Sistemas de Organización Global']"
          @update:images="specialtiesCovers = $event"
        />
      </section>

      <!-- Video -->
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">
            Video institucional
          </h2>
          <p class="text-gray-500 text-sm">
            Video principal mostrado en la página de inicio de la plataforma.
          </p>
        </div>

        <LinkingVideo />
      </section>

      <!-- Galería -->
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">
            Galería inferior
          </h2>
          <p class="text-gray-500 text-sm">
            Imágenes que se muestran en el carrusel inferior de la página de inicio.
          </p>
        </div>

        <LinkingImages
          title="Galería"
          :images="galleryImages"
          :galleryMode="true"
          @update:images="galleryImages = $event"
        />
      </section>

    </div>
  </LinkingLayout>
</template>
