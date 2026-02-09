<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useContentStore } from "@/store/content.store";
import BaseModal from "@/components/elements/BaseModal.vue";
import ImagesIcon from "@/assets/icons/Image.svg";

const props = defineProps<{
  page: string;
  componentName: string;
  title: string;
}>();

const store = useContentStore();
const baseUrl = import.meta.env.VITE_API_URL;

// Solo tomamos el primer elemento que coincida
const videoItem = computed(() =>
  store.contents.find(
    (c) => c.Page === props.page && c.ComponentPage === props.componentName,
  ),
);

onMounted(async () => {
  if (store.contents.length === 0) await store.fetchContents();
});

const isUploadModalOpen = ref(false);
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const handleConfirmUpload = async () => {
  if (!selectedFile.value) return;
  const payload = {
    Titule: selectedFile.value.name,
    Page: props.page,
    ComponentPage: props.componentName,
    image: selectedFile.value,
  };

  try {
    if (videoItem.value) await store.editContent(videoItem.value.Id, payload);
    else await store.addContent(payload);
    isUploadModalOpen.value = false;
    selectedFile.value = null;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <section
    class="bg-white rounded-2xl p-8 shadow-sm flex flex-col w-full border border-gray-100"
  >
    <header class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <img :src="ImagesIcon" class="w-7 h-7" />
        <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
      </div>
      <button
        @click="isUploadModalOpen = true"
        class="bg-[#1226AB] text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-blue-800 transition shadow-md cursor-pointer"
      >
        {{ videoItem ? "Reemplazar Video" : "Subir Video" }}
      </button>
    </header>

    <div
      v-if="videoItem"
      class="bg-slate-900 rounded-3xl overflow-hidden aspect-video shadow-2xl relative group"
    >
      <video
        :src="`${baseUrl}${videoItem.UrlImage}`"
        controls
        class="w-full h-full object-contain"
      ></video>
      <div
        class="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold"
      >
        Archivo actual: {{ videoItem.Titule }}
      </div>
    </div>

    <div
      v-else
      class="py-20 text-center border-3 border-dashed border-gray-200 rounded-3xl text-gray-400 italic"
    >
      No hay ningún video cargado para esta sección.
    </div>

    <BaseModal
      :show="isUploadModalOpen"
      title="Gestionar Video Institucional"
      @close="isUploadModalOpen = false"
      @confirm="handleConfirmUpload"
    >
      <div
        class="p-10 text-center border-3 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-gray-50 transition"
        @click="fileInput?.click()"
      >
        <input
          ref="fileInput"
          type="file"
          accept="video/*"
          class="hidden"
          @change="
            (e) =>
              (selectedFile = (e.target as HTMLInputElement).files?.[0] || null)
          "
        />
        <div v-if="selectedFile" class="flex flex-col items-center gap-4">
          <div
            class="bg-blue-100 p-4 rounded-full text-blue-600 font-bold text-xl"
          >
            ✓
          </div>
          <p class="text-blue-900 font-bold">{{ selectedFile.name }}</p>
          <p class="text-xs text-gray-500">Listo para subir</p>
        </div>
        <div v-else>
          <p class="text-gray-500 font-bold">
            Haz clic para seleccionar el video (.mp4, .webm)
          </p>
        </div>
      </div>
    </BaseModal>
  </section>
</template>
