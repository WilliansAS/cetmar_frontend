<script setup lang="ts">
import { ref } from "vue";
import { useBoletaStore } from "../school.store";
import Upload from "@/assets/icons/Upload.svg";
import BaseModal from "@/components/elements/BaseModal.vue";

// Props: Solo necesitamos saber si mostrarlo
const props = defineProps<{
  show: boolean;
}>();

// Emits
const emit = defineEmits<{
  (e: "close"): void;
  (e: "success"): void; // Para avisar al padre que recargue la tabla si es necesario
}>();

const boletaStore = useBoletaStore();
const file = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const dragging = ref(false);

// Trigger para abrir el input de archivo oculto
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Manejar selección de archivo
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]!;
  }
};

// Lógica de subida
const handleUpload = async () => {
  if (!file.value) return; // Validación básica

  try {
    await boletaStore.subirBoleta(file.value);
    file.value = null;
    emit("success");
    emit("close");
  } catch (error) {
    console.error("Error subiendo boleta", error);
  }
};

// Cerrar modal y limpiar
const handleClose = () => {
  file.value = null;
  emit("close");
};
</script>

<template>
  <BaseModal
    :show="show"
    title="Subir Boleta"
    mode="create"
    @close="handleClose"
    @confirm="handleUpload"
  >
    <div class="space-y-4">
      <p class="text-sm text-gray-600">
        Adjunta el archivo de la boleta para procesar las calificaciones.
      </p>

      <div
        class="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 group"
        :class="[
          dragging
            ? 'border-[#1226AB] bg-blue-50'
            : 'border-gray-400 hover:bg-gray-50',
        ]"
        @click="triggerFileInput"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="
          onFileChange($event);
          dragging = false;
        "
      >
        <div class="mb-3 text-gray-400 group-hover:text-gray-500">
          <img :src="Upload" alt="icon" class="w-24 h-24" />
        </div>

        <p class="text-gray-500 font-medium text-center">
          Selecciona un archivo o carpeta de documentos
        </p>
        <p class="text-xs text-gray-400 mt-1">Soporta: .pdf, .xlsx, .csv</p>

        <input
          ref="fileInput"
          type="file"
          class="hidden"
          accept=".pdf,.xlsx,.csv"
          @change="onFileChange"
        />
      </div>

      <div
        v-if="file"
        class="flex items-center justify-between bg-blue-50 p-3 rounded-md border border-blue-100"
      >
        <div class="flex items-center overflow-hidden">
          <svg
            class="h-5 w-5 text-[#1226AB] mr-2 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm text-gray-700 truncate font-medium">{{
            file.name
          }}</span>
        </div>
        <button
          @click.stop="file = null"
          class="text-red-500 hover:text-red-700 ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </BaseModal>
</template>
