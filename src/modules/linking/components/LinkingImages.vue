<script setup lang="ts">
import { ref, computed } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import BaseModal from "@/components/elements/BaseModal.vue";
import ImagesIcon from "@/assets/icons/Image.svg";

export interface ImageItem {
  src: string;
  name: string;
}

const props = defineProps<{
  title: string;
  images: ImageItem[];
  maxImages?: number;
  expectedNames?: string[];
  galleryMode?: boolean;
  description?: string;
}>();

const emit = defineEmits<{
  (e: "update:images", value: ImageItem[]): void;
}>();

const maxImages = computed(() => props.maxImages ?? Infinity);

const isModalOpen = ref(false);
const editingIndex = ref<number | null>(null);

const openAddModal = (index?: number) => {
  editingIndex.value = typeof index === "number" ? index : null;
  isModalOpen.value = true;
};

const openEditModal = (index: number) => {
  editingIndex.value = index;
  isModalOpen.value = true;
};

const removeImage = (index: number) => {
  const updated = [...props.images];

  if (props.expectedNames) {
    updated[index] = undefined as any;
  } else {
    updated.splice(index, 1);
  }

  emit("update:images", updated);
};

const handleConfirm = () => {
  if (!selectedFile.value || !previewUrl.value) return;

  const image: ImageItem = {
    src: previewUrl.value,
    name: selectedFile.value.name,
  };

  const updated = [...props.images];

  if (editingIndex.value !== null) {
    updated[editingIndex.value] = image;
  } else {
    // Solo permitir push cuando NO hay expectedNames
    updated.push(image);
  }

  emit("update:images", updated);

  // Reset
  selectedFile.value = null;
  previewUrl.value = null;
  isModalOpen.value = false;
  editingIndex.value = null;
};

const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const handleFile = (file: File) => {
  if (!file.type.startsWith("image/")) return;

  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    handleFile(input.files[0]);
  }
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    handleFile(event.dataTransfer.files[0]);
  }
};

const isImageModalOpen = ref(false);
const selectedImage = ref<ImageItem | null>(null);

const openImageModal = (image: ImageItem) => {
  selectedImage.value = image;
  isImageModalOpen.value = true;
};

const closeImageModal = () => {
  isImageModalOpen.value = false;
  selectedImage.value = null;
};

const isWide = computed(() => {
  if (props.galleryMode) {
    return props.images.length > 1;
  }
  const count = props.expectedNames
    ? props.expectedNames.length
    : props.images.length;
  return count > 1;
});
</script>

<template>
  <div
    :class="[
      'bg-white shadow-md rounded-2xl p-6 flex flex-col',
      isWide ? 'w-full' : 'w-full md:w-[48%]',
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-3">
        <img :src="ImagesIcon" alt="imagenes" class="w-6 h-6" />
        <h2 class="text-lg font-semibold text-gray-900">
          {{ title }}
        </h2>
      </div>

      <BaseButton
        v-if="!expectedNames && images.length < maxImages"
        text="+ Añadir imagen"
        customClass="bg-[#1226AB] px-4 py-2"
        @click="openAddModal"
      />
    </div>

    <!-- Description -->
    <p v-if="description" class="text-gray-500 text-sm mb-4">
      {{ description }}
    </p>

    <div v-if="expectedNames" class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div
        v-for="(name, index) in expectedNames"
        :key="index"
        class="flex flex-col gap-4 border border-gray-200 rounded-xl p-4"
      >
        <!-- Nombre -->
        <p class="text-gray-800 font-semibold">
          {{ name }}
        </p>

        <!-- Imagen o placeholder -->
        <div
          v-if="images[index]"
          class="flex flex-col md:flex-row md:items-center gap-4"
        >
          <img
            :src="images[index].src"
            alt="imagen"
            class="w-full md:w-64 h-40 md:h-48 object-cover rounded-lg bg-gray-100 cursor-pointer"
            @click="openImageModal(images[index])"
          />

          <div class="flex gap-4 justify-center md:justify-start">
            <BaseButton
              text="Cambiar Imagen"
              customClass="bg-[#1226AB] px-4 py-2"
              @click="openEditModal(index)"
            />
            <BaseButton
              text="Eliminar"
              customClass="bg-red-600 px-4 py-2"
              @click="removeImage(index)"
            />
          </div>
        </div>

        <div
          v-else
          class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"
        >
          <p class="text-gray-600 font-medium mb-4">
            No existe una imagen, añade una
          </p>
          <BaseButton
            text="Añadir imagen"
            customClass="bg-[#1226AB] px-4 py-2"
            @click="openAddModal(index)"
          />
        </div>
      </div>
    </div>

    <div
      v-else-if="images.length"
      class="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="flex flex-col gap-4 border-gray-200 rounded-xl p-4"
      >
        <!-- Imagen + botones -->
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <img
            :src="image.src"
            alt="imagen"
            class="w-full md:w-64 min-h-[10rem] h-40 md:h-48 object-cover rounded-lg bg-gray-100 cursor-pointer"
            @click="openImageModal(image)"
          />

          <div class="flex gap-4 justify-center md:justify-start">
            <BaseButton
              text="Cambiar Imagen"
              customClass="bg-[#1226AB] px-4 py-2"
              @click="openEditModal(index)"
            />
            <BaseButton
              text="Eliminar"
              customClass="bg-red-600 px-4 py-2"
              @click="removeImage(index)"
            />
          </div>
        </div>

        <!-- Nombre -->
        <p class="text-gray-800 font-semibold">
          {{ image.name }}
        </p>
      </div>
    </div>

    <p v-else class="text-gray-500 text-center mt-6">No hay imágenes</p>

    <!-- Modal Global -->
    <BaseModal
      :show="isModalOpen"
      title="Subir imagen"
      :mode="editingIndex !== null ? 'edit' : 'create'"
      @close="isModalOpen = false"
      @confirm="handleConfirm"
    >
      <div
        class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#1226AB] transition"
        @dragover.prevent
        @drop="onDrop"
        @click="fileInput?.click()"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />

        <div v-if="!previewUrl" class="flex flex-col items-center gap-2">
          <p class="text-gray-600 font-medium">
            Arrastra una imagen aquí o haz clic para seleccionar
          </p>
          <p class="text-sm text-gray-400">
            Formatos permitidos: JPG, PNG, WEBP
          </p>
        </div>

        <div v-else class="flex flex-col gap-4">
          <img
            :src="previewUrl"
            alt="preview"
            class="w-full h-48 object-cover rounded-lg"
          />
          <p class="text-sm font-semibold text-gray-700">
            {{ selectedFile?.name }}
          </p>
        </div>
      </div>
    </BaseModal>
  </div>

  <!-- Modal de imagen expandida -->
  <div
    v-if="isImageModalOpen"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    @click="closeImageModal"
  >
    <div class="relative max-w-4xl max-h-full p-4" @click.stop>
      <img
        :src="selectedImage?.src"
        alt="expanded"
        class="max-w-full max-h-full object-contain rounded-lg"
      />
      <button
        @click="closeImageModal"
        class="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
