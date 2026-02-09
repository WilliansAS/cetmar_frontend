<script setup lang="ts">
import ContentManager from "../components/ContentManager.vue";
import HeroSpecialty from "../components/HeroSpecialty.vue";
import HeroVideo from "../components/HeroVideo.vue";

// Define los slots fijos
const specialtySlots = [
  "Vida Saludable",
  "Servicios de Hospedaje",
  "Laboratorio Ambiental",
  "Sistemas de Información Geográfica",
];
</script>

<template>
  <div class="flex flex-col w-full p-6 gap-10">
    <div>
      <h1 class="text-3xl font-semibold text-gray-900">Contenido: Inicio</h1>
      <p class="text-gray-500 text-base font-semibold">
        Administración del contenido principal visible en la página de inicio
      </p>
    </div>

    <!-- Banner -->
    <ContentManager
      page="Inicio"
      componentName="Banner"
      title="Banner Principal"
      variant="banner"
    />

    <!-- Especialidades -->
    <HeroSpecialty
      page="Inicio"
      componentName="Especialidades"
      title="Portadas de Carreras Técnicas"
      :specialtyNames="specialtySlots"
    />

    <!-- Video -->
    <HeroVideo page="Inicio" componentName="Video" title="Video" />

    <!-- Galería -->
    <ContentManager
      page="Inicio"
      componentName="Galeria"
      title="Galería de Fotos"
    />
  </div>
</template>
