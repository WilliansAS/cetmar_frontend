<template>
  <div
    class="bg-white shadow-md rounded-2xl p-5 w-full md:w-[48%] flex flex-col justify-between"
  >
  <!-- Encabezado -->
<div class="flex items-center justify-between mb-4">
  <div class="flex items-center gap-2">
    <img :src="VideoIcon" alt="video" class="w-6 h-6" />
    <h2 class="text-lg font-semibold text-gray-900">Video de la Plataforma</h2>
  </div>
</div>

    <!-- Contenido principal -->
    <div class="relative w-full rounded-xl overflow-hidden shadow-sm">
      <img
        :src="thumbnailSrc"
        alt="Miniatura del video"
        class="w-full h-56 object-cover rounded-xl"
      />
      <div
        class="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition"
      >
        <img :src="PlayIcon" alt="Reproducir" class="w-16 h-16 opacity-90" />
      </div>
    </div>

    <!-- Pie -->
    <div class="flex items-center justify-between mt-4 flex-wrap gap-3">
      <p class="text-gray-700 font-medium truncate">{{ videoName }}</p>

      <div class="flex gap-2">
        <BaseButton
          text="Cambiar"
          customClass="bg-[#1226AB] px-4 py-2"
          @click="isModalOpen = true"
        />
        <BaseButton
          text="Eliminar"
          customClass="bg-red-600 px-4 py-2"
          @click="handleDelete"
        />
      </div>
    </div>

    <!-- Modal -->
    <BaseModal
      :show="isModalOpen"
      title="Subir video"
      mode="create"
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
          accept="video/*"
          class="hidden"
          @change="onFileChange"
        />

        <div v-if="!selectedFile" class="flex flex-col items-center gap-2">
          <p class="text-gray-600 font-medium">
            Arrastra un video aquí o haz clic para seleccionar
          </p>
          <p class="text-sm text-gray-400">
            Formatos permitidos: MP4, AVI, MOV
          </p>
        </div>

        <div v-else class="flex flex-col gap-4">
          <p class="text-sm font-semibold text-gray-700">
            {{ selectedFile.name }}
          </p>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import BaseModal from "@/components/elements/BaseModal.vue";
import VideoIcon from "@/assets/icons/Play.svg";
import PlayIcon from "@/assets/icons/VideoPlay.svg";

const props = defineProps({
  thumbnailSrc: { type: String, default: "/public/images/NuestraInstitucionHome.svg" },
  videoName: { type: String, default: "cetmar.mp4" },
});

const emit = defineEmits(["change", "delete"]);

const videoName = ref(props.videoName);
const thumbnailSrc = ref(props.thumbnailSrc);

const isModalOpen = ref(false);

const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const handleFile = (file: File) => {
  if (!file.type.startsWith("video/")) return;
  selectedFile.value = file;
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

const handleDelete = () => {
  videoName.value = "cetmar.mp4";
  thumbnailSrc.value = "/public/images/NuestraInstitucionHome.svg";
  emit("delete");
};

const handleConfirm = () => {
  if (!selectedFile.value) return;
  videoName.value = selectedFile.value.name;
  emit("change", { name: selectedFile.value.name });
  selectedFile.value = null;
  isModalOpen.value = false;
};
</script>
