<script setup lang="ts">
import { reactive } from "vue";
import BaseModal from "@/components/elements/BaseModal.vue";
import BaseInput from "@/components/elements/BaseInput.vue";
import BaseSelect from "@/components/elements/BaseSelect.vue";

interface Props {
  show: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm", data: any): void;
}>();

// Estado del formulario
const studentForm = reactive({
  firstName: "",
  lastNamePaternal: "",
  lastNameMaternal: "",
  email: "",
  phone: "",
  controlNumber: "",
  curp: "",
  group: "",
  specialty: "",
  turn: "",
});

// Opciones para los selectores
const specialtyOptions = [
  { label: "Ingeniería en Sistemas", value: "ISC" },
  { label: "Ingeniería Industrial", value: "II" },
  { label: "Licenciatura en Administración", value: "LA" },
];

const turnOptions = [
  { label: "Matutino", value: "matutino" },
  { label: "Vespertino", value: "vespertino" },
];

const handleConfirm = () => {
  emit("confirm", { ...studentForm });
};
</script>

<template>
  <BaseModal
    :show="show"
    title="Registro de Estudiante"
    mode="create"
    @close="emit('close')"
    @confirm="handleConfirm"
  >
    <div class="space-y-4 w-full max-w-sm">
      <BaseInput
        id="firstName"
        label="Nombres"
        v-model="studentForm.firstName"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseInput
          id="lastNamePaternal"
          label="Apellido Paterno"
          v-model="studentForm.lastNamePaternal"
        />
        <BaseInput
          id="lastNameMaternal"
          label="Apellido Materno"
          v-model="studentForm.lastNameMaternal"
        />
      </div>

      <BaseInput
        id="email"
        type="email"
        label="Correo Electrónico"
        v-model="studentForm.email"
      />
      <BaseInput
        id="phone"
        type="tel"
        label="Teléfono"
        v-model="studentForm.phone"
      />

      <BaseInput
        id="controlNumber"
        label="Número de Control"
        v-model="studentForm.controlNumber"
      />
      <BaseInput id="curp" label="CURP" v-model="studentForm.curp" />

      <div class="flex flex-col w-full">
        <label class="text-sm sm:text-base font-semibold text-gray-700 mb-2">
          Especialidad
        </label>
        <BaseSelect
          id="specialty"
          v-model="studentForm.specialty"
          :options="specialtyOptions"
          placeholder="Selecciona una especialidad"
          selectClass="w-full"
        />
      </div>

      <BaseInput
        id="group"
        label="Grupo"
        placeholder="Ej. 5-A"
        v-model="studentForm.group"
      />

      <div class="flex flex-col w-full">
        <label class="text-sm sm:text-base font-semibold text-gray-700 mb-2">
          Turno
        </label>
        <BaseSelect
          id="turn"
          v-model="studentForm.turn"
          :options="turnOptions"
          placeholder="Selecciona turno"
          selectClass="w-full"
        />
      </div>
    </div>
  </BaseModal>
</template>
