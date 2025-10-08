<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 overflow-hidden"
  >
    <!-- BANNER -->
    <section
      class="relative w-full min-h-[85vh] flex flex-col md:flex-row items-center justify-between text-white overflow-hidden"
    >
      <!-- Fondo + imagen -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#3b6eff]/90 via-[#4a89ff]/80 to-[#4a89ff]/60"
      ></div>
      <img
        src="/images/Nosotros.jpg"
        alt="Estudiantes CETMAR"
        class="absolute inset-0 w-full h-full object-cover object-center opacity-100"
      />

      <!-- Difuminado -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#3b6eff]/100 via-[#4a89ff]/50 to-transparent"
      ></div>

      <!-- Contenido principal -->
      <div
        class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        <!-- Texto -->
        <div class="max-w-xl text-center md:text-left animate-fade-in-up">
          <h1
            class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight font-poppins drop-shadow-lg"
          >
            Construyendo tu futuro con <br />
            <span class="text-yellow-300">educación de calidad</span>
          </h1>
          <p
            class="text-lg text-white/90 max-w-md font-montserrat font-medium leading-relaxed"
          >
            En CETMAR 41 combinamos teoría y práctica para impulsar tu futuro
            profesional y humano.
          </p>
          <div class="mt-8">
            <a
              href="#mision"
              @click.prevent="scrollToMision"
              class="inline-block bg-white text-[#4880FF] font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              Conoce más
            </a>
          </div>
        </div>      
      </div>
    </section>

    <!-- INTRODUCCIÓN -->
    <section
      class="py-20 px-6 md:px-20 text-center bg-white animate-fade-in-up"
    >
      <h2
        class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 font-poppins"
      >
        Formando jóvenes con
        <span class="text-[#4880FF]">visión de futuro</span>
      </h2>
      <p
        class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed font-montserrat"
      >
        En el CETMAR 41 creemos que la educación es la mejor herramienta para
        transformar vidas. Cada especialidad, práctica y experiencia que
        ofrecemos está diseñada para impulsar el desarrollo académico, técnico y
        humano de nuestros estudiantes, preparándolos para enfrentar los retos
        del futuro y construir un mundo mejor.
      </p>
    </section>

    <!-- Placeholder pra el video -->
    <section class="px-6 md:px-20 mb-20 flex justify-center animate-fade-in">
      <div
        class="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white"
      >
        <div
          class="aspect-video flex items-center justify-center text-gray-400 text-xl font-semibold bg-gray-100"
        >
          Video Institucional (Próximamente)
        </div>
      </div>
    </section>

    <!-- MISIÓN -->
    <section
      id="mision"
      class="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center bg-gradient-to-br from-white via-blue-50 to-gray-100 animate-fade-in-up"
    >
      <div>
        <h3
          class="text-2xl font-bold text-gray-900 mb-4 font-poppins border-l-4 border-[#4880FF] pl-3"
        >
          Misión
        </h3>
        <p
          class="text-gray-700 leading-relaxed font-montserrat text-lg bg-white/70 backdrop-blur-sm rounded-xl shadow p-6 hover:shadow-lg transition-all duration-500"
        >
          Somos una institución comprometida con la formación integral de
          jóvenes, combinando teoría y práctica para preparar a nuestros
          estudiantes ante los retos del futuro. Con programas actualizados,
          docentes capacitados y un enfoque humano, impulsamos el desarrollo
          académico, técnico y social necesario para construir un futuro
          exitoso.
        </p>
      </div>
      <img
        src="/images/mision.jpg"
        alt="Misión CETMAR"
        class="rounded-xl shadow-xl w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700"
      />
    </section>

    <!-- VISIÓN -->
    <section
      class="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center bg-gradient-to-tl from-gray-50 via-blue-50 to-white animate-fade-in"
    >
      <img
        src="/images/vision.jpeg"
        alt="Visión CETMAR"
        class="rounded-xl shadow-xl w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700"
      />
      <div>
        <h3
          class="text-2xl font-bold text-gray-900 mb-4 font-poppins border-l-4 border-[#4880FF] pl-3"
        >
          Visión
        </h3>
        <p
          class="text-gray-700 leading-relaxed font-montserrat text-lg bg-white/70 backdrop-blur-sm rounded-xl shadow p-6 hover:shadow-lg transition-all duration-500"
        >
          Ser una institución reconocida por su calidad educativa y compromiso
          con el desarrollo integral de los jóvenes, formando profesionales
          competentes, éticos y responsables, capaces de generar un impacto
          positivo en su comunidad y en el mundo gracias a nuestras enseñanzas.
        </p>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "@/components/layouts/Footer.vue";
function scrollToMision() {
  const misionSection = document.getElementById("mision");
  if (misionSection) {
    misionSection.scrollIntoView({ behavior: "smooth" });
  }
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

/* Animaciones suaves */
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
  animation: fade-in 1s ease-out both;
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
