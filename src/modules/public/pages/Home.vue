<template>
  <Navbar>
    <!-- BANNER -->
    <section class="w-full relative">
      <div class="w-full h-[500px] md:h-[600px] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80"
          alt="CETMAR 41 Cancún"
          class="w-full h-full object-cover scale-105"
        />
        <div
          class="absolute inset-0 flex flex-col justify-center items-center text-center p-4 bg-gradient-to-t from-[#1436b0]/85 via-[#1436b0]/55 to-transparent"
        >
          <div class="max-w-4xl w-full">
            <h2
              class="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight"
            >
              CETMAR 41 CANCÚN
            </h2>
            <p
              class="text-xl md:text-2xl font-light text-white/90 drop-shadow-md"
            >
              Formación técnica y profesional de calidad en Cancún.
            </p>
          </div>
        </div>
        <div
          class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10"
        >
          <button class="w-3 h-3 bg-white rounded-full"></button>
          <button
            class="w-3 h-3 bg-white/60 rounded-full hover:bg-white"
          ></button>
          <button
            class="w-3 h-3 bg-white/60 rounded-full hover:bg-white"
          ></button>
        </div>
      </div>
    </section>

    <!-- ESPECIALIDADES -->
    <section
      class="w-full relative py-20 bg-gradient-to-b from-white to-slate-50"
    >
      <div class="absolute top-0 left-0 w-full h-20 bg-[#1436b0]/5"></div>
      <div class="max-w-6xl mx-auto px-6 relative">
        <h3 class="text-center text-4xl font-extrabold text-slate-900 mb-3">
          Nuestra Oferta Educativa
        </h3>
        <p
          class="text-center text-sm font-semibold text-[#1436b0] uppercase tracking-widest mb-12"
        >
          Carreras Técnicas
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="esp in especialidades"
            :key="esp.id"
            @click="goToEspecialidad(esp.id)"
            class="group relative h-96 flex flex-col justify-end rounded-2xl shadow-xl overflow-hidden cursor-pointer border border-slate-100 hover:shadow-2xl transition-all duration-500"
          >
            <img
              :src="esp.hero.imagen"
              :alt="esp.hero.titulo"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
            ></div>
            <div class="relative z-10 p-6">
              <h4
                class="text-2xl font-bold text-white leading-tight drop-shadow-md"
              >
                {{ esp.hero.titulo }}
              </h4>
              <p class="text-white/80 text-sm mt-1">Conocer más</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NUESTRA INSTITUCIÓN -->
    <section class="w-full bg-white py-15 md:py-18 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-[#26E7C8]/10 via-transparent to-[#009BE5]/10"
      ></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <h3
          class="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-16"
        >
          Nuestra Institución
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p
              class="text-base md:text-lg font-semibold text-[#1436b0] uppercase tracking-widest mb-3"
            >
              BIENVENIDOS AL
            </p>
            <h3
              class="text-4xl md:text-5xl font-extrabold text-slate-900 mt-1 mb-5 leading-tight"
            >
              Centro de Estudios Tecnológicos del Mar No. 41
            </h3>
            <p
              class="text-lg text-slate-700 leading-relaxed mb-6 border-l-4 border-[#1436b0] pl-4"
            >
              En CETMAR 41 Cancún formamos jóvenes preparados para transformar
              su futuro. Con educación técnica de calidad, práctica real y
              docentes comprometidos con el desarrollo profesional.
            </p>
          </div>
          <div
            class="relative w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
          >
            <img
              src="/images/NuestraInstitucionHome.svg"
              alt="Portón CETMAR"
              class="rounded-2xl w-full object-cover"
            />
            <button
              class="absolute inset-0 flex items-center justify-center group"
              aria-label="Reproducir video"
            >
              <div
                class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 shadow-2xl transition-all duration-300 group-hover:bg-white group-hover:scale-110 flex items-center justify-center"
              >
                <svg
                  class="w-10 h-10 md:w-12 md:h-12 text-[#1436b0] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polygon points="10,8 16,12 10,16" fill="currentColor" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Bloque de características -->
        <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div
            v-for="(item, i) in caracteristicas"
            :key="i"
            class="bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-md p-10 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="w-20 h-20 bg-[#1436b0]/10 text-[#1436b0] rounded-xl flex items-center justify-center mx-auto"
            >
              <component :is="item.icon" class="w-10 h-10" />
            </div>
            <h4 class="text-2xl font-bold text-slate-800 mt-5">
              {{ item.titulo }}
            </h4>
            <p class="mt-3 text-base text-slate-600">
              {{ item.descripcion }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- GALERÍA (CARRUSEL visible de varias imágenes) -->
    <section class="w-full bg-slate-50 py-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6">
        <h3 class="text-4xl font-extrabold text-slate-900 mb-8 text-center">
          Conoce el Plantel
        </h3>
        <p class="text-center text-lg text-slate-600 mb-12">
          Un vistazo a nuestras instalaciones y vida estudiantil.
        </p>

        <div class="relative overflow-hidden">
          <div
            class="flex transition-transform duration-700 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 33.33}%)` }"
          >
            <div
              v-for="(img, index) in gallery"
              :key="index"
              class="flex-shrink-0 w-1/3 px-3 box-border"
            >
              <img
                :src="img"
                class="w-full h-64 md:h-80 rounded-xl object-cover shadow-lg border border-slate-100"
                :alt="`Imagen ${index + 1}`"
              />
            </div>
          </div>

          <button
            @click="prevSlide"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
          >
            ‹
          </button>
          <button
            @click="nextSlide"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
          >
            ›
          </button>
        </div>
      </div>
    </section>

    <Footer />
  </Navbar>
</template>

<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { especialidades } from "../especialidades.mock";

const router = useRouter();
function goToEspecialidad(id) {
  router.push(`/especialidad/${id}`);
}

// Características
const caracteristicas = [
  {
    titulo: "Instalaciones de Vanguardia",
    descripcion:
      "Laboratorios y talleres equipados para una formación práctica y real.",
    icon: "svg",
  },
  {
    titulo: "Docentes Comprometidos",
    descripcion:
      "Profesionales dedicados a guiar y potenciar el talento de los alumnos.",
    icon: "svg",
  },
  {
    titulo: "Vinculación Estratégica",
    descripcion:
      "Conectamos a los estudiantes con el sector productivo para su éxito profesional.",
    icon: "svg",
  },
];

// Galería tipo carrusel (3 visibles)
const gallery = [
  "/images/HomeImg1.svg",
  "/images/HomeImg2.svg",
  "/images/HomeImg3.svg",
  "/images/HomeImg1.svg",
  "/images/HomeImg2.svg",
  "/images/HomeImg3.svg",
];

const currentSlide = ref(0);
let interval;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % (gallery.length - 2);
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + (gallery.length - 2)) % (gallery.length - 2);
};

onMounted(() => {
  interval = setInterval(nextSlide, 5000);
});
onUnmounted(() => clearInterval(interval));
</script>
