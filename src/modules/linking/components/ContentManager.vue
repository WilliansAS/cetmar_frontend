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
  maxImages?: number;
}>();

const store = useContentStore();
const baseUrl = import.meta.env.VITE_API_URL;

// LÓGICA DE DATOS
const items = computed(() =>
  store.contents.filter(
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

const editingId = ref<number | null>(null);
const previewUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const activePreview = ref<{ src: string; name: string } | null>(null);
const pendingDelete = ref<{ id: number; name: string } | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// ACCIONES
const openAdd = () => {
  editingId.value = null;
  previewUrl.value = null;
  selectedFile.value = null;
  isUploadModalOpen.value = true;
};

const openEdit = (id: number, currentUrl: string) => {
  editingId.value = id;
  previewUrl.value = `${baseUrl}${currentUrl}`;
  selectedFile.value = null;
  isUploadModalOpen.value = true;
};

const openPreview = (url: string, name: string) => {
  activePreview.value = { src: `${baseUrl}${url}`, name };
  isPreviewModalOpen.value = true;
};

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  selectedFile.value = file;
  previewUrl.value = window.URL.createObjectURL(file);
};

const handleConfirmUpload = async () => {
  if (!selectedFile.value && editingId.value === null) return;
  const payload = {
    Titule: selectedFile.value?.name || "Imagen cargada",
    Page: props.page,
    ComponentPage: props.componentName,
    image: selectedFile.value,
  };

  try {
    if (editingId.value) await store.editContent(editingId.value, payload);
    else await store.addContent(payload);
    isUploadModalOpen.value = false;
  } catch (error) {
    console.error("Error al procesar la subida:", error);
  }
};

const askDelete = (item: any) => {
  pendingDelete.value = { id: item.Id, name: item.Titule };
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (pendingDelete.value) {
    await store.removeContent(pendingDelete.value.id);
    isDeleteModalOpen.value = false;
    pendingDelete.value = null;
  }
};
</script>

<template>
  <section
    class="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col w-full border border-gray-100"
  >
    <header
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
    >
      <div class="flex items-center gap-3">
        <img :src="ImagesIcon" class="w-7 h-7" />
        <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
      </div>

      <button
        v-if="!maxImages || items.length < maxImages"
        @click="openAdd"
        class="bg-[#1226AB] text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-blue-800 transition-all shadow-md active:scale-95 cursor-pointer w-full sm:w-auto"
      >
        + Añadir nueva imagen
      </button>
    </header>

    <div class="flex flex-col">
      <div
        v-for="item in items"
        :key="item.Id"
        class="flex flex-col lg:flex-row lg:items-center justify-between py-6 border-b border-gray-200 last:border-0 gap-6"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8 flex-1 min-w-0"
        >
          <div
            class="w-full sm:w-44 h-48 sm:h-28 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-gray-100 border border-gray-200 shadow-sm"
            @click="openPreview(item.UrlImage!, item.Titule!)"
          >
            <img
              :src="`${baseUrl}${item.UrlImage}`"
              class="w-full h-full object-cover hover:scale-110 transition duration-500"
            />
          </div>

          <span
            class="text-base font-semibold text-gray-800 break-words lg:truncate lg:max-w-md"
          >
            {{ item.Titule }}
          </span>
        </div>

        <div class="flex flex-row gap-3 w-full lg:w-auto">
          <button
            @click="openEdit(item.Id, item.UrlImage!)"
            class="bg-[#1226AB] text-white px-6 md:px-8 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-900 transition shadow-sm cursor-pointer flex-1 lg:flex-none lg:min-w-[130px]"
          >
            Cambiar
          </button>
          <button
            @click="askDelete(item)"
            class="bg-[#EE0D0D] text-white px-6 md:px-8 py-2.5 rounded-2xl text-sm font-bold hover:bg-red-700 transition shadow-sm cursor-pointer flex-1 lg:flex-none lg:min-w-[130px]"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div
        v-if="items.length === 0"
        class="py-16 text-center text-gray-400 italic"
      >
        No hay imágenes registradas en esta sección.
      </div>
    </div>

    <BaseModal
      :show="isUploadModalOpen"
      :title="editingId ? 'Cambiar imagen' : 'Subir imagen'"
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
      <div v-if="activePreview" class="text-center p-2">
        <img
          :src="activePreview.src"
          class="max-w-full max-h-[70vh] mx-auto rounded-2xl shadow-2xl object-contain"
        />
        <p class="mt-6 text-lg font-bold text-gray-800">
          {{ activePreview.name }}
        </p>
      </div>
    </BaseModal>

    <ConfirmDelete
      :show="isDeleteModalOpen"
      :elementName="pendingDelete?.name || 'esta imagen'"
      @close="isDeleteModalOpen = false"
      @confirm="confirmDelete"
    />
  </section>
</template>