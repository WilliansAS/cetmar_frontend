<script setup lang="ts">
import { ref } from "vue";
import Papa, { type ParseResult } from "papaparse";
import UploadIcon from "@/assets/icons/Upload.svg";
import BaseModal from "@/components/elements/BaseModal.vue";
import { useStudentsStore } from "@/store/student.store";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();

const studentsStore = useStudentsStore();

// Estados de la interfaz
const file = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const dragging = ref(false);
const isLoading = ref(false);

// Estados para la representación visual (Spreadsheet)
const previewRows = ref<any[]>([]);
const previewHeaders = ref<string[]>([]);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileProcessing = (selectedFile: File) => {
  file.value = selectedFile;

  // Procesamiento visual rápido para la tabla
  Papa.parse(selectedFile, {
    header: true,
    preview: 8,
    complete: (results: ParseResult<any>) => {
      previewHeaders.value = results.meta.fields || [];
      previewRows.value = results.data;
    },
    skipEmptyLines: true,
  });
};

const onFileChange = (e: Event | DragEvent) => {
  let selectedFiles: FileList | null = null;
  if (e instanceof DragEvent) {
    selectedFiles = e.dataTransfer?.files || null;
  } else {
    selectedFiles = (e.target as HTMLInputElement).files;
  }

  if (selectedFiles && selectedFiles.length > 0) {
    handleFileProcessing(selectedFiles[0]!);
  }
};

// Lógica de Subida a la API (Store)
const handleConfirmUpload = async () => {
  if (!file.value) return;

  isLoading.value = true;
  try {
    await studentsStore.importCSV(file.value);
    handleClose();
  } catch (error) {
    console.error("Error en la importación:", error);
  } finally {
    isLoading.value = false;
  }
};

const removeFile = () => {
  file.value = null;
  previewRows.value = [];
  previewHeaders.value = [];
};

const handleClose = () => {
  removeFile();
  emit("close");
};
</script>

<template>
  <BaseModal
    :show="show"
    title="Registrar estudiantes"
    mode="create"
    @close="handleClose"
    @confirm="handleConfirmUpload"
  >
    <div
      class="space-y-4"
      :class="[file ? 'w-full max-w-lg' : 'w-full max-w-sm']"
    >
      <div v-if="!file" class="space-y-4">
        <p class="text-sm text-gray-600 font-medium text-center sm:text-left">
          Adjunta el archivo CSV con el formato establecido.
        </p>

        <div
          class="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-200"
          :class="[
            dragging
              ? 'border-[#1226AB] bg-blue-50'
              : 'border-gray-300 hover:border-[#1226AB] hover:bg-gray-50',
          ]"
          @click="triggerFileInput"
          @dragover.prevent="dragging = true"
          @dragleave.prevent="dragging = false"
          @drop.prevent="
            onFileChange($event);
            dragging = false;
          "
        >
          <div class="mb-4 opacity-70">
            <img :src="UploadIcon" alt="upload" class="w-16 h-16" />
          </div>

          <p
            class="text-gray-600 font-semibold text-center text-sm sm:text-base"
          >
            Arrastra el archivo aquí o haz clic para buscar
          </p>
          <p
            class="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold"
          >
            Solo archivos .csv
          </p>

          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept=".csv"
            @change="onFileChange"
          />
        </div>
      </div>

      <div v-else class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-xs font-bold text-gray-500 uppercase">
            Vista preliminar
          </p>
          <span
            class="text-[11px] font-mono bg-gray-100 px-2 py-0.5 rounded border border-gray-200"
          >
            {{ file.name }}
          </span>
        </div>

        <div
          class="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm"
        >
          <div class="overflow-x-auto max-h-60">
            <table class="min-w-full border-collapse bg-white text-[11px]">
              <thead>
                <tr class="bg-[#f3f3f3] select-none">
                  <th class="border border-gray-300 w-8 bg-[#e9e9e9]"></th>
                  <th
                    v-for="(h, i) in previewHeaders"
                    :key="i"
                    class="border border-gray-300 px-2 py-0.5 font-normal text-gray-400"
                  >
                    {{ String.fromCharCode(65 + i) }}
                  </th>
                </tr>
                <tr class="bg-white">
                  <th
                    class="border border-gray-300 bg-[#e9e9e9] text-gray-500 font-bold"
                  >
                    1
                  </th>
                  <th
                    v-for="h in previewHeaders"
                    :key="h"
                    class="border border-gray-300 px-3 py-1 text-left font-bold text-[#1226AB] bg-blue-50/20"
                  >
                    {{ h }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in previewRows" :key="rowIndex">
                  <td
                    class="border border-gray-300 bg-[#e9e9e9] text-center text-gray-400 font-medium"
                  >
                    {{ rowIndex + 2 }}
                  </td>
                  <td
                    v-for="h in previewHeaders"
                    :key="h"
                    class="border border-gray-300 px-3 py-1 text-gray-600 truncate max-w-[120px]"
                  >
                    {{ row[h] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex justify-center">
          <button
            @click="removeFile"
            class="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors uppercase font-bold tracking-tighter cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Quitar archivo
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
