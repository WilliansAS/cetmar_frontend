<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAnnouncementStore } from "@/store/announcement.store";
import type { IAnnouncementPayload } from "@/interfaces/IAnnouncement";
import BaseButton from "@/components/elements/BaseButton.vue";
import BaseModal from "@/components/elements/BaseModal.vue";
import BaseInput from "@/components/elements/BaseInput.vue";

import FileIcon from "@/assets/icons/Megaphone.svg"; // Podrías cambiarlo por uno de documento
import TrashIcon from "@/assets/icons/Trash.svg";
import EditPencilIcon from "@/assets/icons/EditPencil.svg";

const announcementStore = useAnnouncementStore();
const { announcements, loading } = storeToRefs(announcementStore);

const isModalOpen = ref(false);
const editingId = ref<number | null>(null);
const selectedFile = ref<File | null>(null);

// Filtramos solo los formatos
const formats = computed(() =>
  announcements.value.filter((item) => item.Type === "Formato"),
);

const form = ref<IAnnouncementPayload>({
  Titule: "",
  Description: "",
  Type: "Formato",
  UrlImage: null,
  UrlDocument: null,
  IsAnAdvice: false,
  CreationDate: "",
  EndDate: null,
  IsActive: true,
});

const modalMode = computed(() =>
  editingId.value !== null ? "edit" : "create",
);

onMounted(async () => {
  await announcementStore.fetchAnnouncements();
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};

const openAddModal = () => {
  editingId.value = null;
  selectedFile.value = null;
  form.value = {
    Titule: "",
    Description: "",
    Type: "Formato",
    UrlImage: null,
    UrlDocument: null,
    IsAnAdvice: false,
    CreationDate: new Date().toLocaleDateString("en-CA"),
    EndDate: null,
    IsActive: true,
  };
  isModalOpen.value = true;
};

const openEditModal = (item: any) => {
  editingId.value = item.Id;
  selectedFile.value = null;
  form.value = {
    ...item,
    CreationDate: item.CreationDate ? item.CreationDate.split("T")[0] : "",
    EndDate: item.EndDate ? item.EndDate.split("T")[0] : null,
  };
  isModalOpen.value = true;
};

const handleConfirm = async () => {
  try {
    const payload = { ...form.value };

    // Formateo de fechas local para evitar desfase y error 422
    if (!editingId.value) {
      payload.CreationDate = new Date().toLocaleDateString("en-CA");
    }

    if (editingId.value !== null) {
      await announcementStore.updateAnnouncement(editingId.value, payload);
    } else {
      // Enviamos el payload y el archivo físico al store
      await announcementStore.createAnnouncement(payload, selectedFile.value);
    }
    isModalOpen.value = false;
  } catch (error) {
    console.error("Error al procesar el formato:", error);
  }
};

const handleToggleStatus = async (id: number) => {
  await announcementStore.toggleStatus(id);
};
</script>

<template>
  <div class="bg-white shadow-md rounded-2xl p-6 w-full flex flex-col">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <img :src="FileIcon" class="w-6 h-6" />
        <h2 class="text-lg font-semibold text-gray-900">
          Formatos Descargables
        </h2>
      </div>
      <BaseButton
        text="+ Añadir formato"
        customClass="bg-[#00A896] px-4 py-2"
        @click="openAddModal"
      />
    </div>

    <div v-if="loading" class="text-center py-10 text-gray-400">
      Cargando...
    </div>

    <div v-else-if="formats.length" class="flex flex-col gap-4">
      <div
        v-for="item in formats"
        :key="item.Id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex justify-between items-start hover:shadow-md transition relative overflow-hidden"
      >
        <div
          class="absolute left-0 top-0 bottom-0 w-2 bg-[#00A896]"
          :class="{ 'opacity-50': !item.IsActive }"
        />

        <div class="flex items-start gap-3 flex-1 min-w-0 pl-4">
          <div class="w-2 h-2 bg-[#00A896] rounded-full mt-2"></div>
          <div class="min-w-0 flex-1">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {{ item.Titule }}
            </h3>
            <p class="text-gray-600 text-sm mt-1 line-clamp-2">
              {{ item.Description || "Sin descripción disponible" }}
            </p>
            <div class="flex gap-4 mt-2">
              <span class="text-xs text-gray-400"
                >Subido:
                {{ new Date(item.CreationDate).toLocaleDateString() }}</span
              >
              <span
                v-if="item.UrlDocument"
                class="text-xs text-blue-600 font-bold italic"
                >Archivo adjunto disponible</span
              >
            </div>
          </div>
        </div>

        <div class="flex gap-3 ml-6">
          <button
            @click="openEditModal(item)"
            class="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 rounded-lg flex items-center justify-center transition"
          >
            <img :src="EditPencilIcon" class="w-5 h-5" />
          </button>
          <button
            @click="handleToggleStatus(item.Id)"
            class="w-10 h-10 rounded-lg flex items-center justify-center transition"
            :class="
              item.IsActive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            "
          >
            <img :src="TrashIcon" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-10 text-gray-500">
      No hay formatos registrados.
    </div>

    <BaseModal
      :show="isModalOpen"
      title="Gestionar Formato"
      size="2xl"
      :mode="modalMode"
      @close="isModalOpen = false"
      @confirm="handleConfirm"
    >
      <div class="flex flex-col gap-5">
        <BaseInput
          id="title"
          label="Nombre del formato"
          v-model="form.Titule"
          placeholder="Ej: Solicitud de Beca"
        />

        <div class="flex flex-col w-full">
          <label class="text-sm font-semibold text-gray-700 mb-2"
            >Descripción (Opcional)</label
          >
          <textarea
            v-model="form.Description"
            class="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#00A896] min-h-[100px]"
            placeholder="Breve detalle del documento..."
          ></textarea>
        </div>

        <div
          class="flex flex-col w-full p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
        >
          <label class="text-sm font-bold text-gray-700 mb-2"
            >Archivo del Formato (PDF, DOCX)</label
          >
          <input
            type="file"
            @change="handleFileChange"
            accept=".pdf,.doc,.docx"
            class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
          <p
            v-if="modalMode === 'edit' && form.UrlDocument"
            class="text-xs text-orange-600 mt-2"
          >
            * Ya existe un archivo. Sube uno nuevo solo si deseas reemplazarlo.
          </p>
        </div>
      </div>
    </BaseModal>
  </div>
</template>