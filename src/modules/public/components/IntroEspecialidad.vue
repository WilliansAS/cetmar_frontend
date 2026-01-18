<template>
  <section
    class="py-16 md:py-20 px-6 md:px-16 text-center bg-white animate-fade-in-up"
  >
    <h2
      class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6"
      v-html="intro.titulo"
    ></h2>

    <p
      class="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
    >
      {{ intro.descripcion }}
    </p>

   
  </section>
</template>

<script setup lang="ts">
defineProps<{ intro: { titulo: string; descripcion: string; imagen: string } }>()
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.9s ease-out both;
}
</style>
