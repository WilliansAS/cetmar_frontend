<template>
  <SchoolLayout>
    <div class="flex justify-center pb-10">
      <h1 class="font-bold text-4xl">¡Bienvenido de Nuevo, WilliansAS!</h1>
    </div>

    <StatsSchool />

    <div class="grid grid-cols-1 gap-8 mt-8">
      <!-- Gráfica: Estudiantes por especialidad -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Estudiantes (Por especialidad)</h2>
        <StudentsChartBar
          :labels="especialidadLabels"
          :datasets="especialidadDatasets"
          :options="{
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { labels: { font: { size: 14 } } } }
          }"
        />
      </div>
      <!-- Gráfica: Estudiantes Hombres/Mujeres -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Estudiantes (Hombres/Mujeres)</h2>
        <StudentsChartBar
          :labels="especialidadLabels"
          :datasets="generoDatasets"
          :options="{
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { labels: { font: { size: 14 } } } }
          }"
        />
      </div>
    </div>
  </SchoolLayout>
</template>

<script setup lang="ts">
import SchoolLayout from "../components/SchoolLayout.vue";
import StatsSchool from "../components/StatsSchool.vue";
import StudentsChartBar from "../components/StudentsChartBar.vue";
import { dashboardSchoolMock } from '../dashboardSchool.mock';

const especialidadLabels = dashboardSchoolMock.especialidades.map(e => e.nombre);
const especialidadDatasets = [
  {
    label: 'Regulares',
    backgroundColor: '#4ade80',
    data: dashboardSchoolMock.especialidades.map(e => e.regulares),
    borderRadius: 6,
  },
  {
    label: 'Irregulares',
    backgroundColor: 'red',
    data: dashboardSchoolMock.especialidades.map(e => e.irregulares),
    borderRadius: 6,
  },
];
const generoDatasets = [
  {
    label: 'Hombres',
    backgroundColor: '#60a5fa',
    data: dashboardSchoolMock.especialidades.map(e => e.hombres),
    borderRadius: 6,
  },
  {
    label: 'Mujeres',
    backgroundColor: '#f472b6',
    data: dashboardSchoolMock.especialidades.map(e => e.mujeres),
    borderRadius: 6,
  },
];
</script>
