<template>
  <div
    class="bg-white shadow-md rounded-2xl p-5 w-full md:w-[48%] flex flex-col justify-between"
  >
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <img :src="ImagesIcon" alt="imagenes" class="w-6 h-6" />
        <h2 class="text-lg font-semibold text-gray-900">Imágenes</h2>
      </div>

      <BaseButton
        text="+ Añadir imagen"
        customClass="bg-[#1226AB] px-4 py-2"
        @click="openAddModal"
      />
    </div>

    <!-- Lista de imágenes -->
    <div v-if="images.length > 0" class="flex flex-col gap-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="flex items-center justify-between border-b border-gray-200 pb-4"
      >
        <div class="flex items-center gap-4">
          <img
            :src="image.src"
            alt="imagen"
            class="w-24 h-20 object-cover rounded-md border"
          />
          <div class="min-w-0 flex-1">
            <p class="text-gray-800 font-medium truncate" :title="image.name">
              {{ truncateFileName(image.name) }}
            </p>
          </div>
        </div>

        <div class="flex gap-2">
          <BaseButton
            text="Cambiar"
            customClass="bg-[#1226AB] px-4 py-2"
            @click="openChangeModal(index)"
          />
          <BaseButton
            text="Eliminar"
            customClass="bg-red-600 px-4 py-2"
            @click="removeImage(index)"
          />
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500 text-center mt-6">
      No hay imágenes disponibles
    </p>

    <!-- Modal -->
    <LinkingImagesModal
      :visible="isModalOpen"
      :image="selectedImage"
      @close="isModalOpen = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import ImagesIcon from "@/assets/icons/Image.svg";
import LinkingImagesModal from "./elements/LinkingImagesModal.vue";

interface ImageItem {
  src: string;
  name: string;
}

const images = ref<ImageItem[]>([
  { src: "/public/images/HomeImg1.svg", name: "plantel_cetmar.jpg" },
  { src: "/public/images/HomeImg2.svg", name: "evento.jpg" },
  { src: "/public/images/HomeImg3.svg", name: "conmemoracion.jpg" },
  { src: "/public/images/NuestraInstitucionHome.svg", name: "entrada.jpg" },
]);

const isModalOpen = ref(false);
const selectedImage = ref<ImageItem | null>(null);
const editingIndex = ref<number | null>(null);

const truncateFileName = (fileName: string, maxLength: number = 20) => {
  if (fileName.length <= maxLength) return fileName;

  const extension = fileName.split(".").pop();
  const nameWithoutExtension = fileName.slice(0, -(extension?.length || 0 + 1));
  const keepLength = Math.floor((maxLength - 5) / 2); // -5 para "..." y extensión

  if (nameWithoutExtension.length <= maxLength - 4) {
    return fileName;
  }

  const start = nameWithoutExtension.slice(0, keepLength);
  const end = nameWithoutExtension.slice(-keepLength);

  return `${start}...${end}.${extension}`;
};

// Modal de nueva imagen
const openAddModal = () => {
  selectedImage.value = null;
  editingIndex.value = null;
  isModalOpen.value = true;
};

// Modal de edición
const openChangeModal = (index: number) => {
  selectedImage.value = {
    src: images.value[index]?.src ?? "",
    name: images.value[index]?.name ?? "",
  };
  editingIndex.value = index;
  isModalOpen.value = true;
};

const removeImage = (index: number) => {
  images.value.splice(index, 1);
};

const handleSave = (data: any) => {
  if (!data?.src || !data?.fileName) return;

  if (editingIndex.value !== null) {
    images.value[editingIndex.value] = {
      src: data.src,
      name: data.fileName,
    };
  } else {
    images.value.push({
      src: data.src,
      name: data.fileName,
    });
  }

  isModalOpen.value = false;
  selectedImage.value = null;
  editingIndex.value = null;
};
</script>
