<template>
  <div class="flex flex-col gap-10">
    <div v-if="loading" class="text-center py-20 text-gray-500 font-medium">
      Cargando comunicados...
    </div>

    <div
      v-else-if="visibleAnnouncements.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <div
        v-for="(item, index) in visibleAnnouncements"
        :key="item.Id || index"
        class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 hover:border-blue-100 animate-fade-in-up hover:-translate-y-2"
      >
        <div
          class="bg-gradient-to-r from-[#3b6eff] to-[#00A896] p-5 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>

          <h4
            class="text-lg font-bold text-white relative z-10 leading-tight drop-shadow-sm"
          >
            {{ item.Titule }}
          </h4>
        </div>

        <div class="p-6 flex flex-col justify-between min-h-[180px]">
          <p
            class="text-gray-700 text-sm flex-1 leading-relaxed font-medium mb-4 line-clamp-4"
          >
            {{ item.Description }}
          </p>

          <div
            class="flex items-center justify-between pt-4 border-t border-gray-100"
          >
            <div class="flex items-center text-gray-500">
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
              <span class="text-xs font-semibold">{{
                formatDate(item.CreationDate)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center py-20 text-gray-400">
      No hay comunicados vigentes en este momento.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAnnouncementStore } from "@/store/announcement.store";
import { storeToRefs } from "pinia";

// Inicializar Store
const announcementStore = useAnnouncementStore();
const { activeAnnouncements, loading } = storeToRefs(announcementStore);

const showAll = ref(false);
const emit = defineEmits(["toggle-state"]);

// Cargar datos al montar el componente
onMounted(async () => {
  await announcementStore.fetchAnnouncements();
});

// Lógica de visibilidad (3 primeros o todos)
const visibleAnnouncements = computed(() => {
  const onlyCommuniques = activeAnnouncements.value.filter(
    (item) => item.Type === "Comunicado",
  );

  return showAll.value ? onlyCommuniques : onlyCommuniques.slice(0, 3);
});

const toggleShowAll = () => {
  showAll.value = !showAll.value;
  emit("toggle-state", showAll.value);
};

// Utilidad para formatear fecha de ISO a legible
const formatDate = (dateString: string) => {
  if (!dateString) return "Sin fecha";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// Exponer para control desde el padre (Home o Landing)
defineExpose({
  toggleShowAll,
  showAll,
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
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>