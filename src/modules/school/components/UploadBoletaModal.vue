<script setup lang="ts">
import { ref } from "vue";
import { useBoletaStore } from "../../../store/school.store";
import Upload from "@/assets/icons/Upload.svg";
import BaseModal from "@/components/elements/BaseModal.vue";
import LoadingModal from "@/components/elements/LoadingModal.vue";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "success"): void;
}>();

const boletaStore = useBoletaStore();
const files = ref<File[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
const folderInput = ref<HTMLInputElement | null>(null);
const dragging = ref(false);
const isUploading = ref(false);

const triggerFileInput = () => fileInput.value?.click();
const triggerFolderInput = () => folderInput.value?.click();

const onFileChange = (e: Event | DragEvent) => {
  let selectedFiles: FileList | null = null;
  if (e instanceof DragEvent) {
    selectedFiles = e.dataTransfer?.files || null;
  } else {
    selectedFiles = (e.target as HTMLInputElement).files;
  }

  if (selectedFiles) {
    files.value = [...files.value, ...Array.from(selectedFiles)];
  }
};

const handleUpload = async () => {
  if (files.value.length === 0) return;
  emit("close");
  isUploading.value = true;
  try {
    await boletaStore.subirBoleta(files.value);
    files.value = [];
    emit("success");
  } catch (error) {
    console.error("Error subiendo boleta", error);
  } finally {
    isUploading.value = false;
  }
};

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
    <div class="space-y-4 w-full max-w-sm">
      <p class="text-sm text-gray-600 font-medium">
        Adjunta los archivos de las boletas para procesar las calificaciones.
      </p>

      <div
        class="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors duration-200 group relative"
        :class="[
          dragging
            ? 'border-[#1226AB] bg-blue-50'
            : 'border-gray-400 hover:bg-gray-50 bg-gray-50/50',
        ]"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="
          onFileChange($event);
          dragging = false;
        "
      >
        <div
          class="mb-4 text-gray-400 group-hover:text-[#1226AB] transition-colors"
        >
          <img :src="Upload" alt="icon" class="w-16 h-16" />
        </div>

        <div class="flex flex-col gap-3 w-full px-2 z-10">
          <button
            type="button"
            @click.stop="triggerFileInput"
            class="w-full py-2.5 px-4 rounded-md bg-[#1226AB] text-white text-xs font-bold shadow-md hover:bg-opacity-90 transition-all active:scale-95 cursor-pointer"
          >
            Seleccionar Archivos PDF
          </button>

          <button
            type="button"
            @click.stop="triggerFolderInput"
            class="w-full py-2.5 px-4 rounded-md bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 transition-all active:scale-95 cursor-pointer"
          >
            Seleccionar Carpeta de Boletas
          </button>
        </div>

        <p
          class="text-[10px] text-gray-400 mt-4 font-bold tracking-wider uppercase"
        >
          Solo se aceptan archivos .pdf
        </p>

        <input
          ref="fileInput"
          type="file"
          class="hidden"
          accept=".pdf"
          multiple
          @change="onFileChange"
        />

        <input
          ref="folderInput"
          type="file"
          class="hidden"
          webkitdirectory
          @change="onFileChange"
        />
      </div>

      <div
        v-if="files.length > 0"
        class="max-h-40 overflow-y-auto space-y-2 mt-2 pr-1 custom-scrollbar"
      >
        <div
          v-for="(f, index) in files"
          :key="index"
          class="flex items-center justify-between bg-blue-50 p-2 rounded-md border border-blue-100"
        >
          <div class="flex items-center overflow-hidden">
            <svg
              class="h-4 w-4 text-[#1226AB] mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-[11px] text-gray-700 truncate font-semibold">{{
              f.name
            }}</span>
          </div>

          <button
            type="button"
            @click.stop="removeFile(index)"
            class="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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

  <LoadingModal
    :show="isUploading"
    title="Procesando documentos..."
    subtitle="Procesando archivos PDF, por favor espera."
  />
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>
