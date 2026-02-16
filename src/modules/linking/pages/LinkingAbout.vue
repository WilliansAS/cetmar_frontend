<script setup lang="ts">
import Images from "../components/Images.vue";
</script>

<template>
  <div class="flex flex-col w-full p-6 gap-6">
    <div>
      <h1 class="text-3xl font-semibold text-gray-900">Contenido: Nosotros</h1>
      <p class="text-gray-500 text-base font-semibold">
        Gestión de imágenes de la vista Nosotros
      </p>
    </div>

    <!-- Secciones -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Images
        page="Nosotros"
        componentName="Banner"
        title="Banner - Nosotros"
        description="Imagen principal que se muestra en la parte superior. Tamaño recomendado: 1920x1080px."
      />

      <Images
        page="Nosotros"
        componentName="Imagen Descripción"
        title="Imagen Descripción"
        description="Imagen que acompaña la descripción general de la institución. Tamaño recomendado: 800x600px."
      />

      <Images
        page="Nosotros"
        componentName="Imagen Misión"
        title="Imagen Misión"
        description="Imagen representativa de la misión institucional. Tamaño recomendado: 800x600px."
      />

      <Images
        page="Nosotros"
        componentName="Imagen Visión"
        title="Imagen Visión"
        description="Imagen que ilustra la visión a futuro de la institución. Tamaño recomendado: 800x600px."
      />
    </div>
  </div>
</template>
