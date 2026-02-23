<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/store/counter.store";

const counterStore = useCounterStore();

const {
  totalStudents,
  regularStudents,
  irregularStudents,
  inactiveStudents,
  maleStudents,
  femaleStudents,
  loading,
} = storeToRefs(counterStore);

// Cargar datos al montar
onMounted(async () => {
  await counterStore.fetchAllCounters();
});
</script>

<template>
  <div class="w-full">
    <div
      v-if="loading"
      class="text-center py-4 text-blue-600 font-semibold animate-pulse"
    >
      Actualizando indicadores...
    </div>

    <div
      v-else
      class="flex flex-nowrap gap-4 justify-center items-stretch overflow-x-auto pb-4"
    >
      <div
        class="bg-white rounded-xl shadow px-6 py-5 flex flex-col items-center min-w-[225px] max-w-[300px]"
      >
        <span
          class="text-sm font-semibold text-gray-600 mb-1 tracking-wide text-center"
          >Total Estudiantes</span
        >
        <span
          class="text-2xl font-extrabold text-gray-900 leading-tight text-center"
        >
          {{ totalStudents.toLocaleString() }}
        </span>
      </div>

      <div
        class="bg-white rounded-xl shadow px-6 py-5 flex flex-col items-center min-w-[225px] max-w-[300px]"
      >
        <span
          class="text-sm font-semibold text-gray-600 mb-1 tracking-wide text-center"
          >Estudiantes Regulares</span
        >
        <span
          class="text-2xl font-extrabold text-green-500 leading-tight text-center"
        >
          {{ regularStudents.toLocaleString() }}
        </span>
      </div>

      <div
        class="bg-white rounded-xl shadow px-6 py-5 flex flex-col items-center min-w-[225px] max-w-[300px]"
      >
        <span
          class="text-sm font-semibold text-gray-600 mb-1 tracking-wide text-center"
          >Estudiantes Irregulares</span
        >
        <span
          class="text-2xl font-extrabold text-orange-400 leading-tight text-center"
        >
          {{ irregularStudents.toLocaleString() }}
        </span>
      </div>

      <div
        class="bg-white rounded-xl shadow px-6 py-5 flex flex-col items-center min-w-[225px] max-w-[300px]"
      >
        <span
          class="text-sm font-semibold text-gray-600 mb-1 tracking-wide text-center"
          >Bajas</span
        >
        <span
          class="text-2xl font-extrabold text-red-500 leading-tight text-center"
        >
          {{ inactiveStudents.toLocaleString() }}
        </span>
      </div>

      <div
        class="bg-white rounded-xl shadow px-6 py-5 flex flex-row items-center min-w-[200px] max-w-[220px] gap-4 justify-center"
      >
        <div class="flex flex-col flex-1 items-center">
          <span
            class="text-sm font-semibold text-gray-600 mb-1 tracking-wide text-center"
            >Hombres</span
          >
          <span
            class="text-2xl font-extrabold text-gray-900 leading-tight text-center"
          >
            {{ maleStudents.toLocaleString() }}
          </span>
        </div>
        <div class="h-8 w-px bg-gray-300 mx-2"></div>
        <div class="flex flex-col flex-1 items-center">
          <span
            class="text-sm font-semibold text-gray-600 mb-1 tracking-wide text-center"
            >Mujeres</span
          >
          <span
            class="text-2xl font-extrabold text-gray-900 leading-tight text-center"
          >
            {{ femaleStudents.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>