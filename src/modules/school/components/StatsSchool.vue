<template>
  <div class="w-full">
    <div
      v-if="loading"
      class="text-center py-4 text-[#1226AB] animate-pulse font-bold"
    >
      Cargando estadísticas...
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatsCard
        title="Estudiantes"
        :value="totalStudents.toLocaleString()"
        :iconSrc="UserGroup"
        iconBgClass="bg-purple-100"
      />

      <StatsCard
        title="Boletas Subidas"
        :value="processedReportCards.toLocaleString()"
        :iconSrc="Block"
        iconBgClass="bg-yellow-100"
      />

      <StatsCard :iconSrc="UserGroup" iconBgClass="bg-blue-100">
        <span class="text-sm lg:text-xs xl:text-sm font-semibold text-gray-500">
          Estudiantes regulares
        </span>
        <span class="text-xl font-bold text-green-600 mb-3">
          {{ regularStudents.toLocaleString() }}
        </span>

        <span class="text-sm lg:text-xs xl:text-sm font-semibold text-gray-500">
          Estudiantes irregulares
        </span>
        <span class="text-xl font-bold text-orange-500">
          {{ irregularStudents.toLocaleString() }}
        </span>
      </StatsCard>

      <StatsCard
        title="Bajas del semestre"
        :value="inactiveStudents.toLocaleString()"
        :iconSrc="Decline"
        iconBgClass="bg-red-100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/store/counter.store";

// Componentes e Iconos
import StatsCard from "../../../components/elements/StatsCard.vue";
import UserGroup from "@/assets/icons/Group-Purple.svg";
import Block from "@/assets/icons/Block.svg";
import Decline from "@/assets/icons/Decline.svg";

// Inicializar el nuevo store de contadores
const counterStore = useCounterStore();

// Extraemos las referencias reactivas necesarias
const {
  totalStudents,
  regularStudents,
  irregularStudents,
  inactiveStudents,
  processedReportCards, // Este viene del DTO all_counters
  loading,
} = storeToRefs(counterStore);

// Cargar todos los contadores al montar el componente
onMounted(async () => {
  await counterStore.fetchAllCounters();
});
</script>
