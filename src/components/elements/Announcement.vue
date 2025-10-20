<template>
  <div
    class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 hover:border-blue-100 animate-fade-in-up hover:-translate-y-2"
  >
    <!-- HEADER CON GRADIENTE -->
    <div
      class="bg-gradient-to-r from-[#3b6eff] to-[#00A896] p-5 relative overflow-hidden"
    >
      <!-- brillo  -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></div>
      
      <!-- Patrón  -->
      <div
        class="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"
      ></div>
      
      <h4 class="text-lg font-bold text-white relative z-10 leading-tight drop-shadow-sm">
        {{ title }}
      </h4>
    </div>

    <!-- CONTENIDO PRINCIPAL -->
    <div class="p-6 flex flex-col justify-between min-h-[180px]">
      <!-- BODY -->
      <p class="text-gray-700 text-sm flex-1 leading-relaxed font-medium mb-4 line-clamp-4">
        {{ content }}
      </p>

      <!-- FOOTER  -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center text-gray-500">
          <!-- Ícono -->
          <svg
            class="w-4 h-4 mr-2 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="text-xs font-semibold">{{ date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
  date: String,
});
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* Utilidad para limitar líneas de texto */
.line-clamp-4 {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Efectos de hover mejorados */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(4px);
}
</style>