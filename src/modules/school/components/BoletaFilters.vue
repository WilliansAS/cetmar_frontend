<template>
  <div class="flex flex-row flex-wrap gap-4">
    <!-- Selectores de Filtro -->
    <BaseSelect
      id="filtro-semestre"
      v-model="filters.semestre"
      :options="semestreOptions"
      placeholder="Semestre"
    />
    <BaseSelect
      id="filtro-grupo"
      v-model="filters.grupo"
      :options="grupoOptions"
      placeholder="Grupo"
    />
    <BaseSelect
      id="filtro-estado"
      v-model="filters.estado"
      :options="estadoOptions"
      placeholder="Estado"
    />
    <BaseSelect
      id="filtro-turno"
      v-model="filters.turno"
      :options="turnoOptions"
      placeholder="Turno"
    />

    <!-- Input de Búsqueda -->
    <BaseSearchInput
      v-model="filters.search"
      placeholder="Buscar por nombre o matrícula..."
      class="flex-1 min-w-[240px]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import BaseSelect from "@/components/elements/BaseSelect.vue";
import BaseSearchInput from "@/components/elements/BaseSearchInput.vue";

// Estado de Filtros
const filters = reactive({
  semestre: "",
  grupo: "",
  estado: "",
  turno: "",
  search: "",
});

// Opciones Simuladas
const semestreOptions = ref([
  { value: "1", label: "1º Semestre" },
  { value: "2", label: "2º Semestre" },
  { value: "3", label: "3º Semestre" },
  { value: "4", label: "4º Semestre" },
  { value: "5", label: "5º Semestre" },
  { value: "6", label: "6º Semestre" },
]);

const grupoOptions = ref([
  { value: "A", label: "Grupo A" },
  { value: "B", label: "Grupo B" },
  { value: "C", label: "Grupo C" },
  { value: "D", label: "Grupo D" },
]);

const estadoOptions = ref([
  { value: "aprobado", label: "Aprobado" },
  { value: "reprobado", label: "Reprobado" },
]);

const turnoOptions = ref([
  { value: "matutino", label: "Matutino" },
  { value: "vespertino", label: "Vespertino" },
]);
</script>
