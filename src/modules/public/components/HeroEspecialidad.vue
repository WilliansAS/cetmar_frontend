<template>
  <section :class="['relative w-full overflow-hidden min-h-[320px] md:min-h-[340px] flex items-center py-10 px-4 md:px-12 rounded-b-2xl', colores?.fondoHero]">
    <!-- Fondo diagonal -->
    <div class="hidden md:block absolute inset-0 z-0" style="pointer-events:none;">
      <svg width="100%" height="100%" viewBox="0 0 1200 340" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <polygon points="0,0 900,0 1200,340 0,340" :fill="colores?.primario || '#2563eb'" />
      </svg>
    </div>
    <div class="ml-12 flex-1 z-10 flex flex-col justify-center">
      <h1 :class="[colores?.textoHero, 'text-4xl md:text-5xl font-bold mb-2 leading-tight']">{{ hero.titulo }}</h1>
      <svg height="8" width="200" class="mb-6"><line x1="0" y1="6" x2="200" y2="6" style="stroke:#fff;stroke-width:5;stroke-linecap:round;filter: drop-shadow(0 1px 0 #fff);" /></svg>
      <p :class="[colores?.textoHero, 'text-lg md:text-xl max-w-xl']">{{ hero.descripcion }}</p>
    </div>
    <div class="flex-1 flex justify-end z-10">
      <img :src="hero.imagen" alt="Especialidad" class="max-h-64 md:max-h-80 mr-12 object-contain" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ hero: { titulo: string; descripcion: string; imagen: string }; colores?: any }>()
</script>
