<template>
  <Navbar>
    <!-- BANNER -->
    <section
      class="relative w-full min-h-[85vh] flex items-center justify-center text-white overflow-hidden"
    >
      <div class="absolute inset-0">
        <img
          src="/images/calendario.jpg"
          alt="Banner calendario académico"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-black/30"></div>
        <!-- Gradiente -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#3b6eff]/60 to-transparent"
        ></div>
      </div>

      <!-- CONTENIDO -->
      <div
        class="relative z-10 text-center max-w-3xl mx-auto px-6 md:px-16 animate-fade-in-up"
      >
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold font-poppins mb-4 leading-tight">
          Calendario Académico y Avisos
        </h1>
        <p class="text-lg md:text-xl lg:text-2xl font-montserrat text-white/95 max-w-2xl mx-auto leading-relaxed">
          Consulta las fechas más importantes del ciclo escolar y mantente al
          día con los comunicados oficiales de CETMAR 41.
        </p>
      </div>
    </section>

    <!-- ciclo  -->
    <div class="w-full bg-gradient-to-r from-[#1226AB]  to-[#00A896] py-4 px-10 animate-fade-in-up">
      <div class="text-left">
        <span class="text-white font-bold text-lg md:text-xl font-montserrat tracking-wide">
          Ciclo Escolar 2025 - 2026
        </span>
      </div>
    </div>

    <!-- Comunicados recientes -->
    <section class="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20 px-6 md:px-20 animate-fade-in-up">
      <div class="max-w-6xl mx-auto">
        <!-- TÍTULO -->
        <div class="text-center mb-16">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins border-l-4 border-[#4880FF] pl-4 inline-block"
          >
            Comunicados Recientes
          </h2>
          <p class="text-gray-600 mt-4 text-base md:text-lg font-montserrat max-w-4xl mx-auto  backdrop-blur-sm rounded-xl  p-6">
            Mantente informado sobre las últimas noticias y comunicados oficiales de CETMAR 41
          </p>
        </div>

        <!-- ANUNCIOS  -->
        <Announcement 
          ref="announcementComponent"
          @toggle-state="handleToggleState"
        />

        <!-- BOTÓN DINÁMICO -->
        <div class="text-center mt-12">
          <button
            @click="$refs.announcementComponent.toggleShowAll()"
            class="bg-gradient-to-r from-[#4880FF] to-[#00A896] text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-base md:text-lg flex items-center justify-center mx-auto"
          >
            {{ showAllState ? 'Ver menos avisos' : 'Cargar más avisos' }}
            <svg 
              class="w-4 h-4 ml-2 transition-transform duration-300" 
              :class="{ 'rotate-180': showAllState }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- SECCIÓN DE CALENDARIO -->
    <section class="py-20 px-6 md:px-20 bg-gradient-to-br from-white via-blue-50/20 to-gray-50 animate-fade-in-up">
      <div class="max-w-6xl mx-auto">
        <!-- TÍTULO  -->
        <div class="text-center mb-16">
          <h3
            class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins border-l-4 border-[#00A896] pl-4 inline-block"
          >
            Calendario de Actividades
          </h3>
          <p class="text-gray-600 mt-4 text-base md:text-lg font-montserrat max-w-4xl mx-auto backdrop-blur-sm rounded-xl p-6">
            Consulta las fechas importantes, eventos y actividades programadas para el ciclo escolar actual
          </p>
        </div>

        <!-- CALENDARIO -->
        <div
          class="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:shadow-2xl transition-all duration-500"
        >
          <div class="bg-gradient-to-r from-[#1226AB] to-[#00A896] p-4 text-center">
            <h4 class="text-white font-bold text-lg font-poppins">Calendario Académico</h4>
          </div>
          <img
            src="/images/calendario_demo.jpg"
            alt="Calendario escolar"
            class="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>

    <Footer />
  </Navbar>
</template>

<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";
import Announcement from "@/modules/public/components/Announcement.vue";
import { ref } from "vue";

const announcementComponent = ref(null);
const showAllState = ref(false);

const handleToggleState = (newState) => {
  showAllState.value = newState;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Poppins:wght@700;800&display=swap");

.font-poppins {
  font-family: "Poppins", sans-serif;
}
.font-montserrat {
  font-family: "Montserrat", sans-serif;
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
.animate-fade-in-up {
  animation: fade-in-up 1s ease-out both;
}
</style>