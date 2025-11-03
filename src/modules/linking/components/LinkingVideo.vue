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
    <LinkingVideoModal
      :visible="isModalOpen"
      @close="isModalOpen = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import VideoIcon from "@/assets/icons/Play.svg";
import PlayIcon from "@/assets/icons/VideoPlay.svg";
import LinkingVideoModal from "./elements/LinkingVideoModal.vue";

const props = defineProps({
  thumbnailSrc: { type: String, default: "/public/images/NuestraInstitucionHome.svg" },
  videoName: { type: String, default: "cetmar.mp4" },
});

const emit = defineEmits(["change", "delete"]);

const isModalOpen = ref(false);

const handleDelete = () => emit("delete");
const handleSave = (data: any) => {
  console.log("Archivo guardado:", data);
  isModalOpen.value = false;
};
</script>
