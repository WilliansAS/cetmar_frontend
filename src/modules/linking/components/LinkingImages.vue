<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Banner Principal</h2>
      <button 
        @click="isModalOpen = true"
        class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        <span>+ Añadir Imagen</span>
      </button>
    </div>

    <div v-if="images.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="img in images" :key="img.id" class="group relative rounded-lg overflow-hidden border border-gray-200">
        <img :src="img.src" :alt="img.name" class="w-full h-48 object-cover" />
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            @click="emit('delete', img.id)"
            class="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        <div class="p-2 bg-white text-center">
          <p class="text-sm font-medium text-gray-700 truncate">{{ img.name }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
      <p class="text-gray-400">No hay imágenes en el banner</p>
    </div>

    <LinkingImagesModal 
      :is-open="isModalOpen" 
      @close="isModalOpen = false" 
      @confirm="onAddConfirm" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LinkingImagesModal from '@/modules/linking/components/elements/LinkingImagesModal.vue';

defineProps<{
  images: Array<{ id: number; name: string; src: string }>;
}>();

const emit = defineEmits(['add', 'delete']);
const isModalOpen = ref(false);

const onAddConfirm = (payload: { name: string, file: File }) => {
  // Pasamos el evento al padre (LinkingSpeciality.vue)
  emit('add', payload);
};
</script>