<template>
  <SchoolLayout>
    <h1 class="text-4xl font-bold">Estudiantes</h1>
    <p class="text-sm font-semibold text-gray-500 mb-6">
      Gestión de estudiantes
    </p>
    
    <StudentStats />
    
    <div class="bg-white rounded-lg shadow-md p-6 mt-6">
      <div class="flex justify-between items-center mb-4">
        <div class="text-2xl font-semibold">Todos los estudiantes</div>
        <div class="flex gap-3">
          <BaseButton 
            text="Formato" 
            customClass="bg-green-500 hover:bg-green-600" 
            icon="/images/ico-download.svg" 
          />
          <BaseButton 
            text="Nuevo estudiante" 
            customClass="bg-blue-400 hover:bg-blue-500" 
            :icon="PlusIcon" 
          />
          <BaseButton 
            text="Registrar estudiantes" 
            customClass="bg-blue-700 hover:bg-blue-800" 
            :icon="PlusIcon" 
          />
        </div>
      </div>

      <StudentFilters 
        v-model:filteredData="filteredData"
        :originalData="data"
        class="mb-4"
      />

      <BaseTable 
        :columns="columns" 
        :data="filteredData" 
        :showActions="true" 
        :pagination="true"
        :onEdit="onEdit" 
        :onDelete="onDelete" 
      />
    </div>
  </SchoolLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SchoolLayout from '../components/SchoolLayout.vue';
import StudentStats from '../components/StudentStats.vue';
import StudentFilters from '../components/StudentFilter.vue';
import BaseTable from '@/components/elements/BaseTable.vue';
import BaseButton from '@/components/elements/BaseButton.vue';
import PlusIcon from '@/assets/icons/Plus.svg';

const columns = [
  { label: 'Nombre(s)', field: 'nombre' },
  { label: 'Apellidos', field: 'apellidos' },
  { label: 'Matrícula', field: 'matricula' },
  { label: 'Especialidad', field: 'especialidad' },
  { 
    label: 'Estado', 
    field: 'estado', 
    cellClass: (row: any) => 
      row.estado === 'Regular' 
        ? 'text-green-500 font-semibold' 
        : row.estado === 'Irregular' 
        ? 'text-orange-400 font-semibold' 
        : 'text-red-500 font-semibold' 
  },
];

const data = ref([
  { 
    nombre: 'Anthony Willians', 
    apellidos: 'Alvarado Salazar', 
    matricula: '2025001', 
    especialidad: 'Laboratorio Ambiental', 
    estado: 'Regular' 
  },
  { 
    nombre: 'Gerardo Antonio', 
    apellidos: 'Díaz Rosales', 
    matricula: '2025002', 
    especialidad: 'Vida Saludable', 
    estado: 'Regular' 
  },
  { 
    nombre: 'Angel Martín', 
    apellidos: 'Euan Yupit', 
    matricula: '2025003', 
    especialidad: 'Servicios de Hospedaje', 
    estado: 'Irregular' 
  },
]);

const filteredData = ref([...data.value]);

function onEdit(row: any) {
  console.log('Editar:', row);
}

function onDelete(row: any) {
  console.log('Eliminar:', row);
}
</script>