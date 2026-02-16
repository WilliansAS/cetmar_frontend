<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useContentStore } from "@/store/content.store";
import BaseModal from "@/components/elements/BaseModal.vue";
import ConfirmDelete from "@/components/elements/ConfirmDeleteModal.vue";
import ImagesIcon from "@/assets/icons/Image.svg";

const props = defineProps<{
  page: string;
  componentName: string;
  title: string;
  description?: string;
}>();

const store = useContentStore();
const baseUrl = import.meta.env.VITE_API_URL;

// LÓGICA DE DATOS
const item = computed(() =>
  store.contents.find(
    (c) => c.Page === props.page && c.ComponentPage === props.componentName,
  ),
);

onMounted(async () => {
  if (store.contents.length === 0) await store.fetchContents();
});

// ESTADOS Y REFERENCIAS
const isUploadModalOpen = ref(false);
const isPreviewModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const previewUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// ACCIONES
const openEditor = () => {
  previewUrl.value = item.value ? `${baseUrl}${item.value.UrlImage}` : null;
  selectedFile.value = null;
  isUploadModalOpen.value = true;
};

const openPreview = () => {
  if (item.value) isPreviewModalOpen.value = true;
};

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  selectedFile.value = file;
  previewUrl.value = window.URL.createObjectURL(file);
};

const handleConfirmUpload = async () => {
  if (!selectedFile.value && !item.value) return;

  const payload = {
    Titule: props.title,
    Page: props.page,
    ComponentPage: props.componentName,
    image: selectedFile.value,
  };

  try {
    if (item.value) {
      await store.editContent(item.value.Id, payload);
    } else {
      await store.addContent(payload);
    }
    isUploadModalOpen.value = false;
  } catch (error) {
    console.error("Error al guardar contenido:", error);
  }
};

const confirmDelete = async () => {
  if (item.value) {
    await store.removeContent(item.value.Id);
    isDeleteModalOpen.value = false;
  }
};
</script>

<template>
  <section
    class="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col w-full border border-gray-100"
  >
    <header
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
    >
      <div class="flex items-center gap-3">
        <img :src="ImagesIcon" class="w-7 h-7" />
        <div>
          <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
          <p v-if="description" class="text-sm text-gray-500 mt-2 max-w-xl">
            {{ description }}
          </p>
        </div>
      </div>
    </header>

    <div class="flex flex-col gap-6">
      <div v-if="item" class="space-y-4">
        <div
          class="w-full aspect-[16/6] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 border border-gray-200 shadow-sm"
          @click="openPreview"
        >
          <img
            :src="`${baseUrl}${item.UrlImage}`"
            class="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div class="flex flex-row gap-3 w-full sm:w-auto sm:self-end">
          <button
            @click="openEditor"
            class="flex-1 sm:flex-none bg-[#1226AB] text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-900 transition shadow-sm active:scale-95 cursor-pointer"
          >
            Cambiar
          </button>
          <button
            @click="isDeleteModalOpen = true"
            class="flex-1 sm:flex-none bg-[#EE0D0D] text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition shadow-sm active:scale-95 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div
        v-else
        class="py-12 flex flex-col items-center justify-center text-center"
      >
        <p class="text-gray-400 font-medium mb-6">
          No hay archivo registrado para esta sección.
        </p>
        <button
          @click="openEditor"
          class="bg-[#1226AB] text-white px-10 py-3.5 rounded-xl font-bold text-base hover:bg-blue-800 transition shadow-lg active:scale-95 cursor-pointer"
        >
          + Subir imagen inicial
        </button>
      </div>
    </div>

    <BaseModal
      :show="isUploadModalOpen"
      :title="item ? 'Cambiar imagen' : 'Subir imagen'"
      @close="isUploadModalOpen = false"
      @confirm="handleConfirmUpload"
    >
      <div
        class="p-6 border-3 border-dashed border-gray-200 rounded-3xl text-center cursor-pointer hover:bg-gray-50 transition"
        @click="fileInput?.click()"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />
        <img
          v-if="previewUrl"
          :src="previewUrl"
          class="max-h-64 mx-auto rounded-2xl shadow-lg mb-4 object-contain"
        />
        <div v-else class="py-12">
          <p class="text-gray-500 font-bold">
            Haz clic para seleccionar una imagen
          </p>
          <p class="text-xs text-gray-400 mt-2">
            Formatos sugeridos: JPG, PNG o WEBP
          </p>
        </div>
      </div>
    </BaseModal>

    <BaseModal
      :show="isPreviewModalOpen"
      title="Vista Previa"
      mode="view"
      @close="isPreviewModalOpen = false"
    >
      <div v-if="item" class="text-center p-2">
        <img
          :src="`${baseUrl}${item.UrlImage}`"
          class="max-w-full max-h-[75vh] mx-auto rounded-2xl shadow-2xl"
        />
        <p class="mt-6 text-lg font-bold text-gray-800">{{ title }}</p>
      </div>
    </BaseModal>

    <ConfirmDelete
      :show="isDeleteModalOpen"
      :elementName="title"
      @close="isDeleteModalOpen = false"
      @confirm="confirmDelete"
    />
  </section>
</template>
