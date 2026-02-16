<template>
  <Navbar>
    <section
      class="relative w-full min-h-[55vh] md:min-h-[75vh] flex items-center text-white overflow-hidden"
    >
      <div class="absolute inset-0">
        <img
          :src="bannerImg"
          alt="Estudiantes CETMAR"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-black/60"></div>
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#3b6eff]/60 to-transparent"
        ></div>
      </div>

      <div
        class="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 w-full flex justify-start"
      >
        <div class="max-w-xl text-center md:text-left animate-fade-in-up">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight drop-shadow-xl"
          >
            Construyendo tu futuro con <br />
            <span class="text-yellow-300">educación de calidad</span>
          </h1>
          <p
            class="text-base sm:text-lg md:text-xl text-white/95 max-w-md font-medium leading-relaxed"
          >
            En CETMAR 41 combinamos teoría y práctica para impulsar tu futuro
            profesional y humano.
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-24 px-6 md:px-20 text-center bg-white relative">
      <div class="relative z-10 animate-fade-in-up">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 font-poppins"
        >
          Formando jóvenes con
          <span class="text-[#4880FF]">visión de futuro</span>
        </h2>
        <p
          class="text-gray-600 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed font-montserrat"
        >
          En el CETMAR 41 creemos que la educación es la mejor herramienta para
          transformar vidas. Cada especialidad, práctica y experiencia que
          ofrecemos está diseñada para impulsar el desarrollo académico, técnico
          y humano de nuestros estudiantes.
        </p>
      </div>
    </section>

    <section class="px-6 md:px-20 mb-24 flex justify-center animate-fade-in">
      <div
        class="w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-slate-100 bg-slate-100""
      >
        <div class="aspect-video relative">
          <img
            :src="descriptionImg"
            alt="Imagen institucional"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </section>

    <section
      id="mision"
      class="py-20 px-6 md:px-20 bg-slate-50 border-y border-slate-100"
    >
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch"
      >
        <div class="flex flex-col justify-center animate-fade-in-up">
          <div class="flex flex-col gap-2 mb-8">
            <div class="flex items-center gap-4">
              <span
                class="flex items-center justify-center w-12 h-12 bg-[#4880FF] text-white rounded-xl text-xl font-bold shadow-lg"
                >M</span
              >
              <h3 class="text-3xl font-bold text-gray-900 font-poppins">
                Misión
              </h3>
            </div>
            <div
              class="w-full h-px bg-gradient-to-r from-[#4880FF] to-transparent mt-2"
            ></div>
          </div>

          <div
            class="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10 h-full flex items-center relative overflow-hidden"
          >
            <div class="absolute left-0 top-0 bottom-0 w-2 bg-[#4880FF]"></div>
            <p
              class="text-gray-700 leading-relaxed font-montserrat text-base md:text-lg"
            >
              Ofrecer servicios de educación, capacitación y asistencia técnica
              en el tipo educativo medio superior que contribuyan al desarrollo
              permanente de los educandos que cursan el Bachillerato Tecnológico
              Agropecuario, Acuícola, Forestal y de Ciencias del Mar.
              <br /><br />
              A través de un modelo que promueva la formación integral, con
              valores y respeto a los derechos humanos, a la interculturalidad y
              a la diversidad, a partir del desarrollo del pensamiento crítico y
              una formación profesional técnica que consolide sus conocimientos.
            </p>
          </div>
        </div>

        <div
          class="aspect-video md:aspect-auto w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white animate-fade-in order-first md:order-last"
        >
          <img
            :src="misionImg"
            alt="Misión"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <section class="py-20 px-6 md:px-20 bg-white">
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch"
      >
        <div
          class="aspect-video md:aspect-auto w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white animate-fade-in"
        >
          <img
            :src="visionImg"
            alt="Visión"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="flex flex-col justify-center animate-fade-in-up">
          <div class="flex flex-col gap-2 mb-8">
            <div class="flex items-center gap-4">
              <span
                class="flex items-center justify-center w-12 h-12 bg-[#00A896] text-white rounded-xl text-xl font-bold shadow-lg"
                >V</span
              >
              <h3 class="text-3xl font-bold text-gray-900 font-poppins">
                Visión
              </h3>
            </div>
            <div
              class="w-full h-px bg-gradient-to-r from-[#00A896] to-transparent mt-2"
            ></div>
          </div>

          <div
            class="bg-slate-50 rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10 h-full flex items-center relative overflow-hidden"
          >
            <div class="absolute left-0 top-0 bottom-0 w-2 bg-[#00A896]"></div>
            <p
              class="text-gray-700 leading-relaxed font-montserrat text-base md:text-lg"
            >
              Consolidarse como una institución educativa que ofrece una
              formación de calidad, pertinente, incluyente y de excelencia, que
              contribuye socialmente formando estudiantes con adaptabilidad al
              cambio. <br /><br />
              Con un enfoque humanista, que atiende las necesidades del
              aprendizaje individual y colectivo, para fortalecer el desarrollo
              económico, social y cultural del país.
            </p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </Navbar>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useContentStore } from "@/store/content.store";
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";

const store = useContentStore();
const baseUrl = import.meta.env.VITE_API_URL;

const aboutContent = computed(() =>
  store.contents.filter((c) => c.Page === "Nosotros"),
);

const bannerImg = computed(() => {
  const data = aboutContent.value.find((c) => c.ComponentPage === "Banner");
  return data ? `${baseUrl}${data.UrlImage}` : "/images/Nosotros.webp";
});

const descriptionImg = computed(() => {
  const data = aboutContent.value.find(
    (c) => c.ComponentPage === "Imagen Descripción",
  );
  return data ? `${baseUrl}${data.UrlImage}` : "/images/Placeholder.webp";
});

const misionImg = computed(() => {
  const data = aboutContent.value.find(
    (c) => c.ComponentPage === "Imagen Misión",
  );
  return data ? `${baseUrl}${data.UrlImage}` : "/images/Mision.webp";
});

const visionImg = computed(() => {
  const data = aboutContent.value.find(
    (c) => c.ComponentPage === "Imagen Visión",
  );
  return data ? `${baseUrl}${data.UrlImage}` : "/images/Vision.webp";
});

onMounted(async () => {
  if (store.contents.length === 0) await store.fetchContents();
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

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.9s ease-out both;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(35px);
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
