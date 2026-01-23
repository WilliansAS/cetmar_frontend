<template>
  <AdminLayout>
    <div class="py-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold">Usuarios</h1>
          <p class="text-sm text-gray-500">Gestión de usuarios</p>
        </div>

        <div class="flex items-center gap-3">
          <BaseSelect id="filterRole" :options="roleOptions" placeholder="Rol" v-model="selectedRole" />
          <button @click="showCreateExtra = true" class="px-4 py-2 bg-[#1226AB] text-white rounded-md">+ Agregar usuario</button>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6">
        <BaseTable :columns="columns" :data="filteredUsers" :showActions="true" :pagination="true" :pageSize="5" :onEdit="onEdit" :onDelete="onDelete" />
      </div>

      <!-- Modal para edición (reutiliza el modal simple) -->
      <BaseModal title="Editar Usuario" :show="showEdit" @close="showEdit = false" @confirm="onConfirmEdit">
        <div class="space-y-4">
          <BaseInput id="fullname_edit" label="Nombre completo" v-model="editForm.name" />
          <BaseInput id="email_edit" label="Correo electrónico" v-model="editForm.email" />
          <BaseSelect id="role_edit" label="Rol" :options="roleOptions" v-model="editForm.role" />
        </div>
      </BaseModal>

      <!-- Modal extenso para crear usuario (según el diseño) -->
      <UserCreateModal :show="showCreateExtra" @close="showCreateExtra = false" @confirm="onConfirmCreateExtra" />
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/AdminLayout.vue'
import BaseTable from '@/components/elements/BaseTable.vue'
import BaseModal from '@/components/elements/BaseModal.vue'
import BaseInput from '@/components/elements/BaseInput.vue'
import BaseSelect from '@/components/elements/BaseSelect.vue'
import UserCreateModal from '../components/UserCreateModal.vue'
import { ref, computed } from 'vue'

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Nombre', field: 'name' },
  { label: 'Correo electrónico', field: 'email' },
  { label: 'Rol', field: 'role' },
]

const users = ref([
  { id: 2001, name: 'Alvarado Salazar Anthony', email: 'Alvarado.S@cetmar.edu.mx', role: 'Administración' },
  { id: 2002, name: 'Chan Gutierrez Josue', email: 'Jos.Chan@cetmar.edu.mx', role: 'Vinculación' },
  { id: 1, name: 'Garcia Median Guillermo', email: 'Medina.Guill@cetmar.edu.mx', role: 'Profesor' },
])

const roleOptions = [
  { value: 'administrador', label: 'Administrador' },
  { value: 'estudiante', label: 'Estudiante' },
  { value: 'profesor', label: 'Profesor' },
]

const selectedRole = ref('')
const showCreateExtra = ref(false)
const showEdit = ref(false)

const editForm = ref<{ id: number; name: string; email: string; role: string }>({ id: 0, name: '', email: '', role: '' })

const onEdit = (row: any) => {
  editForm.value = { ...row }
  showEdit.value = true
}

const onDelete = (row: any) => {
  users.value = users.value.filter(u => u.id !== row.id)
}

const onConfirmEdit = () => {
  const idx = users.value.findIndex(u => u.id === editForm.value.id)
  if (idx !== -1) users.value.splice(idx, 1, { ...editForm.value })
  showEdit.value = false
}

const onConfirmCreateExtra = (payload: any) => {
  const id = Math.floor(Math.random() * 9000) + 1000
  users.value.push({ id, name: payload.fullName || payload.nombres || 'Nuevo Usuario', email: payload.email, role: payload.role })
  showCreateExtra.value = false
}

const filteredUsers = computed(() => {
  if (!selectedRole.value) return users.value
  // comparar insensiblemente
  return users.value.filter(u => (u.role || '').toString().toLowerCase().includes(selectedRole.value.toString().toLowerCase()))
})
</script>

<style scoped></style>
