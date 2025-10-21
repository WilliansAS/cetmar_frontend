<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="(item, index) in visibleAnnouncements"
      :key="index"
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
          {{ item.title }}
        </h4>
      </div>

      <!-- CONTENIDO PRINCIPAL -->
      <div class="p-6 flex flex-col justify-between min-h-[180px]">
        <!-- BODY -->
        <p class="text-gray-700 text-sm flex-1 leading-relaxed font-medium mb-4 line-clamp-4">
          {{ item.content }}
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
            <span class="text-xs font-semibold">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showAll = ref(false);
const emit = defineEmits(['toggle-state']);

const announcements = [
  {
    title: "Boletas del Primer Parcial Disponibles",
    content:
      "Las boletas de calificaciones del primer parcial ya se encuentran disponibles en el sistema escolar. Los estudiantes pueden revisarlas en su portal institucional.",
    date: "22 de Agosto de 2025",
  },
  {
    title: "Inscripciones de Nuevo Ingreso",
    content:
      "Las inscripciones de los estudiantes de nuevo ingreso se llevarán a cabo del 20 al 23 de marzo de 2025.",
    date: "22 de Agosto de 2025",
  },
  {
    title: "Entrega de Documentación",
    content:
      "Se recuerda a todos los alumnos entregar su documentación completa antes del cierre del ciclo escolar.",
    date: "15 de Julio de 2025",
  },
  {
    title: "Inicio del Segundo Parcial",
    content:
      "El segundo parcial iniciará el próximo lunes. Revisa tus horarios actualizados en la plataforma.",
    date: "10 de Septiembre de 2025",
  },
  {
    title: "Evaluaciones Complementarias",
    content:
      "Los alumnos que tengan pendientes evaluaciones complementarias podrán realizarlas la próxima semana.",
    date: "2 de Octubre de 2025",
  },
  {
    title: "Convocatoria a Actividades Culturales",
    content:
      "Participa en las actividades culturales y deportivas de CETMAR 41. Las inscripciones están abiertas.",
    date: "28 de Octubre de 2025",
  },
];

const visibleAnnouncements = computed(() =>
  showAll.value ? announcements : announcements.slice(0, 3)
);

const toggleShowAll = () => {
  showAll.value = !showAll.value;
  // Emitir el evento con el nuevo estado
  emit('toggle-state', showAll.value);
};

// Exponer métodos al padre
defineExpose({
  toggleShowAll,
  showAll
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

.line-clamp-4 {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(4px);
}
</style>