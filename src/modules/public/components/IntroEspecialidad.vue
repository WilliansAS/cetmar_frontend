<template>
  <section :class="['rounded-xl p-6 md:p-12 my-8 flex flex-col items-center justify-center mx-auto', 'max-w-3xl']">
    <h2 class="text-center text-3xl md:text-4xl font-bold mb-4" v-html="intro.titulo"></h2>
    <p class="text-center text-gray-700 text-lg md:text-xl mb-6 max-w-2xl mx-auto">{{ intro.descripcion }}</p>
    <img :src="intro.imagen" alt="Intro especialidad" class="rounded-lg max-h-64 md:max-h-80 object-cover mb-2 mx-auto" />
  </section>
</template>

<script setup lang="ts">
defineProps<{ intro: { titulo: string; descripcion: string; imagen: string }; colores?: any }>()
</script>
