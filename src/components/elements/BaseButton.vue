<template>
  <button
    :type="type"
    @click="$emit('click')"
    :class="[
      // Clases base originales
      'flex items-center justify-center px-3 py-3.5 gap-3 bg-[#1226AB] rounded-[12px] font-semibold text-white transition focus:outline-none hover:brightness-110 cursor-pointer',
      // Responsividad
      'sm:px-4 sm:py-4 sm:text-lg md:px-5 md:py-4.5 md:text-xl',
      customClass,
    ]"
  >
    <!-- Icono opcional -->
    <img
      v-if="icon"
      :src="icon"
      alt="icono"
      class="w-6 h-6 sm:w-8 sm:h-8 object-contain"
    />

    <!-- Texto del botón -->
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: "button" },
  text: { type: String, default: "" },
  icon: { type: String, default: null },
  customClass: { type: String, default: "" }, // prop única para estilos personalizados
});
</script>
