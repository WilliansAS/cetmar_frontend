<script setup lang="ts">
import LinkingCommuniques from "../components/LinkingCommuniques.vue";
import Images from "../components/Images.vue";
import LinkingFormats from "../components/LinkingFormats.vue";
</script>

<template>
  <div class="flex flex-col w-full p-6 gap-6">
    <div>
      <h1 class="text-3xl font-semibold text-gray-900">
        Contenido: Calendario
      </h1>
      <p class="text-gray-500 text-base font-semibold">
        Gestiona los calendarios del ciclo escolar y los comunicados para la
        comunidad
      </p>
    </div>

    <!-- Secciones de calendarios -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Banner Calendario -->
      <Images
        page="Calendario"
        componentName="Banner Calendario"
        title="Banner Calendario"
        description="Imagen principal del banner para la sección de calendario. Se muestra en la parte superior de la página. Tamaño recomendado: 1920x600px."
      />

      <!-- Calendario Académico -->
      <Images
        page="Calendario"
        componentName="Calendario Académico"
        title="Calendario Académico"
        description="Calendario que detalla las fechas importantes del ciclo escolar (inicio de cursos, períodos vacacionales, exámenes, etc.). Tamaño recomendado: 1200x1600px."
      />

      <!-- Calendario Ambiental -->
      <Images
        page="Calendario"
        componentName="Calendario Ambiental"
        title="Calendario Ambiental"
        description="Calendario con actividades, eventos y fechas importantes relacionadas con el medio ambiente y sustentabilidad. Tamaño recomendado: 1200x1600px."
      />
    </div>
    <div class="mt-6">
      <LinkingCommuniques />
    </div>

    <div class="mt-6">
      <LinkingFormats />
    </div>
  </div>
</template>
