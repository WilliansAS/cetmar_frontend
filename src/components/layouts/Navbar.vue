<template>
  <nav class="bg-white shadow-md w-full">
    <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img src="/images/logo_cetmar.svg" alt="Logo CETMAR 41" class="w-12 h-12" />
      </div>
      <!-- Links -->
      <ul class="flex-1 flex justify-end items-center gap-8 mr-8">
        <li>
          <router-link to="/" class="font-bold text-xs md:text-base tracking-widest uppercase border-b-2 border-black pb-1">INICIO</router-link>
        </li>
        <li>
          <router-link to="/nosotros" class="font-bold text-xs md:text-base tracking-widest uppercase hover:border-b-2 hover:border-black pb-1">NOSOTROS</router-link>
        </li>
        <li>
          <router-link to="/calendario" class="font-bold text-xs md:text-base tracking-widest uppercase hover:border-b-2 hover:border-black pb-1">CALENDARIO</router-link>
        </li>
      </ul>
      <!-- Botón Acceso sistema -->
      <router-link to="/login">
        <button class="bg-[#1436b0] text-white font-semibold px-6 py-2 rounded-xl transition-all text-xs md:text-base shadow-sm hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 hover:shadow-lg focus:outline-none">
          Acceso sistema
        </button>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
</script>
