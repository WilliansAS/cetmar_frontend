<template>
  <SchoolLayout>
    <h1 class="text-4xl font-bold">Estudiantes</h1>
    <p class="text-sm font-semibold text-gray-500 mb-6">
      Gestión de estudiantes
    </p>

    <StudentStats />

    <div class="bg-white rounded-lg shadow-md p-6 mt-6">
      <div class="text-2xl font-semibold mb-4">Todos los estudiantes</div>
      <!-- Filtros -->
      <div class="flex flex-nowrap gap-3 items-center mb-4 w-full">
        <BaseSelect id="semestre" :options="semestres" v-model="filtros.semestre" selectClass="min-w-[120px] max-w-[150px] h-12 text-base" />
        <BaseSelect id="grupo" :options="grupos" v-model="filtros.grupo" selectClass="min-w-[120px] max-w-[150px] h-12 text-base" />
        <BaseSelect id="estado" :options="estados" v-model="filtros.estado" selectClass="min-w-[120px] max-w-[150px] h-12 text-base" />
        <BaseSelect id="turno" :options="turnos" v-model="filtros.turno" selectClass="min-w-[120px] max-w-[150px] h-12 text-base" />
        <div class="flex-1 min-w-[240px]">
          <BaseSearchInput v-model="filtros.busqueda" placeholder="Buscar por nombre del estudiante o por matrícula" class="w-full h-12 text-base" />
        </div>
      </div>

      <!-- Botones -->
      <div class="flex gap-3 mb-4">
        <BaseButton text="Formato" customClass="bg-green-500 hover:bg-green-600" icon="/images/ico-download.svg" />
        <BaseButton text="Nuevo estudiante" customClass="bg-blue-400 hover:bg-blue-500" :icon="PlusIcon" />
        <BaseButton text="Registrar estudiantes" customClass="bg-blue-700 hover:bg-blue-800" :icon="PlusIcon" />
      </div>

      <!-- Tabla -->
      <BaseTable
        :columns="columns"
        :data="filteredData"
        :showActions="true"
        :onEdit="onEdit"
        :onDelete="onDelete"
      />

      <!-- Paginación -->
      <div class="flex justify-between items-center mt-6">
        <div></div>
        <div class="flex items-center gap-2">
          <BaseButton text="Anterior" customClass="bg-white border border-gray-300 text-gray-700" />
          <span class="rounded-full bg-blue-700 text-white px-4 py-1 font-bold">1</span>
          <span>...</span>
          <BaseButton text="Siguiente" customClass="bg-white border border-gray-300 text-gray-700" />
        </div>
        <div></div>
      </div>
    </div>
  </SchoolLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SchoolLayout from '../components/SchoolLayout.vue';
import StudentStats from '../components/StudentStats.vue';
import BaseTable from '@/components/elements/BaseTable.vue';
import BaseButton from '@/components/elements/BaseButton.vue';
import BaseSelect from '@/components/elements/BaseSelect.vue';
import BaseSearchInput from '@/components/elements/BaseSearchInput.vue';
import PlusIcon from '@/assets/icons/Plus.svg';

const semestres = [
  { label: '5° Semestre', value: '5' },
  { label: '6° Semestre', value: '6' },
];
const grupos = [
  { label: 'Grupo A', value: 'A' },
  { label: 'Grupo B', value: 'B' },
];
const estados = [
  { label: 'Regular', value: 'Regular' },
  { label: 'Irregular', value: 'Irregular' },
];
const turnos = [
  { label: 'Matutino', value: 'Matutino' },
  { label: 'Vespertino', value: 'Vespertino' },
];

const filtros = ref({
  semestre: '',
  grupo: '',
  estado: '',
  turno: '',
  busqueda: '',
});

const columns = [
  { label: 'Nombre(s)', field: 'nombre' },
  { label: 'Apellidos', field: 'apellidos' },
  { label: 'Matrícula', field: 'matricula' },
  { label: 'Especialidad', field: 'especialidad' },
  { label: 'Estado', field: 'estado', cellClass: (row: any) => row.estado === 'Regular' ? 'text-green-500 font-semibold' : row.estado === 'Irregular' ? 'text-orange-400 font-semibold' : 'text-red-500 font-semibold' },
];

const data = [
  { nombre: 'Anthony Willians', apellidos: 'Alvarado Salazar', matricula: '2025001', especialidad: 'Laboratorio Ambiental', estado: 'Regular' },
  { nombre: 'Gerardo Antonio', apellidos: 'Díaz Rosales', matricula: '2025002', especialidad: 'Vida Saludable', estado: 'Regular' },
  { nombre: 'Angel Martín', apellidos: 'Euan Yupit', matricula: '2025003', especialidad: 'Servicios de Hospedaje', estado: 'Irregular' },
];

const filteredData = computed(() => {
  // Aquí puedes agregar lógica de filtrado real
  return data;
});

function onEdit(row: any) {
  // Acción editar
}
function onDelete(row: any) {
  // Acción eliminar
}
</script>

<style scoped>
.bg-f7f9fb {
    background-color: #F7F9FB;
}
</style>
