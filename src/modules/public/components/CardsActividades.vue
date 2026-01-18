<template>
  <section class="w-full my-12 flex flex-col gap-12 px-4 md:px-0">
    <article
  v-for="(actividad, i) in actividades"
  :key="i"
  class="group relative max-w-screen-2xl mx-auto w-full
         grid grid-cols-1 md:grid-cols-2
         rounded-3xl overflow-hidden
         shadow-lg hover:shadow-2xl
         transition-all duration-500"
  :class="i % 2 !== 0 ? 'md:[&>div:first-child]:order-2' : ''"
>

      <!-- IMAGEN -->
<div class="relative h-64 md:h-[420px] overflow-hidden">
  <img
    :src="actividad.imagen"
    alt="Actividad"
    class="w-full h-full
           object-cover object-center
           transition-transform duration-700
           group-hover:scale-110"
  />

  <!-- Overlay -->
  <div
    class="absolute inset-0
           bg-gradient-to-t from-black/60 via-black/20 to-transparent"
  ></div>
</div>


      <!-- CONTENIDO -->
      <div
        :class="[
          'relative flex flex-col justify-center gap-4 p-8 md:p-12',
          colores?.fondoCard,
          colores?.textoCard
        ]"
      >
        <!-- Número decorativo -->
        <span
          class="absolute top-6 right-6 text-6xl font-extrabold opacity-20 select-none"
        >
          {{ i + 1 }}
        </span>

        <h3 class="text-2xl md:text-3xl font-extrabold leading-tight">
          {{ actividad.titulo }}
        </h3>

        <p class="text-base md:text-lg leading-relaxed opacity-90">
          {{ actividad.descripcion }}
        </p>

        <!-- Línea decorativa -->
        <div
          class="w-16 h-1 rounded-full mt-4"
          :class="colores?.textoCard || 'bg-white'"
        ></div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  actividades: {
    titulo: string
    descripcion: string
    imagen: string
  }[]
  colores?: any
}>()
</script>