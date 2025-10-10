<template>
  <div>
    <!-- Barra de navegación -->
    <nav class="bg-white shadow-md w-full">
      <div class="flex items-center justify-between px-6 py-2">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <img
            src="/images/logo_cetmar.svg"
            alt="Logo CETMAR 41"
            class="w-12 h-12"
          />
        </div>

        <!-- Contenedor de enlaces + botón -->
        <div class="flex items-center gap-6">
          <!-- Links dinámicos desde el arreglo -->
          <ul class="flex items-center gap-6">
            <li v-for="link in links" :key="link.text">
              <router-link
                :to="link.to"
                class="font-bold text-xs md:text-base tracking-widest uppercase pb-1"
                exact-active-class="border-b-2 border-black"
              >
                {{ link.text }}
              </router-link>
            </li>
          </ul>

          <!-- Botón Acceso sistema -->
          <router-link to="/login">
            <button
              class="bg-[#1436b0] text-white font-semibold px-6 py-2 rounded-xl transition-all text-xs md:text-base shadow-sm hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 hover:shadow-lg focus:outline-none cursor-pointer"
            >
              Acceso sistema
            </button>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Contenido dinámico de la página -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Arreglo de enlaces
const links = ref([
  { text: "INICIO", to: "/" },
  { text: "NOSOTROS", to: "/nosotros" },
  { text: "CALENDARIO", to: "/calendario" },
]);
</script>
