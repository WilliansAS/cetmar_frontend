<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 class="text-xl font-bold mb-4">Añadir nueva imagen</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de la imagen</label>
          <input 
            v-model="imageName" 
            type="text" 
            placeholder="Ej: Banner Principal 1"
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Archivo de imagen</label>
          <input 
            type="file" 
            accept="image/*" 
            @change="handleFileChange"
            class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div v-if="previewUrl" class="mt-2">
          <p class="text-xs text-gray-400 mb-1">Vista previa:</p>
          <img :src="previewUrl" class="h-32 w-full object-cover rounded-md border" />
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button @click="closeModal" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
          Cancelar
        </button>
        <button 
          @click="handleConfirm" 
          :disabled="!imageName || !selectedFile"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
        >
          Subir Imagen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close', 'confirm']);

const imageName = ref('');
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
    // Solo para la vista previa visual en el modal
    previewUrl.value = URL.createObjectURL(target.files[0]);
  }
};

const handleConfirm = () => {
  if (imageName.value && selectedFile.value) {
    // Emitimos el objeto File real y el nombre
    emit('confirm', {
      name: imageName.value,
      file: selectedFile.value
    });
    closeModal();
  }
};

const closeModal = () => {
  imageName.value = '';
  selectedFile.value = null;
  previewUrl.value = null;
  emit('close');
};
</script>