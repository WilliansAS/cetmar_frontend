<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useContentStore } from "@/store/content.store";
import BaseModal from "@/components/elements/BaseModal.vue";
import ImagesIcon from "@/assets/icons/Image.svg";

const props = defineProps<{
  page: string;
  componentName: string;
  title: string;
  specialtyNames: string[];
}>();

const store = useContentStore();
const baseUrl = import.meta.env.VITE_API_URL;

const specialtySlots = computed(() => {
  return props.specialtyNames.map((name) => {
    const record = store.contents.find(
      (c) =>
        c.Page === props.page &&
        c.ComponentPage === props.componentName &&
        c.Titule === name,
    );
    return {
      name: name,
      data: record || null,
    };
  });
});

onMounted(async () => {
  if (store.contents.length === 0) await store.fetchContents();
});

const isUploadModalOpen = ref(false);
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const activeSlot = ref<{ name: string; id: number | null } | null>(null);

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    selectedFile.value = file;
    previewUrl.value = window.URL.createObjectURL(file);
  }
};

const openEditor = (slot: { name: string; data: any }) => {
  activeSlot.value = {
    name: slot.name,
    id: slot.data ? slot.data.Id : null,
  };
  // Si ya hay una imagen en el servidor, la mostramos, si no, limpiamos la previa
  previewUrl.value = slot.data ? `${baseUrl}${slot.data.UrlImage}` : null;
  selectedFile.value = null;
  isUploadModalOpen.value = true;
};

const handleConfirm = async () => {
  if (!selectedFile.value && !activeSlot.value?.id) return;

  const payload = {
    Titule: activeSlot.value!.name,
    Page: props.page,
    ComponentPage: props.componentName,
    image: selectedFile.value,
  };

  try {
    if (activeSlot.value?.id) {
      await store.editContent(activeSlot.value.id, payload);
    } else {
      await store.addContent(payload);
    }
    isUploadModalOpen.value = false;
  } catch (error) {
    console.error("Error al sincronizar especialidad:", error);
  }
};
</script>

<template>
  <section
    class="bg-white rounded-2xl p-8 shadow-sm flex flex-col w-full border border-gray-100"
  >
    <header class="flex items-center gap-3 mb-8">
      <img :src="ImagesIcon" class="w-7 h-7" />
      <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="slot in specialtySlots"
        :key="slot.name"
        class="flex flex-col bg-slate-50 p-5 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div
          class="w-full aspect-[5/7] rounded-2xl overflow-hidden bg-gray-200 mb-4 border border-gray-200"
        >
          <img
            v-if="slot.data"
            :src="`${baseUrl}${slot.data.UrlImage}`"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex flex-col items-center justify-center p-4 text-center"
          >
            <p class="text-gray-400 text-xs font-bold uppercase">Sin Portada</p>
          </div>
        </div>

        <div class="text-center">
          <h3
            class="text-sm font-black text-[#1226AB] uppercase mb-4 h-10 flex items-center justify-center"
          >
            {{ slot.name }}
          </h3>

          <button
            @click="openEditor(slot)"
            class="w-full py-3 rounded-xl font-bold text-sm transition shadow-sm cursor-pointer"
            :class="
              slot.data
                ? 'bg-[#1226AB] text-white hover:bg-blue-900'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            "
          >
            {{ slot.data ? "Cambiar Imagen" : "Subir Imagen" }}
          </button>
        </div>
      </div>
    </div>

    <BaseModal
      :show="isUploadModalOpen"
      :title="`Gestionar Portada: ${activeSlot?.name}`"
      @close="isUploadModalOpen = false"
      @confirm="handleConfirm"
    >
      <div
        class="p-6 border-3 border-dashed border-gray-200 rounded-3xl text-center cursor-pointer hover:bg-gray-50"
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
          class="max-h-72 mx-auto rounded-2xl shadow-xl mb-4"
        />
        <p v-else class="py-12 text-gray-400 font-bold">
          Selecciona la imagen para {{ activeSlot?.name }}
        </p>
      </div>
    </BaseModal>
  </section>
</template>