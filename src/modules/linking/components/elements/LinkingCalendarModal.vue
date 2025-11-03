<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl animate-fadeIn"
    >
      <!-- Título -->
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        Subir nuevo calendario
      </h2>

      <!-- Área de carga -->
      <div
        class="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#1226AB] transition"
        @click="triggerFileInput"
      >
        <img :src="UploadIcon" alt="Subir archivo" class="w-12 h-12 mb-3" />
        <p class="text-gray-600 font-medium">
          {{ selectedFileName || "Selecciona un archivo PDF o imagen" }}
        </p>
        <input
          ref="fileInput"
          type="file"
          accept=".pdf,image/*"
          class="hidden"
          @change="handleFileChange"
        />
      </div>

      <!-- Botones -->
      <div class="flex justify-end gap-3 mt-6">
        <BaseButton
          text="Cancelar"
          customClass="bg-gray-400 text-gray-800 hover:brightness-95"
          @click="closeModal"
        />
        <BaseButton
          text="Guardar"
          customClass="bg-[#1226AB]"
          @click="saveChanges"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import UploadIcon from "@/assets/icons/Upload.svg";

const props = defineProps({
  visible: { type: Boolean, default: false },
});

const emit = defineEmits(["close", "save"]);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFileName = ref("");
const triggerFileInput = () => fileInput.value?.click();

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) selectedFileName.value = file.name;
};

const closeModal = () => emit("close");

const saveChanges = () => {
  emit("save", {
    fileName: selectedFileName.value,
  });
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
