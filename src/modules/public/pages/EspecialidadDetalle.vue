<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div class="flex-1">
      <HeroEspecialidad :hero="especialidad?.hero ?? { titulo: '', descripcion: '', imagen: '' }"
        :colores="especialidad?.colores" />
      <div>
        <div class="w-full flex justify-center">
          <div class="w-full max-w-5xl">
            <IntroEspecialidad :intro="especialidad?.intro ?? { titulo: '', descripcion: '', imagen: '' }"
              :colores="especialidad?.colores" />
          </div>
        </div>
        <div class="text-center text-gray-700 font-semibold mb-4 text-lg tracking-wide w-full font-montserrat">
          ACTIVIDADES QUE PUEDES HACER EN ESTA CARRERA
        </div>
        <CardsActividades :actividades="especialidad?.actividades ?? []" :colores="especialidad?.colores" />
        <div class="my-8 w-full">
          <div class="bg-white rounded-t-xl p-6 text-center w-full">
            <div class="text-2xl md:text-3xl font-bold mb-0" v-html="especialidad?.footer?.texto"></div>
          </div>
          <div :class="[especialidad?.colores?.fondoFooter || 'bg-blue-700', 'p-12 text-center w-full']">
            <div :class="[especialidad?.colores?.textoFooter || 'text-white', 'italic text-lg md:text-xl leading-snug font-medium whitespace-pre-line']">
              {{ especialidad?.footer?.descripcion }}
            </div>
          </div>
        </div>
      </div>
    </div>
  <Footer :colores="especialidad?.colores" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeroEspecialidad from '../components/HeroEspecialidad.vue';
import IntroEspecialidad from '../components/IntroEspecialidad.vue';
import CardsActividades from '../components/CardsActividades.vue';
import Navbar from '@/components/layouts/Navbar.vue';
import Footer from '@/components/layouts/Footer.vue';
import { especialidades } from '../especialidades.mock';
import { useRoute } from 'vue-router';

const route = useRoute();
const especialidadId = route.params.id as string;

// Simular selección dinámica (puedes cambiar el id para probar)
const especialidad = ref(especialidades.find(e => e.id === especialidadId));
</script>
