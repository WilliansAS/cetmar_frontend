<template>
  <section class="w-full flex flex-col gap-0 my-8">
    <div
      v-for="(actividad, i) in actividades"
      :key="i"
      :class="[
        'flex min-h-[260px] md:min-h-[260px] w-full',
        i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
      ]"
    >
      <!-- Bloque azul con texto y SVG decorativo -->
  <div :class="['relative flex-1 flex flex-col justify-center p-8', colores?.fondoCard, colores?.textoCard]">
  <h3 class="text-3xl md:text-4xl font-bold mb-4 font-serif">{{ actividad.titulo }}</h3>
  <p class="text-xl md:text-2xl leading-snug">{{ actividad.descripcion }}</p>
        <!-- SVG decorativo -->
        <svg class="absolute opacity-10 bottom-4 right-4 w-40 h-28 pointer-events-none select-none hidden md:block" viewBox="0 0 180 120" fill="none"><!-- SVG decorativo aquí si lo deseas --></svg>
      </div>
      <!-- Imagen -->
      <div class="w-full md:w-1/2 h-full">
        <img
          :src="actividad.imagen"
          alt="Actividad"
          class="w-full h-full object-cover object-center min-h-[180px] md:min-h-[260px]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ actividades: { titulo: string; descripcion: string; imagen: string }[]; colores?: any }>()
</script>
