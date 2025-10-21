<template>
  <StudentLayout>
    <h1 class="text-2xl font-bold mb-4">Subir Boleta</h1>

    <!-- Subir archivo -->
    <div class="mb-4">
      <input type="file" @change="onFileChange" accept=".pdf,.xlsx,.csv" />
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded ml-2"
        @click="uploadBoleta"
      >
        {{ loading ? "Procesando..." : "Subir" }}
      </button>
    </div>

    <!-- Error -->
    <div v-if="error" class="text-red-600 font-semibold mb-3">
      {{ error }}
    </div>

    <!-- Tabla de resultados -->
    <div v-if="boletaData" class="overflow-x-auto">
      <h2 class="text-xl font-semibold mb-2">
        Datos del alumno: {{ boletaData.alumno }}
      </h2>

      <BaseTable
        :columns="columns"
        :data="boletaData.uac"
        :pagination="true"
        class="mt-4"
      />
    </div>
  </StudentLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useBoletaStore } from "../school.store";
import BaseTable from "../../../components/elements/BaseTable.vue";
import StudentLayout from "../components/SchoolLayout.vue";

const boletaStore = useBoletaStore();
const file = ref<File | null>(null);

const columns = [
  { label: "Plantel", field: "plantel" },
  { label: "Tipo UAC", field: "tipo_uac" },
  { label: "Clave UAC", field: "clave_uac" },
  { label: "Semestre", field: "semestre" },
  { label: "Nombre", field: "nombre" },
  { label: "Calificación", field: "calif" },
  { label: "Horas", field: "horas_sem" },
  { label: "Créditos", field: "creditos" },
  { label: "Periodo", field: "periodo" },
];

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]!;
  }
};

const uploadBoleta = async () => {
  if (!file.value) return alert("Por favor selecciona un archivo");
  await boletaStore.subirBoleta(file.value);
};

// Datos del store
const { boletaData, loading, error } = storeToRefs(boletaStore);
</script>
