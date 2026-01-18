<template>
  <div>
    <!-- NAVBAR -->
    <nav class="bg-white shadow-md w-full relative z-50">
      <div class="flex items-center justify-between px-6 py-3 max-w-8xl mx-auto">
        <!-- LOGO -->
        <router-link
          to="/"
          class="flex items-center gap-2 shrink-0"
        >
          <img
            src="/images/logo_cetmar.svg"
            alt="Logo CETMAR 41"
            class="w-12 h-12 object-contain"
          />
        </router-link>

        <!-- BOTÓN HAMBURGUESA (mobile) -->
        <button
          @click="toggleMenu"
          class="md:hidden text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- LINKS DESKTOP -->
        <div class="hidden md:flex items-center gap-8">
          <ul class="flex items-center gap-6">
            <li v-for="link in links" :key="link.text">
              <router-link
                :to="link.to"
                class="font-bold text-sm tracking-widest uppercase pb-1 transition-colors hover:text-blue-700"
                exact-active-class="border-b-2 border-black"
              >
                {{ link.text }}
              </router-link>
            </li>
          </ul>

          <!-- BOTÓN ACCESO -->
          <router-link to="/login">
            <button
              class="bg-[#1436b0] text-white font-semibold px-6 py-2 rounded-xl shadow-sm
                     hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500
                     hover:shadow-lg transition-all"
            >
              Acceso sistema
            </button>
          </router-link>
        </div>
      </div>

      <!-- MENÚ MOBILE -->
      <transition name="fade-slide">
        <div
          v-if="menuOpen"
          class="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4"
        >
          <ul class="flex flex-col gap-4 text-center">
            <li v-for="link in links" :key="link.text">
              <router-link
                :to="link.to"
                @click="closeMenu"
                class="block font-bold tracking-widest uppercase text-sm py-2"
              >
                {{ link.text }}
              </router-link>
            </li>
          </ul>

          <router-link to="/login" @click="closeMenu">
            <button
              class="w-full bg-[#1436b0] text-white font-semibold py-2 rounded-xl shadow
                     hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 transition-all"
            >
              Acceso sistema
            </button>
          </router-link>
        </div>
      </transition>
    </nav>

    <!-- CONTENIDO -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const links = ref([
  { text: "INICIO", to: "/" },
  { text: "NOSOTROS", to: "/nosotros" },
  { text: "CALENDARIO", to: "/calendario" },
]);
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
