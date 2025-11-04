<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl animate-fadeIn">
      <!-- Título -->
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        {{ image ? "Cambiar imagen" : "Añadir nueva imagen" }}
      </h2>

      <!-- Área de carga -->
      <div
        class="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#1226AB] transition"
        @click="triggerFileInput"
      >
        <img :src="UploadIcon" alt="Subir archivo" class="w-12 h-12 mb-3" />
        <p class="text-gray-600 font-medium">
          {{ selectedFileName || "Selecciona una imagen" }}
        </p>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
        />
      </div>

      <!-- Vista previa -->
      <div v-if="previewSrc" class="mt-4 flex justify-center">
        <img
          :src="previewSrc"
          alt="Vista previa"
          class="w-48 h-36 object-cover rounded-lg border"
        />
      </div>

      <!-- Botones -->
      <div class="flex justify-end gap-3 mt-6">
        <BaseButton
          text="Cancelar"
          customClass="bg-gray-400 text-gray-800 hover:brightness-95"
          @click="handleCancel"
        />
        <BaseButton
          text="Guardar"
          customClass="bg-[#1226AB]"
          @click="saveChanges"
          :disabled="!hasChanges"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import UploadIcon from "@/assets/icons/Upload.svg";

const props = defineProps({
  visible: { type: Boolean, default: false },
  image: { type: Object as any, default: null },
});

const emit = defineEmits(["close", "save"]);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFileName = ref("");
const previewSrc = ref("");
const selectedFile = ref<File | null>(null);

// Computed para habilitar/deshabilitar el botón Guardar
const hasChanges = computed(() => {
  return selectedFile.value !== null || (props.image && (selectedFileName.value !== props.image.name || previewSrc.value !== props.image.src));
});

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible) {
      // Resetear cuando el modal se abre
      if (props.image) {
        selectedFileName.value = props.image.name || "";
        previewSrc.value = props.image.src || "";
      } else {
        selectedFileName.value = "";
        previewSrc.value = "";
      }
      selectedFile.value = null;
    }
  }
);

const triggerFileInput = () => fileInput.value?.click();

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    selectedFileName.value = file.name;
    selectedFile.value = file;

    const reader = new FileReader();
    reader.onload = () => {
      previewSrc.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const handleCancel = () => {
  resetModal();
  emit("close");
};

const resetModal = () => {
  selectedFileName.value = "";
  previewSrc.value = "";
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const saveChanges = () => {
  // Evitar guardar vacío
  if (!selectedFile.value && !props.image) return;

  emit("save", {
    fileName: selectedFileName.value,
    src: previewSrc.value,
  });
  resetModal();
};
</script>