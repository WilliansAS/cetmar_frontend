<template>
  <SchoolLayout>
    <h1 class="text-4xl font-bold">Boletas</h1>
    <p class="text-sm font-semibold text-gray-500 mb-6">
      Gestión de boletas de estudiantes
    </p>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-2xl font-semibold">Boletas</h2>

        <BaseButton
          text="Subir boleta"
          :icon="PlusIcon"
          customClass="!text-sm py-2 !px-4"
          @click="uploadBoleta"
        />
        <input
          type="file"
          @change="onFileChange"
          accept=".pdf,.xlsx,.csv"
          class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <hr class="border-gray-200" />

      <div class="py-4">
        <p class="text-sm font-medium text-gray-700 mb-3">Filtros:</p>
        <BoletaFilters />
      </div>

      <!-- Tabla de resultados -->
      <div v-if="boletaData" class="overflow-x-auto">
        <BaseTable
          :columns="columns"
          :data="formattedBoletaData"
          :pagination="true"
          class="mt-4"
        />
      </div>
    </div>
  </SchoolLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useBoletaStore } from "../school.store";
import BaseTable from "@/components/elements/BaseTable.vue";
import SchoolLayout from "../components/SchoolLayout.vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import PlusIcon from "@/assets/icons/Plus.svg";
import BoletaFilters from "../components/BoletaFilters.vue";

const boletaStore = useBoletaStore();
const file = ref<File | null>(null);

const columns = [
  { label: "Alumno", field: "alumno" },
  { label: "CURP", field: "curp" },
  { label: "No. Control", field: "numero_control" },
  { label: "Fecha Subida", field: "created_at" },
  { label: "Semestre", field: "semestre" },
];

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]!;
    if (error.value) {
      error.value = null; // Limpiar error si se selecciona nuevo archivo
    }
  }
};

const formattedBoletaData = computed(() => {
  if (!boletaData.value) return [];

  return boletaData.value.map((boleta) => ({
    alumno: boleta.alumno,
    numero_control: boleta.numero_control,
    created_at: new Date(boleta.created_at).toLocaleDateString("es-MX"),
    semestre: boleta.items[0]?.semestre ?? "—",
  }));
});

const uploadBoleta = async () => {
  if (!file.value) return alert("Por favor selecciona un archivo");
  await boletaStore.subirBoleta(file.value);
};

// Datos del store
const { boletaData, loading, error } = storeToRefs(boletaStore);
</script>
