<template>
  <AdminLayout>
    <div class="space-y-8 py-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold">Bienvenido de nuevo, Administrador</h1>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <StatsCard title="Usuarios Registrados" value="40,689" iconSrc="/images/UsuariosRegistradosIcon.svg" iconBgClass="bg-blue-50" />
        <StatsCard title="Boletas Subidas" value="10,293" iconSrc="/images/BoletasSubidasIcon.svg" iconBgClass="bg-yellow-50" />
        <StatsCard title="Eventos Activos" value="89,000" iconSrc="/images/EventosActivosIcon.svg" iconBgClass="bg-green-50" />
      </div>

      <div class="bg-white rounded-lg p-6">
        <h2 class="font-semibold mb-4">Nuevos Usuarios</h2>
        <div class="h-60 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400">
          Gráfico (placeholder)
        </div>
      </div>

      <div class="bg-white rounded-lg p-6">
        <h2 class="font-semibold mb-4">Últimos usuarios registrados</h2>
        <BaseTable :columns="columns" :data="users" :pagination="true" :pageSize="5" />
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/AdminLayout.vue'
import StatsCard from '@/components/elements/StatsCard.vue'
import BaseTable from '@/components/elements/BaseTable.vue'

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Nombre', field: 'name' },
  { label: 'Correo Electrónico', field: 'email' },
  { label: 'Fecha de Registro', field: 'registered' },
]

const users = [
  { id: 1, name: 'Josue Antonio Chan Gutierrez', email: 'josue@cetmar.edu.mx', registered: '12.09.2019' },
  { id: 2, name: 'Ana Perez', email: 'ana@cetmar.edu.mx', registered: '01.12.2020' },
  { id: 3, name: 'Pedro Gomez', email: 'pedro@cetmar.edu.mx', registered: '05.03.2021' },
]
</script>

<style scoped></style>
