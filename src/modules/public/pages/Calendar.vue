<template>
  <Navbar>
    <section
      class="relative w-full min-h-[55vh] md:min-h-[75vh] flex items-center justify-center text-white overflow-hidden"
    >
      <div class="absolute inset-0">
        <img
          :src="bannerImage"
          alt="Banner calendario académico"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-black/60"></div>
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#3b6eff]/60 to-transparent"
        ></div>
      </div>

      <div
        class="relative z-10 text-center max-w-3xl mx-auto px-4 md:px-16 animate-fade-in-up"
      >
        <h1
          class="text-3xl md:text-5xl lg:text-6xl font-extrabold font-poppins mb-4 leading-tight"
        >
          Calendario Académico y Avisos
        </h1>
        <p
          class="text-base md:text-xl font-montserrat text-white/95 leading-relaxed"
        >
          Consulta las fechas más importantes del ciclo escolar y mantente al
          día con los comunicados oficiales de CETMAR 41.
        </p>
      </div>
    </section>

    <div
      class="w-full bg-gradient-to-r from-[#1226AB] to-[#00A896] py-3 px-6 md:px-10"
    >
      <span class="text-white font-bold text-base md:text-xl font-montserrat">
        Ciclo Escolar 2025 - 2026
      </span>
    </div>

    <section
      class="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-16 px-4 md:px-20"
    >
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-8">
          <h2
            class="text-2xl md:text-4xl font-bold text-gray-900 font-poppins border-l-4 border-[#4880FF] pl-4 inline-block"
          >
            Comunicados Recientes
          </h2>
          <p
            class="text-gray-600 mt-4 text-sm md:text-lg font-montserrat max-w-3xl mx-auto"
          >
            Mantente informado sobre las últimas noticias y comunicados
            oficiales de CETMAR 41
          </p>
        </div>

        <Announcement
          ref="announcementComponent"
          @toggle-state="handleToggleState"
        />

        <div class="text-center mt-10">
          <button
            @click="announcementComponent?.toggleShowAll()"
            class="bg-gradient-to-r from-[#4880FF] to-[#00A896] text-white font-semibold py-3 px-6 md:px-8 rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center mx-auto text-sm md:text-base cursor-pointer"
          >
            {{ showAllState ? "Ver menos avisos" : "Cargar más avisos" }}
          </button>
        </div>
      </div>
    </section>

    <section
      class="py-16 px-4 md:px-20 bg-gradient-to-br from-white via-blue-50/20 to-gray-50"
    >
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <h3
            class="text-2xl md:text-4xl font-bold text-gray-900 font-poppins border-l-4 border-[#00A896] pl-4 inline-block"
          >
            Calendarios de Actividades
          </h3>
          <p
            class="text-gray-600 mt-4 text-sm md:text-lg font-montserrat max-w-3xl mx-auto"
          >
            Consulta los calendarios oficiales del ciclo escolar
          </p>
        </div>

        <div class="flex flex-col gap-16">
          <div class="calendar-card">
            <div class="calendar-header from-[#1226AB] to-[#00A896]">
              <h4 class="text-lg md:text-xl font-bold mb-1">
                Calendario Académico General
              </h4>
              <p class="text-sm md:text-base opacity-90">
                Ciclo Escolar 2025-2026
              </p>
            </div>
            <img
              :src="academicImg"
              alt="Calendario académico general"
              class="calendar-image"
              @click="openModal(academicImg, 'Calendario académico general')"
            />
          </div>

          <div class="calendar-card">
            <div class="calendar-header from-[#00A896] to-[#2EC4B6]">
              <h4 class="text-lg md:text-xl font-bold mb-1">
                Calendario Ambiental
              </h4>
              <p class="text-sm md:text-base opacity-90">
                Actividades Ambientales y de Sostenibilidad
              </p>
            </div>
            <img
              :src="environmentalImg"
              alt="Calendario ambiental"
              class="calendar-image"
              @click="openModal(environmentalImg, 'Calendario ambiental')"
            />
          </div>
        </div>
      </div>
    </section>

    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
        @click.self="closeModal"
      >
        <transition name="zoom">
          <div class="relative max-w-6xl w-full max-h-[90vh]">
            <button
              @click="closeModal"
              class="absolute -top-10 right-0 text-white text-4xl hover:scale-110 transition cursor-pointer"
            >
              ✕
            </button>
            <img
              :src="modalImage"
              :alt="modalAlt"
              class="w-full h-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        </transition>
      </div>
    </transition>

    <Footer />
  </Navbar>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useContentStore } from "@/store/content.store";
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";
import Announcement from "@/modules/public/components/Announcement.vue";

const store = useContentStore();
const baseUrl = import.meta.env.VITE_API_URL;

/* --- FILTRADO DE CONTENIDO DINÁMICO --- */
const calendarContent = computed(() =>
  store.contents.filter((c) => c.Page === "Calendario"),
);

// Banner
const bannerImage = computed(() => {
  const data = calendarContent.value.find(
    (c) => c.ComponentPage === "Banner Calendario",
  );
  return data
    ? `${baseUrl}${data.UrlImage}`
    : "/images/CulturalesDeportivas.webp";
});

// Académico
const academicImg = computed(() => {
  const data = calendarContent.value.find(
    (c) => c.ComponentPage === "Calendario Académico",
  );
  return data
    ? `${baseUrl}${data.UrlImage}`
    : "/images/Calendario2025-2026.webp";
});

// Ambiental
const environmentalImg = computed(() => {
  const data = calendarContent.value.find(
    (c) => c.ComponentPage === "Calendario Ambiental",
  );
  return data
    ? `${baseUrl}${data.UrlImage}`
    : "/images/calendario_ambiental.webp";
});

/* --- LÓGICA DE UI --- */
const announcementComponent = ref(null);
const showAllState = ref(false);
const showModal = ref(false);
const modalImage = ref("");
const modalAlt = ref("");

const openModal = (src, alt) => {
  modalImage.value = src;
  modalAlt.value = alt;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleToggleState = (state) => {
  showAllState.value = state;
};

onMounted(async () => {
  // Disparar carga de contenido si no está en LocalStorage/Store
  if (store.contents.length === 0) {
    await store.fetchContents();
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Poppins:wght@700;800&display=swap");

.font-poppins {
  font-family: "Poppins", sans-serif;
}
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.calendar-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #f1f1f1;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.4s ease;
}

.calendar-header {
  padding: 1.25rem;
  text-align: center;
  color: #0c0a09; /* Ajustado para legibilidad sobre el gradiente */
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.calendar-image {
  width: 100%;
  max-height: 850px;
  object-fit: contain;
  cursor: zoom-in;
  transition: transform 0.4s ease;
  background-color: #f8fafc;
}

.calendar-image:hover {
  transform: scale(1.005);
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.9s ease-out both;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.zoom-enter-active {
  transition:
    transform 0.35s ease,
    opacity 0.35s ease;
}
.zoom-enter-from {
  transform: scale(0.95);
  opacity: 0;
}
</style>
