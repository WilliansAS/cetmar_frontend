<template>
  <section :class="[
    'relative w-full flex items-center overflow-hidden',
    'min-h-[55vh] md:min-h-[70vh]',
    colores?.fondoHero || 'bg-blue-700'
  ]">
    <!-- Fondo -->
    <div class="absolute inset-0">
      <img :src="hero.imagen" alt="Especialidad" class="w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/70"></div>
    </div>

    <!-- Contenido -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 w-full">
      <div class="max-w-2xl text-center md:text-left animate-fade-in-up">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl"
          :class="colores?.textoHero">
          {{ hero.titulo }}
        </h1>

        <p class="text-base sm:text-lg md:text-xl max-w-xl leading-relaxed opacity-95" :class="colores?.textoHero">
          {{ hero.descripcion }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  hero: {
    titulo: string
    descripcion: string
    banner?: string
    imagen: string
  }
  colores?: any
}>()
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(35px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out both;
}
</style>
