<template>
  <div
    class="bg-white shadow-md rounded-2xl p-5 w-full md:w-[48%] flex flex-col justify-between"
  >
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <img :src="CalendarIcon" alt="calendario" class="w-6 h-6" />
        <h2 class="text-lg font-semibold text-gray-900">Calendario de actividades</h2>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="flex items-center gap-4">
      <img
        :src="calendarImg"
        alt="Calendario escolar"
        class="w-40 h-50 object-cover rounded-md border-2 border-gray-200"
      />
      <p class="text-gray-800 font-medium">
        Calendario escolar 2025 - 2026
      </p>
    </div>

    <!-- Pie -->
    <div class="flex items-center justify-end mt-6">
      <BaseButton
        text="Actualizar"
        customClass="bg-[#1226AB] px-6 py-2"
        @click="isModalOpen = true"
      />
    </div>

    <!-- Modal -->
    <LinkingCalendarModal
      :visible="isModalOpen"
      @close="isModalOpen = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import CalendarIcon from "@/assets/icons/Calendar.svg";
import LinkingCalendarModal from "./elements/LinkingCalendarModal.vue";
const props = defineProps({
  calendarImg: {
    type: String,
    default: "/public/images/calendario_demo.jpg",
  },
});

const isModalOpen = ref(false);

const handleSave = (data: any) => {
  console.log("Archivo de calendario actualizado:", data);
  isModalOpen.value = false;
};
</script>
