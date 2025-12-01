<template>
  <div class="w-full">
    <div class="flex flex-nowrap gap-4 justify-center items-stretch">
      <div
        class="bg-white rounded-xl shadow px-6 py-5 flex flex-col items-center min-w-[225px] max-w-[300px]"
      >
        <span
          class="text-sm font-semibold text-gray-600 mb-1 tracking-wide text-center"
          >Total Estudiantes</span
        >
        <span
          class="text-2xl font-extrabold text-gray-900 leading-tight text-center"
          >{{ totalEstudiantes?.toLocaleString() ?? "0" }}</span
        >
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
          >11,634</span
        >
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
          >400</span
        >
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
          >50</span
        >
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
            >6,154</span
          >
        </div>
        <div class="h-8 w-px bg-gray-300 mx-2"></div>
        <div class="flex flex-col flex-1 items-center">
          <span
            class="text-sm font-semibold text-gray-600 mb-1 tracking-wide text-center"
            >Mujeres</span
          >
          <span
            class="text-2xl font-extrabold text-gray-900 leading-tight text-center"
            >6,004</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/store/user.store";
import { onMounted, computed } from "vue";

const userStore = useUsersStore();

// Cargar el conteo cuando el componente se monte
onMounted(() => {
  userStore.fetchUsersCount();
});

// Computed para leer el valor directo del store
const totalEstudiantes = computed(() => userStore.totalUsers);
</script>
