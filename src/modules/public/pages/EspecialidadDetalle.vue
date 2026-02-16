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
            :intro="especialidad?.intro ?? { titulo: '', descripcion: '', imagen: '', logo: '', }"
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
import { ref, watchEffect, computed } from 'vue';
import HeroEspecialidad from '../components/HeroEspecialidad.vue';
import IntroEspecialidad from '../components/IntroEspecialidad.vue';
import CardsActividades from '../components/CardsActividades.vue';
import Navbar from '@/components/layouts/Navbar.vue';
import Footer from '@/components/layouts/Footer.vue';
import { especialidades } from '../especialidades.mock';
import { useRoute } from 'vue-router';
import { useContentStore } from "@/store/content.store";

const route = useRoute();
const contentStore = useContentStore();
const especialidadId = route.params.id as string;

// Mapeo inverso de ID ruta -> Nombre Pagina Backend
const slugToPageName: Record<string, string> = {
  "vida-saludable": "VidaSaludable",
  hospedaje: "ServiciosHospedaje",
  ambiental: "LaboratorioAmbiental",
  sig: "SistemasOrgGeografica",
};
const pageName = slugToPageName[especialidadId] || especialidadId;

// Estado base del mock obligatoriamente para colores y estructura fija
const especialidadBase = especialidades.find(e => e.id === especialidadId);
const especialidad = ref(especialidadBase ? { ...especialidadBase } : null);

// Cargar datos dinámicos
watchEffect(async () => {
    if (!especialidad.value) return;

    try {
        // 1. Cargar Banner
        const contents = await contentStore.fetchContentByPage(pageName);
        const bannerContent = contents.find(c => c.ComponentPage === "BannerPrincipal");
        
        if (bannerContent && bannerContent.UrlImage) {
            especialidad.value.hero.banner = bannerContent.UrlImage;
        }

        // 2. Cargar Actividades
        // Nota: Asumimos que fetchGeneralContents trae todo y filtramos por Type/Page
        // Idealmente el backend ofrecería /contents?type=VidaSaludable
        await contentStore.fetchGeneralContents();
        const target = pageName.toLowerCase();
        
        const dynamicActivities = contentStore.generalContents
            .filter(c => (c.Type && c.Type.toLowerCase() === target) || (c.Page && c.Page.toLowerCase() === target))
            .map(c => ({
                titulo: c.Titule,
                descripcion: c.Description,
                imagen: c.UrlImage || '/images/placeholder.jpg'
            }));
            
        if (dynamicActivities.length > 0) {
            especialidad.value.actividades = dynamicActivities;
        }
        
    } catch (e) {
        console.error("Error loading dynamic content for specialty", e);
    }
});
</script>
