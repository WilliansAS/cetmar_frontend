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
          @click="openUploadModal"
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

    <UploadBoletaModal
      :show="isUploadModalOpen"
      @close="isUploadModalOpen = false"
    />
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
import UploadBoletaModal from "../components/UploadBoletaModal.vue";

const boletaStore = useBoletaStore();
// Estado para controlar el modal
const isUploadModalOpen = ref(false);

const columns = [
  { label: "Alumno", field: "alumno" },
  { label: "CURP", field: "curp" },
  { label: "No. Control", field: "numero_control" },
  { label: "Fecha Subida", field: "created_at" },
  { label: "Semestre", field: "semestre" },
];

// Función para abrir el modal
const openUploadModal = () => {
  isUploadModalOpen.value = true;
};

const formattedBoletaData = computed(() => {
  if (!boletaData.value) return [];

  return boletaData.value.map((boleta: any) => ({
    alumno: boleta.alumno,
    numero_control: boleta.numero_control,
    created_at: new Date(boleta.created_at).toLocaleDateString("es-MX"),
    semestre: boleta.items[0]?.semestre ?? "—",
  }));
});

// Datos del store
const { boletaData } = storeToRefs(boletaStore);
</script>
