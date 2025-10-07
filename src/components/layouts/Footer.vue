<template>
  <!-- FOOTER DEL CETMAR 41 -->
  <footer class="bg-white border-t border-gray-200 text-gray-800">
    <div
      class="max-w-7xl mx-auto px-5 py-4 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-10"
    >
      <!--Logo -->
      <div class="flex flex-col items-center md:items-start">
        <img
          src="/images/logo_cetmar.svg"
          alt="Logo CETMAR 41"
          class="w-32 h-32"
        />
      </div>

      <!-- Información de contacto -->
      <div class="text-center md:text-left">
        <h3 class="font-bold text-lg mb-4 md:text-center">
          INFORMACIÓN DE CONTACTO
        </h3>
        <ul class="space-y-4 text-sm">
          <li class="flex items-start gap-3">
            <img :src="PlaceIcon" alt="Ubicación" class="w-5 h-5 mt-2" />
            <span>
              <a
                href="https://maps.app.goo.gl/YDQXGKRs5qmpC3Uv7"
                target="_blank"
                class="hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                Reg.259 Mz. 84 Lt. 04 Av. Lakin, Cancún, México.
              </a>
            </span>
          </li>
          <li class="flex items-center gap-3">
            <img :src="CallIcon" alt="Teléfono" class="w-5 h-5" />
            <span>998 206 5683</span>
          </li>
          <li class="flex items-center gap-3">
            <img :src="EmailIcon" alt="Correo" class="w-5 h-5" />
            <span>
              <a
                href="mailto:qroo.cetmar41.direccion@dgetaycm.sems.gob.mx"
                class="hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                qroo.cetmar41.direccion@dgetaycm.sems.gob.mx
              </a>
            </span>
          </li>
        </ul>
      </div>

      <!-- Horario -->
      <div class="text-center md:text-center">
        <h3 class="font-bold text-lg mb-9">HORARIO DE ATENCIÓN</h3>
        <div class="flex items-start justify-center gap-3 text-sm">
          <img :src="TimeIcon" alt="Horario" class="w-5 h-5 mt-3" />
          <span>Lunes a Viernes<br />7:00 AM - 4:00 PM</span>
        </div>
      </div>

      <!--Redes sociales -->
      <div class="text-center">
        <h3 class="font-bold text-lg mb-10">SÍGUENOS EN NUESTRAS REDES</h3>
        <div class="flex justify-center md:justify-center gap-8">
          <a
            href="https://www.facebook.com/profile.php?id=100063648096556"
            target="_blank"
          >
            <img
              :src="FacebookIcon"
              alt="Facebook"
              class="w-8 h-8 hover:opacity-80 transition"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div
      class="border-t border-gray-300 text-center py-5 text-base flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6"
    >
      <div class="flex flex-col md:flex-row items-center gap-2">
        <p class="font-semibold text-gray-900">©2025, CETMAR 41 -</p>
        <p class="font-semibold text-gray-700">TODOS LOS DERECHOS RESERVADOS</p>
      </div>

      <div class="flex gap-6 mt-4 md:mt-0">
        <a
          href="#"
          class="font-medium text-gray-700 hover:text-blue-600 hover:underline transition-colors duration-200"
        >
          Aviso de privacidad
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import FacebookIcon from "@/assets/icons/Facebook.svg";
import InstagramIcon from "@/assets/icons/Instagram.svg";
import LinkedinIcon from "@/assets/icons/Linkedin.svg";
import TimeIcon from "@/assets/icons/Time.svg";
import CallIcon from "@/assets/icons/Call.svg";
import EmailIcon from "@/assets/icons/Email.svg";
import PlaceIcon from "@/assets/icons/Place.svg";
</script>
