<template>
  <Navbar>
   <!-- BANNER -->
<section
  class="relative w-full min-h-[55vh] md:min-h-[75vh] flex items-center text-white overflow-hidden"
>
  <!-- Fondo -->
  <div class="absolute inset-0">
    <img
      src="/images/Nosotros.webp"
      alt="Estudiantes CETMAR"
      class="w-full h-full object-cover object-center"
    />

    <div class="absolute inset-0 bg-black/60"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-[#3b6eff]/60 to-transparent"></div>

  </div>

  <!-- Contenido -->
  <div
    class="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 w-full flex justify-start"
  >
    <div
      class="max-w-xl text-center md:text-left animate-fade-in-up"
    >
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

      <!-- CTA -->
      <div class="mt-8">
        <a
          href="#mision"
          @click.prevent="scrollToMision"
          class="inline-flex items-center gap-2 bg-white text-[#3b6eff] font-semibold py-3 px-7 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
        >
          Conoce más
          <svg
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 5l7 7-7 7M5 12h14" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>


    <!-- INTRODUCCIÓN -->
    <section class="py-16 md:py-20 px-6 md:px-20 text-center bg-white animate-fade-in-up">
      <h2
        class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 font-poppins"
      >
        Formando jóvenes con
        <span class="text-[#4880FF]">visión de futuro</span>
      </h2>
      <p
        class="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-montserrat"
      >
        En el CETMAR 41 creemos que la educación es la mejor herramienta para
        transformar vidas. Cada especialidad, práctica y experiencia que
        ofrecemos está diseñada para impulsar el desarrollo académico, técnico y
        humano de nuestros estudiantes, preparándolos para enfrentar los retos
        del futuro y construir un mundo mejor.
      </p>
    </section>

    <!-- IMAGEN INSTITUCIONAL (reemplaza video) -->
    <section class="px-6 md:px-20 mb-20 flex justify-center animate-fade-in">
      <div
        class="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white"
      >
        <div class="aspect-video">
          <img
            src="/images/Placeholder.webp"
            alt="Imagen institucional CETMAR"
            class="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>

    <!-- MISIÓN -->
    <section
      id="mision"
      class="py-16 md:py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-white via-blue-50 to-gray-100 animate-fade-in-up"
    >
      <div>
        <h3
          class="text-xl md:text-2xl font-bold text-gray-900 mb-4 font-poppins border-l-4 border-[#4880FF] pl-3"
        >
          Misión
        </h3>
        <p
          class="text-gray-700 leading-relaxed font-montserrat text-base md:text-lg bg-white/70 backdrop-blur-sm rounded-xl shadow p-5 md:p-6 hover:shadow-lg transition-all duration-500"
        >
          Ofrecer servicios de educación, capacitación y asistencia técnica en el tipo educativo 
          medio superior que contribuyan al desarrollo permanente de los educandos que cursan el 
          Bachillerato Tecnológico Agropecuario, Acuícola, Forestal y de Ciencias del Mar. <br/><br/>
          A través de un modelo que promueva la formación integral, con valores y respeto a los derechos 
          humanos, a la interculturalidad y a la diversidad, a partir del desarrollo del pensamiento
          crítico, la capacidad de solucionar problemas y una formación profesional técnica que consolide 
          sus conocimientos y aptitudes, cultura de emprendimiento y vinculación con el entorno regional. 
          <br/><br/>
          Para entregar a la sociedad personas con sentido de ciudadanía y liderazgo que coadyuven
          al desarrollo de sus comunidades y promuevan el uso sustentable de los recursos naturales.
        </p>
      </div>

      <div class="aspect-video w-full rounded-xl overflow-hidden shadow-xl">
        <img
          src="/images/Mision.webp"
          alt="Misión CETMAR"
          class="w-full h-full object-cover object-center"
        />
      </div>
    </section>

    <!-- VISIÓN -->
    <section
      class="py-16 md:py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gradient-to-tl from-gray-50 via-blue-50 to-white animate-fade-in"
    >
      <div class="aspect-video w-full rounded-xl overflow-hidden shadow-xl md:order-1 order-2">
        <img
          src="/images/Vision.webp"
          alt="Visión CETMAR"
          class="w-full h-full object-cover object-center"
        />
      </div>

      <div class="md:order-2 order-1">
        <h3
          class="text-xl md:text-2xl font-bold text-gray-900 mb-4 font-poppins border-l-4 border-[#4880FF] pl-3"
        >
          Visión
        </h3>
        <p
          class="text-gray-700 leading-relaxed font-montserrat text-base md:text-lg bg-white/70 backdrop-blur-sm rounded-xl shadow p-5 md:p-6 hover:shadow-lg transition-all duration-500"
        >
          Consolidarse como una institución educativa que ofrece una formación de calidad, 
          pertinente, incluyente y de excelencia, que contribuye socialmente formando 
          estudiantes con adaptabilidad al cambio. <br/><br/>
          Así como a las personas del medio rural
          y semiurbano que lo demandan, con un enfoque humanista, que atiende las necesidades 
          del aprendizaje individual y colectivo, para fortalecer el desarrollo económico, 
          social y cultural del país.
        </p>
      </div>
    </section>

    <Footer />
  </Navbar>
</template>

<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";

function scrollToMision() {
  const section = document.getElementById("mision");
  section?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Poppins:wght@700;800&display=swap");

.font-poppins {
  font-family: "Poppins", sans-serif;
}

.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

/* Animaciones */
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
