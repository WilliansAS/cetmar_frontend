<template>
  <!-- FOOTER CETMAR 41 -->
  <footer class="bg-white border-t border-gray-200 text-gray-800">
    <!-- CONTENIDO PRINCIPAL -->
    <div
      class="max-w-7xl mx-auto px-4 py-6 flex flex-wrap md:flex-nowrap items-start justify-between gap-6"
    >
      <!-- LOGO -->
      <div class="flex-shrink-0 flex justify-center md:justify-start w-full sm:w-auto">
        <img
          src="/images/logo_cetmar.svg"
          alt="Logo CETMAR 41"
          class="w-16 sm:w-20 md:w-24 h-auto mx-auto md:mx-0"
        />
      </div>

      <!-- CONTACTO -->
      <div class="flex-1 min-w-[180px] max-w-xs text-xs sm:text-sm">
        <h3 class="font-bold mb-3 text-center md:text-left">
          CONTACTO
        </h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-2">
            <img :src="PlaceIcon" class="w-4 h-4 mt-1" />
            <a
              href="https://maps.app.goo.gl/YDQXGKRs5qmpC3Uv7"
              target="_blank"
              class="hover:text-blue-700 hover:underline transition"
            >
              Reg.259 Mz. 84 Lt. 04 Av. Lakin, Cancún, México
            </a>
          </li>
          <li class="flex items-center gap-2">
            <img :src="CallIcon" class="w-4 h-4" />
            <span>998 206 5683</span>
          </li>
          <li class="flex items-center gap-2">
            <img :src="EmailIcon" class="w-4 h-4" />
            <a
              href="mailto:qroo.cetmar41.direccion@dgetaycm.sems.gob.mx"
              class="hover:text-blue-700 hover:underline transition break-all sm:break-words"
            >
              qroo.cetmar41.direccion@dgetaycm.sems.gob.mx
            </a>
          </li>
        </ul>
      </div>

      <!-- HORARIO -->
      <div class="flex-1 min-w-[140px] text-xs sm:text-sm text-center">
        <h3 class="font-bold mb-3">
          HORARIO
        </h3>
        <div class="flex justify-center items-start gap-2">
          <img :src="TimeIcon" class="w-4 h-4 mt-1" />
          <span>
            Lunes a Viernes<br />
            7:00 AM - 4:00 PM
          </span>
        </div>
      </div>

      <!-- REDES -->
      <div class="flex-1 min-w-[140px] text-center">
        <h3 class="font-bold mb-3 text-xs sm:text-sm">
          SÍGUENOS
        </h3>
        <div class="flex justify-center gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=100063648096556"
            target="_blank"
          >
            <img
              :src="FacebookIcon"
              alt="Facebook"
              class="w-6 h-6 hover:opacity-80 transition"
            />
          </a>

          <a
            href="https://www.instagram.com/cetma_r412025"
            target="_blank"
          >
            <img
              :src="InstagramIcon"
              alt="Instagram"
              class="w-6 h-6 hover:opacity-80 transition"
            />
          </a>

          <a
            href="https://www.tiktok.com/@cet_mar41cancun"
            target="_blank"
          >
            <img
              :src="TiktokIcon"
              alt="TikTok"
              class="w-6 h-6 hover:opacity-80 transition"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- COPYRIGHT -->
    <div
      class="border-t border-gray-300 py-4 px-4 text-xs sm:text-sm flex flex-wrap md:flex-nowrap items-center justify-between gap-4 max-w-7xl mx-auto"
    >
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-semibold">©2025 CETMAR 41</span>
        <span class="text-gray-600">Todos los derechos reservados</span>
      </div>

      <a
        href="#"
        class="font-medium text-gray-700 hover:text-blue-600 hover:underline transition"
      >
        Aviso de privacidad
      </a>
    </div>
  </footer>
</template>

<script setup>
import FacebookIcon from "@/assets/icons/Facebook.svg";
import InstagramIcon from "@/assets/icons/Instagram.svg";
import TiktokIcon from "@/assets/icons/Tiktok.svg";
import TimeIcon from "@/assets/icons/Time.svg";
import CallIcon from "@/assets/icons/Call.svg";
import EmailIcon from "@/assets/icons/Email.svg";
import PlaceIcon from "@/assets/icons/Place.svg";
</script>
