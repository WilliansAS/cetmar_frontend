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
const files = ref<File[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
const dragging = ref(false);

// Trigger para abrir el input de archivo oculto
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Manejar selección de archivo
const onFileChange = (e: Event | DragEvent) => {
  let selectedFiles: FileList | null = null;

  if (e instanceof DragEvent) {
    selectedFiles = e.dataTransfer?.files || null;
  } else {
    selectedFiles = (e.target as HTMLInputElement).files;
  }

  if (selectedFiles) {
    // Convertimos FileList a Array y lo acumulamos
    files.value = [...files.value, ...Array.from(selectedFiles)];
  }
};

// Lógica de subida
const handleUpload = async () => {
  if (files.value.length === 0) return;

  try {
    await boletaStore.subirBoleta(files.value);
    files.value = [];
    emit("success");
    emit("close");
  } catch (error) {
    console.error("Error subiendo boleta", error);
  }
};

// Cerrar modal y limpiar
const handleClose = () => {
  files.value = [];
  emit("close");
};

const removeFile = (index: number) => {
  files.value.splice(index, 1);
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
          multiple
          webkitdirectory
          @change="onFileChange"
        />
      </div>

      <div
        v-if="files.length > 0"
        class="max-h-48 overflow-y-auto space-y-2 mt-4 pr-1"
      >
        <div
          v-for="(f, index) in files"
          :key="index"
          class="flex items-center justify-between bg-blue-50 p-2 rounded-md border border-blue-100 transition-all"
        >
          <div class="flex items-center overflow-hidden">
            <svg
              class="h-4 w-4 text-[#1226AB] mr-2 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-xs text-gray-700 truncate font-medium">
              {{ f.name }}
            </span>
          </div>

          <button
            type="button"
            @click.stop="removeFile(index)"
            class="text-red-400 hover:text-red-600 transition-colors p-1"
            title="Quitar archivo"
          >
            <svg
              class="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
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
    </div>
  </BaseModal>
</template>
