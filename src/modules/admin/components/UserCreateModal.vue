<template>
  <BaseModal :show="show" title="Gestión de Usuarios" @close="handleClose" @confirm="handleConfirm">
    <div class="space-y-4">
      <BaseInput id="fullname" label="Ingresa nombre completo de usuario:" v-model="form.fullName" />
      <BaseInput id="email" label="Ingresa correo electronico de usuario:" v-model="form.email" />

      <div>
        <label class="text-sm font-semibold text-gray-700 mb-2 block">Selecciona rol de usuario</label>
        <BaseSelect id="role" :options="roleOptions" v-model="form.role" />
      </div>

      <h3 class="text-center font-semibold">Registrar Estudiante</h3>

      <BaseInput id="nombres" label="Nombre(s)" v-model="form.nombres" />

      <div class="grid grid-cols-2 gap-4">
        <BaseInput id="apPat" label="Apellido paterno" v-model="form.apellidoP" />
        <BaseInput id="apMat" label="Apellido materno" v-model="form.apellidoM" />
      </div>

      <div>
        <div class="mb-6">
          <label class="text-sm font-semibold text-gray-700 mb-2 block">Especialidad</label>
          <BaseSelect id="especialidad" :options="especialidades" v-model="form.especialidad" />
        </div>

        <div>
          <label class="text-sm font-semibold text-gray-700 mb-2 block">Turno</label>
          <BaseSelect id="turno" :options="turnos" v-model="form.turno" />
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/elements/BaseModal.vue'
import BaseInput from '@/components/elements/BaseInput.vue'
import BaseSelect from '@/components/elements/BaseSelect.vue'
import { reactive, watch } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', payload: any): void
}>()

const roleOptions = [
  { value: 'estudiante', label: 'Estudiante' },
  { value: 'administrador', label: 'Administrador' },
  { value: 'profesor', label: 'Profesor' },
]

const especialidades = [
  { value: '', label: '-- Seleccionar especialidad --' },
  { value: 'sistemas', label: 'Sistemas' },
  { value: 'contabilidad', label: 'Contabilidad' },
]

const turnos = [
  { value: '', label: '-- Seleccionar turno --' },
  { value: 'matutino', label: 'Matutino' },
  { value: 'vespertino', label: 'Vespertino' },
]

const form = reactive({
  fullName: '',
  email: '',
  role: 'estudiante',
  nombres: '',
  apellidoP: '',
  apellidoM: '',
  especialidad: '',
  turno: '',
})

watch(() => props.show, (v) => {
  if (!v) {
    // reset form when modal closed
    form.fullName = ''
    form.email = ''
    form.role = 'estudiante'
    form.nombres = ''
    form.apellidoP = ''
    form.apellidoM = ''
    form.especialidad = ''
    form.turno = ''
  }
})

const handleClose = () => emit('close')
const handleConfirm = () => emit('confirm', { ...form })
</script>

<style scoped></style>
