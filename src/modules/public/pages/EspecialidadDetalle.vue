<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main class="flex-1">
      <!-- HERO -->
      <HeroEspecialidad
        :hero="especialidad?.hero ?? { titulo: '', descripcion: '', imagen: '', banner: '' }"
        :colores="especialidad?.colores"
      />

      <!-- INTRO -->
      <section class="py-16 md:py-20 px-6">
        <div class="max-w-5xl mx-auto">
          <IntroEspecialidad
            :intro="especialidad?.intro ?? { titulo: '', descripcion: '', imagen: '' }"
            :colores="especialidad?.colores"
          />
        </div>
      </section>

      <!-- ACTIVIDADES HEADER -->
      <section class="px-6">
        <div class="max-w-7xl mx-auto text-center mb-12">
          <h2
            class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-poppins"
          >
            Actividades que puedes realizar
          </h2>

          <div
            class="mx-auto h-1 w-24 rounded-full"
            :class="especialidad?.colores?.fondoCard || 'bg-blue-700'"
          ></div>

          <p
            class="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg font-montserrat"
          >
            Conoce algunas de las experiencias prácticas que forman parte de esta especialidad.
          </p>
        </div>
      </section>

      <!-- ACTIVIDADES -->
      <CardsActividades
        :actividades="especialidad?.actividades ?? []"
        :colores="especialidad?.colores"
      />

      <!-- FOOTER ESPECIALIDAD -->
      <section class="mt-20">
        <div class="bg-white py-10 px-6 text-center shadow-inner">
          <div
            class="text-2xl md:text-3xl font-extrabold text-gray-900"
            v-html="especialidad?.footer?.texto"
          ></div>
        </div>

        <div
          :class="[
            especialidad?.colores?.fondoFooter || 'bg-blue-700',
            'py-14 px-6 text-center'
          ]"
        >
          <p
            :class="[
              especialidad?.colores?.textoFooter || 'text-white',
              'max-w-3xl mx-auto text-base md:text-xl leading-relaxed italic font-medium'
            ]"
          >
            {{ especialidad?.footer?.descripcion }}
          </p>
        </div>
      </section>
    </main>

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
