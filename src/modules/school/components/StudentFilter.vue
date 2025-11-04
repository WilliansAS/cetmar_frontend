<template>
  <div class="flex flex-nowrap gap-3 items-center w-full">
    <BaseSelect 
      id="semestre" 
      :options="semestres" 
      v-model="filtros.semestre" 
    />
    <BaseSelect 
      id="grupo" 
      :options="grupos" 
      v-model="filtros.grupo" 
    />
    <BaseSelect 
      id="estado" 
      :options="estados" 
      v-model="filtros.estado" 
    />
    <BaseSelect 
      id="turno" 
      :options="turnos" 
      v-model="filtros.turno" 
    />
    <div class="flex-1 min-w-[240px]">
      <BaseSearchInput 
        v-model="filtros.busqueda" 
        placeholder="Buscar por nombre del estudiante o por matrícula" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import BaseSelect from '@/components/elements/BaseSelect.vue';
import BaseSearchInput from '@/components/elements/BaseSearchInput.vue';

interface Props {
  originalData: any[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:filteredData': [data: any[]];
}>();

const filtros = ref({
  semestre: '',
  grupo: '',
  estado: '',
  turno: '',
  busqueda: '',
});

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

const filteredData = computed(() => {
  if (!props.originalData?.length) return [];

  return props.originalData.filter(estudiante => {
    // FILTRO POR BUSQUEDA
    if (filtros.value.busqueda) {
      const busqueda = filtros.value.busqueda.toLowerCase();
      const nombreCompleto = `${estudiante.nombre} ${estudiante.apellidos}`.toLowerCase();
      const matricula = estudiante.matricula.toLowerCase();
      
      if (!nombreCompleto.includes(busqueda) && !matricula.includes(busqueda)) {
        return false;
      }
    }

    // FILTRO POR ESTADO
    if (filtros.value.estado && estudiante.estado !== filtros.value.estado) {
      return false;
    }

    return true;
  });
});

// EMISIÓN DE DATOS FILTRADOS
watch(filteredData, (newData) => {
  emit('update:filteredData', newData);
}, { immediate: true });
</script>