<template>
  <Navbar>
    <!-- BANNER CON CARRUSEL -->
    <section
      class="relative w-full min-h-[55vh] md:min-h-[75vh] flex items-center justify-center text-white overflow-hidden"
    >
      <!-- Slides -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="flex h-full transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${bannerIndex * 100}%)` }"
        >
          <div
            v-for="(img, i) in bannerImages"
            :key="i"
            class="min-w-full h-full relative"
          >
            <img
              :src="img"
              class="w-full h-full object-cover object-center"
              alt="Banner CETMAR"
            />
          </div>
        </div>

        <!-- Overlays -->
        <div class="absolute inset-0 bg-black/60"></div>
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#1436b0]/70 via-[#1436b0]/40 to-transparent"
        ></div>
      </div>

      <!-- Contenido -->
      <div
        class="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-8 md:px-16 animate-fade-in-up"
      >
        <h1
          class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-xl"
        >
          CETMAR 41 CANCÚN
        </h1>
        <p
          class="text-base sm:text-lg md:text-2xl text-white/95 font-light leading-relaxed"
        >
          Formación técnica y profesional de calidad en Cancún.
        </p>
      </div>

      <!-- Indicadores -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        <button
          v-for="(_, i) in bannerImages"
          :key="i"
          @click="goToBanner(i)"
          class="w-3 h-3 rounded-full transition-all"
          :class="
            bannerIndex === i
              ? 'bg-white scale-125'
              : 'bg-white/50 hover:bg-white'
          "
        ></button>
      </div>
    </section>

    <!-- ESPECIALIDADES -->
   <section class="py-20 bg-gradient-to-b from-white to-slate-50">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-center text-3xl md:text-4xl font-extrabold mb-3">
          Nuestra Oferta Educativa
        </h2>
        <p
          class="text-center text-sm font-semibold text-[#1436b0] uppercase tracking-widest mb-12"
        >
          Carreras Técnicas
        </p>
      
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div
            v-for="esp in especialidades"
            :key="esp.id"
            @click="goToEspecialidad(esp.id)"
            class="relative group aspect-[5/7] rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all"
          >
            <img
              :src="esp.hero.imagen"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <!-- Overlay de control -->
            <div class="absolute inset-0 bg-blue-700/20"></div>

            <!-- Fondo para el logo -->
            <div class="absolute top-2 left-2 w-12 h-12 md:w-20 md:h-20 bg-white/60 rounded-lg backdrop-blur-sm"></div>

            <!-- Logo de la carrera -->
            <img
              :src="esp.hero.logo"
              class="absolute top-3 left-3 w-10 h-10 md:w-16 md:h-16 object-contain drop-shadow-lg z-10"
            />

            <div class="absolute bottom-0 p-3 md:p-6 z-10">
              <h3 class="text-sm md:text-xl font-bold text-white">
                {{ esp.hero.titulo }}
              </h3>
              <span class="text-white/80 text-xs md:text-sm">Conocer más</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NUESTRA INSTITUCIÓN -->
    <section class="py-20 bg-white relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-[#26E7C8]/10 via-transparent to-[#009BE5]/10"
      ></div>

      <div class="relative max-w-7xl mx-auto px-6">
        <h2 class="text-center text-3xl md:text-5xl font-extrabold mb-16">
          Nuestra Institución
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div class="animate-fade-in-up">
            <p
              class="text-sm font-semibold text-[#1436b0] uppercase tracking-widest mb-2"
            >
              Bienvenidos al
            </p>
            <h3 class="text-3xl md:text-4xl font-extrabold mb-5">
              Centro de Estudios Tecnológicos del Mar No. 41
            </h3>
            <p
              class="text-base md:text-lg text-slate-700 border-l-4 border-[#1436b0] pl-4"
            >
              En CETMAR 41 Cancun formamos jóvenes preparados para transformar
              su futuro. Con educación técnica de calidad, práctica real y
              docentes comprometidos con el desarrollo profesional.
            </p>
          </div>

          <div class="rounded-2xl overflow-hidden shadow-xl animate-fade-in">
            <img
              src="/images/NuestraInstitucionHome.svg"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- CARACTERÍSTICAS -->
        <div
          class="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        >
          <div
            v-for="(item, i) in caracteristicas"
            :key="i"
            class="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div
              class="w-16 h-16 mx-auto bg-[#1436b0]/10 text-[#1436b0] rounded-xl flex items-center justify-center"
            >
              <img :src="item.icon" class="w-8 h-8" />
            </div>
            <h4 class="text-xl font-bold mt-4">{{ item.titulo }}</h4>
            <p class="text-sm text-slate-600 mt-2">
              {{ item.descripcion }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- GALERÍA -->
    <section class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-center text-3xl md:text-4xl font-extrabold mb-6">
          Conoce el Plantel
        </h2>
        <p class="text-center text-slate-600 mb-12">
          Un vistazo a nuestras instalaciones.
        </p>

        <div class="relative overflow-hidden">
          <div
            class="flex transition-transform duration-700 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 33.33}%)` }"
          >
            <div
              v-for="(img, index) in gallery"
              :key="index"
              class="w-1/3 flex-shrink-0 px-3"
            >
              <img
                :src="img"
                class="w-full h-56 sm:h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </Navbar>
</template>

<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { especialidades } from "../especialidades.mock";
import IconInstalaciones from "@/assets/icons/Instalaciones.svg";
import IconDocentes from "@/assets/icons/Docentes.svg";
import IconVinculacion from "@/assets/icons/Vinculacion.svg";

const router = useRouter();
const goToEspecialidad = (id) => router.push(`/especialidad/${id}`);

/* ================= BANNER ================= */
const bannerImages = [
  "/images/Home1.webp",
  "/images/Home2.webp",
  "/images/Home3.webp",
];

const bannerIndex = ref(0);
let bannerInterval;

const nextBanner = () => {
  bannerIndex.value = (bannerIndex.value + 1) % bannerImages.length;
};

const resetBannerTimer = () => {
  clearInterval(bannerInterval);
  bannerInterval = setInterval(nextBanner, 6000);
};

const goToBanner = (i) => {
  bannerIndex.value = i;
  resetBannerTimer();
};

/* ================= GALERÍA ================= */
const gallery = [
  "/images/HomeImg1.svg",
  "/images/HomeImg2.svg",
  "/images/HomeImg3.svg",
  "/images/HomeImg1.svg",
  "/images/HomeImg2.svg",
  "/images/HomeImg3.svg",
];

const VISIBLE_IMAGES = 3;
const currentSlide = ref(0);
let galleryInterval;

const maxSlide = gallery.length - VISIBLE_IMAGES;

const nextSlide = () => {
  currentSlide.value =
    currentSlide.value >= maxSlide ? 0 : currentSlide.value + 1;
};

onMounted(() => {
  bannerInterval = setInterval(nextBanner, 6000);
  galleryInterval = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  clearInterval(bannerInterval);
  clearInterval(galleryInterval);
});

/* ================= DATA ================= */
const caracteristicas = [
  {
    titulo: "Instalaciones de Vanguardia",
    descripcion:
      "Laboratorios y talleres equipados para una formación práctica y real.",
    icon: IconInstalaciones,
  },
  {
    titulo: "Docentes Comprometidos",
    descripcion:
      "Profesionales dedicados a guiar y potenciar el talento de los alumnos.",
    icon: IconDocentes,
  },
  {
    titulo: "Vinculación Estratégica",
    descripcion:
      "Conectamos a los estudiantes con el sector productivo para su éxito profesional.",
    icon: IconVinculacion,
  },
];
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out both;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out both;
}
</style>
