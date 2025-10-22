<template>
  <Sidebar :navItems="navItems">
    <template #default>
      <main>
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-1">¡Bienvenido de Nuevo, José UG!</h1>
        </div>

        <div class="flex gap-6 justify-between items-stretch mb-8">
          <!-- Promedio Actual -->
          <div class="flex-1 bg-white rounded-xl shadow-sm p-7 flex flex-col min-w-[280px]">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-gray-600 text-base font-normal">Promedio Actual</h3>
              <img src="/images/podium.svg" alt="Podium" class="w-7 h-7" />
            </div>
            <div class="flex flex-col justify-center items-center flex-1 py-2">
              <span class="text-3xl font-bold text-gray-900 mb-1">9.2</span>
              <span class="text-gray-500 text-base">Durante el&nbsp; 5º Semestre</span>
            </div>
          </div>

          <!-- Estado del alumno -->
          <div class="flex-1 bg-white rounded-xl shadow-sm p-7 flex flex-col min-w-[280px]">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-gray-600 text-base font-normal">Estado del alumno</h3>
              <img src="/images/podium.svg" alt="Podium" class="w-7 h-7" />
            </div>
            <div class="flex flex-col justify-center items-center flex-1 py-2">
              <span class="text-2xl font-bold text-gray-900 mb-1">Regular</span>
              <span class="text-gray-500 text-base">Durante el&nbsp; 5º Semestre</span>
            </div>
          </div>

          <!-- Anuncios Recientes -->
          <div class="flex-1 bg-white rounded-xl shadow-sm p-7 flex flex-col justify-between min-w-[280px]">
            <div class="flex justify-between items-start mb-6">
              <h3 class="text-gray-600 text-lg font-normal">Anuncios Recientes</h3>
              <img src="/images/megaphone.svg" alt="Megaphone" class="w-8 h-8" />
            </div>
            <div class="space-y-5">
              <div class="flex items-center gap-3">
                <img src="/images/classroom.svg" alt="Clase" class="w-6 h-6 text-blue-700" />
                <div>
                  <span class="font-semibold text-blue-900">Suspensión de clases</span><br>
                  <span class="text-gray-500 text-sm">16 de septiembre</span>
                </div>
              </div>
              <div class="border-t border-gray-200"></div>
              <div class="flex items-center gap-3">
                <img src="/images/group.svg" alt="Becas" class="w-6 h-6 text-blue-700" />
                <div>
                  <span class="font-semibold text-blue-900">Convocatoria de becas</span><br>
                  <span class="text-gray-500 text-sm">24 de septiembre</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="mb-8">
          <h2 class="text-2xl font-bold mb-6">Evaluaciones recientes y Consulta de Boletas</h2>
          <BaseTable :columns="gradeColumns" :data="gradeData" />
          <div class="mt-8">
            <h2 class="text-2xl font-bold mb-6">Descarga de Boletas</h2>
            <div class="bg-blue-100 rounded-lg px-6 py-4 flex items-center mb-6">
              <div class="border-l-4 border-blue-400 h-full mr-3"></div>
              <span class="font-semibold">Información:</span>
              <span class="ml-2 text-gray-700">Se han encontrado los siguientes resultados recientes de las evaluaciones del estudiante correspondiente.</span>
            </div>
            <select class="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none mb-8">
              <option>-- Selecciona un periodo --</option>
            </select>
            <div class="flex justify-center">
              <button class="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                Descargar Boleta
              </button>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 class="text-lg font-semibold mb-4">Formatos Descargables</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-blue-700 hover:underline">Formato_Reinscripcion_2025.pdf</a></li>
            <li><a href="#" class="text-blue-700 hover:underline">Formato_Servicio_Social_2025.pdf</a></li>
          </ul>
        </section>
      </main>
    </template>
  </Sidebar>
</template>

<script>
import Sidebar from '@/components/layouts/Sidebar.vue';
import BaseTable from '@/components/elements/BaseTable.vue';

const gradeColumns = [
  { label: 'Materia', field: 'materia' },
  { label: '1º Parcial', field: 'parcial1' },
  { label: '2º Parcial', field: 'parcial2' },
  { label: '3º Parcial', field: 'parcial3' },
  { label: 'Promedio', field: 'promedio' },
  { label: 'Estado', field: 'estado', className: (row) => row.estado === 'Aprobado' ? 'text-green-500 font-medium' : 'text-red-500 font-medium' },
];

const gradeData = [
  { materia: 'Materia 1', parcial1: 9.2, parcial2: 9.2, parcial3: 9.2, promedio: 9.2, estado: 'Aprobado' },
  { materia: 'Materia 2', parcial1: 9.2, parcial2: 9.2, parcial3: 9.2, promedio: 9.2, estado: 'Aprobado' },
  { materia: 'Materia 3', parcial1: 9.2, parcial2: 9.2, parcial3: 9.2, promedio: 9.2, estado: 'Aprobado' },
  { materia: 'Materia 4', parcial1: 9.2, parcial2: 9.2, parcial3: 9.2, promedio: 9.2, estado: 'Aprobado' },
  { materia: 'Materia 5', parcial1: 9.2, parcial2: 9.2, parcial3: 9.2, promedio: 9.2, estado: 'Aprobado' },
];

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    BaseTable
  },
  data() {
    return {
      gradeColumns,
      gradeData
    };
  }
}
</script>

