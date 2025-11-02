<template>
  <section class="bg-white p-7 rounded-2xl shadow-xl space-y-8">
    <h2 class="text-2xl font-bold text-left bg-blue-700 text-white py-3 px-5 rounded-lg shadow-md">
      Gráficas de datos escolares
    </h2>

    <!-- Contenedor de todas las cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- 1. Distribución por Especialidad + Género -->
      <div class="chart-card">
        <h3 class="chart-title">
          {{ selectedCareer ? `Distribución por género en ${selectedCareer}` : 'Distribución de Estudiantes por Especialidad' }}
        </h3>

        <div class="chart-container">
          <!-- Grafica principal -->
          <DoughnutChart
            v-if="!selectedCareer"
            :data="especialidadData"
            :options="especialidadOptions"
          />

          <!-- Grafica detalle -->
          <DoughnutChart
            v-else
            :data="generoPorCarrera[selectedCareer]"
            :options="chartOptions"
          />
        </div>

        <button
          v-if="selectedCareer"
          @click="selectedCareer = null"
          class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Volver
        </button>
      </div>

      <!-- 2. Estado académico -->
      <div class="chart-card">
        <h3 class="chart-title">Estado académico por semestre</h3>
        <div class="chart-container">
          <BarChart :data="estadoAcademicoData" :options="chartOptions" />
        </div>
      </div>

      <!-- 3. Distribución de Promedios -->
      <div class="chart-card">
        <h3 class="chart-title">Distribución de Promedios</h3>
        <div class="chart-container">
          <BarChart :data="promediosData" :options="chartOptions" />
        </div>
      </div>

      <!-- 4. Tendencia de Bajas -->
      <div class="chart-card">
        <h3 class="chart-title">Tendencia de Bajas</h3>
        <div class="chart-container">
          <LineChart :data="bajasData" :options="chartOptions" />
        </div>
      </div>

      <!-- 5. Rendimiento por Especialidad -->
      <div class="chart-card">
        <h3 class="chart-title">Rendimiento por Especialidad</h3>
        <div class="chart-container">
          <BarChart :data="rendimientoData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BarChart from './charts/BarChart.vue'
import DoughnutChart from './charts/DoughnutChart.vue'
import LineChart from './charts/LineChart.vue'

const selectedCareer = ref<string | null>(null)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
  },
}

/* Configuración especial para el gráfico principal (detectar clics) */
const especialidadOptions = {
  ...chartOptions,
  onClick: (_evt: any, elements: any) => {
    if (elements.length > 0) {
      const index = elements[0].index
      const carrera = especialidadData.labels[index]
      selectedCareer.value = carrera!
    }
  },
}

/* 1. Datos principales de especialidad */
const especialidadData = {
  labels: ['Vida Saludable', 'Servicios de Hospedaje', 'Lab. Ambiental', 'Sistemas de Información'],
  datasets: [
    {
      label: 'Estudiantes',
      data: [800, 600, 900, 700],
      backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171'],
    },
  ],
}

/* Subdatos por género para cada carrera */
const generoPorCarrera: Record<string, any> = {
  'Vida Saludable': {
    labels: ['Femenino', 'Masculino'],
    datasets: [
      {
        label: 'Género',
        data: [400, 400],
        backgroundColor: ['#f9a8d4', '#60a5fa'],
      },
    ],
  },
  'Servicios de Hospedaje': {
    labels: ['Femenino', 'Masculino'],
    datasets: [
      {
        label: 'Género',
        data: [400, 200],
        backgroundColor: ['#f9a8d4', '#60a5fa'],
      },
    ],
  },
  'Lab. Ambiental': {
    labels: ['Femenino', 'Masculino'],
    datasets: [
      {
        label: 'Género',
        data: [450, 450],
        backgroundColor: ['#f9a8d4', '#60a5fa'],
      },
    ],
  },
  'Sistemas de Información': {
    labels: ['Femenino', 'Masculino'],
    datasets: [
      {
        label: 'Género',
        data: [250, 450],
        backgroundColor: ['#f9a8d4', '#60a5fa'],
      },
    ],
  },
}

/* 2. Estado académico */
const estadoAcademicoData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    { label: 'Regulares', backgroundColor: '#3b82f6', data: [50, 60, 55, 70, 65, 60] },
    { label: 'Irregulares', backgroundColor: '#f87171', data: [10, 15, 12, 20, 18, 14] },
  ],
}

/* 3. Distribución de promedios */
const promediosData = {
  labels: ['Excelencia', 'Satisfactorio', 'Suficiente', 'Reprobado'],
  datasets: [
    { label: 'Promedio de Estudiantes', backgroundColor: ['#60a5fa'], data: [1000, 1300, 500, 200] },
  ],
}

/* 4. Tendencia de bajas */
const bajasData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sem. 2025-A',
      borderColor: '#34d399',
      backgroundColor: '#34d399',
      fill: false,
      data: [10, 15, 12, 14, 18, 10],
    },
    {
      label: 'Sem. 2025-B',
      borderColor: '#f87171',
      backgroundColor: '#f87171',
      fill: false,
      data: [12, 10, 14, 16, 19, 11],
    },
  ],
}

/* 5. Rendimiento por especialidad */
const rendimientoData = {
  labels: ['Vida Saludable', 'Hospedaje', 'Ambiental', 'Sistemas'],
  datasets: [{ label: 'Promedio General', backgroundColor: '#818cf8', data: [9.1, 8.7, 8.9, 9.3] }],
}
</script>

<style scoped>
@reference "tailwindcss";

.chart-card {
  @apply bg-white p-4 rounded-xl shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl flex flex-col justify-between;
}

.chart-title {
  @apply font-semibold text-center mb-3 text-gray-700;
}

.chart-container {
  @apply relative w-full;
  height: 280px;
  overflow: hidden;
}

.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
}

button {
  @apply transition-transform;
}
button:hover {
  transform: translateY(-2px);
}
</style>
