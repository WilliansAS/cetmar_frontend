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
            v-if="!selectedCareer && especialidadData.labels.length > 0"
            :data="especialidadData"
            :options="especialidadOptions"
          />

          <!-- Mensaje de carga -->
          <p v-else-if="!selectedCareer" class="text-center text-gray-500 mt-10">Cargando carreras...</p>

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
          <LineChart :data="bajasData" :options="chartOptions" v-if="bajasData.labels.length > 0" />
          <p v-else class="text-center text-gray-500 mt-10">Cargando tendencia...</p>
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
import { ref, onMounted } from 'vue'
import BarChart from './charts/BarChart.vue'
import DoughnutChart from './charts/DoughnutChart.vue'
import LineChart from './charts/LineChart.vue'


// Importamos nuestra nueva función limpia de la API
import { getAveragesDistribution, getStudentsByCareer, getLeaveTrend } from '@/api/director.api' // <-- Ajusta la ruta

const selectedCareer = ref<string | null>(null)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
  },
}

/* 1. Datos principales de especialidad (REACTIVO) */
const especialidadData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Estudiantes',
      data: [] as number[],
      // Te puse varios colores por si tienen muchas carreras en el CETMAR 41
      backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#818cf8', '#f472b6'],
    },
  ],
})

/* Configuración especial para el gráfico principal (detectar clics) */
const especialidadOptions = {
  ...chartOptions,
  onClick: (_evt: any, elements: any) => {
    if (elements.length > 0) {
      const index = elements[0].index
      // Ojo aquí: le agregamos el .value
      const carrera = especialidadData.value.labels[index]
      selectedCareer.value = carrera!
    }
  },
}

const fetchCareersDistribution = async () => {
  try {
    const data = await getStudentsByCareer()
    
    // Tu backend devuelve: { students_by_career: [{major: "Acuacultura", count: 120}, ...] }
    const etiquetas = data.students_by_career.map(item => item.major)
    const valores = data.students_by_career.map(item => item.count)

    especialidadData.value = {
      labels: etiquetas,
      datasets: [
        {
          label: 'Estudiantes',
          data: valores,
          backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#818cf8', '#f472b6'],
        },
      ],
    }
  } catch (error) {
    console.error("Falló la carga de la gráfica de especialidades:", error)
  }
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
const promediosData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Promedio de Estudiantes',
      backgroundColor: ['#60a5fa'],
      data: [] as number[],
    },
  ],
})

// 2. La función para traer los datos usando la arquitectura del proyecto
const fetchAveragesDistribution = async () => {
  try {
   
    const data = await getAveragesDistribution()
    
   
    const etiquetas = data.distribucion.map(item => item.rango)
    const valores = data.distribucion.map(item => item.cantidad)

    promediosData.value = {
      labels: etiquetas,
      datasets: [
        {
          label: 'Promedio de Estudiantes',
          backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'],
          data: valores,
        },
      ],
    }
  } catch (error) {
    // El error ya fue manejado por el interceptor genérico (mostrando 401, 404, etc.)
    // Aquí solo lo atrapamos por si queremos mostrar una alerta visual en la pantalla
    console.error("Falló la carga de la gráfica de promedios")
  }
}

/* 4. Tendencia de bajas (REACTIVO) */
const bajasData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Bajas por mes',
      borderColor: '#f87171', // Rojo para las bajas
      backgroundColor: '#f87171',
      fill: false,
      data: [] as number[],
    },
  ],
})

const fetchLeaveTrend = async () => {
  try {
    const data = await getLeaveTrend()
    
    // El backend manda: [{periodo: "2025-01", cantidad: 5}, {periodo: "2025-02", cantidad: 3}]
    const etiquetas = data.tendencia.map(item => item.periodo)
    const valores = data.tendencia.map(item => item.cantidad)

    bajasData.value = {
      labels: etiquetas,
      datasets: [
        {
          label: 'Bajas registradas',
          borderColor: '#f87171',
          backgroundColor: '#f87171',
          fill: false,
          data: valores,
        },
      ],
    }
  } catch (error) {
    console.error("Falló la carga de la gráfica de bajas")
  }
}

onMounted(() => {
  fetchCareersDistribution()
  fetchAveragesDistribution()
  fetchLeaveTrend()
})

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
