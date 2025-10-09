<template>
  <div class="min-h-screen bg-gray-200 flex flex-col">
    <!-- Navbar -->
    <Navbar />

    <!-- Hero/Slider -->
    <section class="w-full bg-black relative">
      <div class="w-full h-[420px] md:h-[450px] relative">
        <img src="/images/HomeImg1.svg" alt="CETMAR 41 Cancún" class="w-full h-full object-cover" />
        <div class="absolute inset-0 flex flex-col justify-center items-start md:items-center px-8 md:px-0" style="background: rgba(0,0,0,0.35);">
          <div class="max-w-4xl w-full">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">CETMAR 41 CANCÚN</h2>
            <p class="text-lg md:text-2xl font-medium text-white drop-shadow">Formación técnica y profesional de calidad en Cancún.</p>
          </div>
        </div>
        <!-- Slider dots -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <span class="w-3 h-3 bg-white rounded-full opacity-80 border border-gray-400"></span>
          <span class="w-3 h-3 bg-white rounded-full opacity-40 border border-gray-400"></span>
          <span class="w-3 h-3 bg-white rounded-full opacity-40 border border-gray-400"></span>
          <span class="w-3 h-3 bg-white rounded-full opacity-40 border border-gray-400"></span>
        </div>
      </div>
    </section>

    <!-- Oferta Educativa -->
    <section class="w-full relative py-14">
      <!-- Fondo diagonal blanco/verde menta -->
      <div class="absolute inset-0 w-full h-full -z-10">
        <svg width="100%" height="100%" viewBox="0 0 1440 500" preserveAspectRatio="none" class="w-full h-full">
          <polygon points="0,0 1440,0 1440,500 0,400" fill="#b6f0e7" />
          <polygon points="0,0 1440,0 1440,500 0,180" fill="#fff" />
        </svg>
      </div>
      <div class="max-w-6xl mx-auto relative">
        <h3 class="text-center text-2xl md:text-3xl font-bold text-blue-900 mb-1">NUESTRA OFERTA EDUCATIVA</h3>
        <div class="flex justify-center items-center mb-8">
          <span class="text-lg md:text-xl font-semibold text-[#1cc6b7] tracking-wide border-b-2 border-[#1cc6b7] px-2">CARRERAS TÉCNICAS</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-0">
          <!-- Card 1 -->
          <div class="rounded-2xl shadow-xl flex flex-col items-stretch min-h-[370px] bg-[#1e8fff]">
            <div class="text-white font-bold text-lg text-left px-6 pt-6 pb-0 leading-tight">Servicios de hospedaje</div>
            <img src="/images/ServiciosHospedajeHome.svg" alt="Servicios de hospedaje" class="w-full h-[300px] object-contain mt-0" />
          </div>
          <!-- Card 2 -->
          <div class="rounded-2xl shadow-xl flex flex-col items-stretch min-h-[370px] bg-white">
            <div class="text-gray-800 font-bold text-lg text-left px-6 pt-6 pb-0 leading-tight">Laboratorio ambiental</div>
            <img src="/images/LaboratorioAmbientalHome.svg" alt="Laboratorio ambiental" class="w-full h-[300px] object-contain mt-0" />
          </div>
          <!-- Card 3 -->
          <div class="rounded-2xl shadow-xl flex flex-col items-stretch min-h-[370px] bg-[#1e8fff]">
            <div class="text-white font-bold text-lg text-left px-6 pt-6 pb-0 leading-tight">Sistemas de Información Geográfica</div>
            <img src="/images/InformacionGeograficaHome.svg" alt="Sistemas de Información Geográfica" class="w-full h-[300px] object-contain mt-0" />
          </div>
          <!-- Card 4 -->
          <div class="rounded-2xl shadow-xl flex flex-col items-stretch min-h-[370px] bg-white">
            <div class="text-gray-800 font-bold text-lg text-left px-6 pt-6 pb-0 leading-tight">Vida Saludable</div>
            <img src="/images/VidaSaludableHome.svg" alt="Vida Saludable" class="w-full h-[300px] object-contain mt-0" />
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestra Institución -->
    <section class="w-full bg-white py-10">
      <div class="max-w-5xl mx-auto">
        <h3 class="text-center text-xl md:text-2xl font-bold text-blue-900 mb-6">NUESTRA INSTITUCIÓN</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <!-- Video y portada -->
          <div class="flex flex-col items-center">
            <div class="relative w-full max-w-md">
              <img src="/images/NuestraInstitucionHome.svg" alt="Portón CETMAR" class="rounded-xl w-full" />
              <button class="absolute inset-0 flex items-center justify-center">
                <svg class="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#2563eb" fill-opacity="0.8" />
                  <polygon points="10,8 16,12 10,16" fill="#fff" />
                </svg>
              </button>
            </div>
          </div>
          <!-- Texto -->
          <div>
            <h4 class="font-bold text-lg mb-2">Centro de Estudios Tecnologicos del Mar No. 41</h4>
            <p class="text-gray-700 text-sm md:text-base">
              En CETMAR 41 Cancún formamos jóvenes preparados para transformar su futuro. Con educación técnica de calidad, práctica real y docentes comprometidos, brindamos las herramientas necesarias para enfrentar los retos de hoy y construir un mañana exitoso.
            </p>
          </div>
        </div>
        <!-- Galería -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <img src="/images/HomeImg1.svg" alt="Galería 1" class="rounded-lg w-full aspect-square object-cover h-48 max-w-xs mx-auto" />
          <img src="/images/HomeImg2.svg" alt="Galería 2" class="rounded-lg w-full aspect-square object-cover h-48 max-w-xs mx-auto" />
          <img src="/images/HomeImg3.svg" alt="Galería 3" class="rounded-lg w-full aspect-square object-cover h-48 max-w-xs mx-auto" />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/layouts/Navbar.vue';
import Footer from '@/components/layouts/Footer.vue';
</script>

<style scoped>
</style>
