<template>
  <AdminLayout>
    <div class="py-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold">Roles & Permisos</h1>
          <p class="text-sm text-gray-500">Gestión de Roles y Permisos</p>
        </div>

        <div>
          <button @click="showCreate = true" class="px-4 py-2 bg-[#1226AB] text-white rounded-md">+ Agregar rol</button>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6">
        <BaseTable :columns="columns" :data="roles" :showActions="true" :pagination="true" :pageSize="5" :onEdit="onEdit" :onDelete="onDelete" />
      </div>

      <!-- Modal crear rol -->
      <BaseModal title="Agregar Rol" :show="showCreate" @close="showCreate = false" @confirm="onConfirmCreate">
        <div class="space-y-4">
          <BaseInput id="rolName" label="Ingresa el nombre del nuevo rol" v-model="form.name" />
          <BaseSelect id="perms" label="Asigna permisos al rol" :options="permOptions" v-model="form.permissions" />
        </div>
      </BaseModal>

      <!-- Modal editar rol (reutiliza BaseModal) -->
      <BaseModal title="Editar Rol" :show="showEdit" @close="showEdit = false" @confirm="onConfirmEdit">
        <div class="space-y-4">
          <BaseInput id="rolNameEdit" label="Nombre del rol" v-model="editForm.name" />
          <BaseSelect id="permsEdit" label="Permisos" :options="permOptions" v-model="editForm.permissions" />
        </div>
      </BaseModal>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/AdminLayout.vue'
import BaseTable from '@/components/elements/BaseTable.vue'
import BaseModal from '@/components/elements/BaseModal.vue'
import BaseInput from '@/components/elements/BaseInput.vue'
import BaseSelect from '@/components/elements/BaseSelect.vue'
import { ref } from 'vue'

const columns = [
  { label: 'Rol', field: 'name' },
]

const roles = ref([
  { id: 1, name: 'Administrador', permissions: '' },
  { id: 2, name: 'Estudiante', permissions: '' },
  { id: 3, name: 'Control escolar', permissions: '' },
])

const permOptions = [
  { value: 'read', label: 'Leer' },
  { value: 'write', label: 'Escribir' },
  { value: 'manage', label: 'Administrar' },
]

const showCreate = ref(false)
const showEdit = ref(false)
const form = ref({ name: '', permissions: '' })
const editForm = ref<{ id: number; name: string; permissions: string }>({ id: 0, name: '', permissions: '' })

const onEdit = (row: any) => {
  editForm.value = { ...row }
  showEdit.value = true
}

const onDelete = (row: any) => {
  roles.value = roles.value.filter(r => r.id !== row.id)
}

const onConfirmCreate = () => {
  const id = Math.floor(Math.random() * 9000) + 100
  roles.value.push({ id, name: form.value.name, permissions: form.value.permissions })
  form.value = { name: '', permissions: '' }
  showCreate.value = false
}

const onConfirmEdit = () => {
  const idx = roles.value.findIndex(r => r.id === editForm.value.id)
  if (idx !== -1) roles.value.splice(idx, 1, { ...editForm.value })
  showEdit.value = false
}
</script>

<style scoped></style>
