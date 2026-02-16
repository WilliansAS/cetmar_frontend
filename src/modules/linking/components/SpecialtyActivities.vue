<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import BaseModal from "@/components/elements/BaseModal.vue";
import ConfirmDelete from "@/components/elements/ConfirmDeleteModal.vue";

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  file?: File;
}

const props = defineProps<{
  activities: Activity[];
}>();

const emit = defineEmits<{
  (e: "update:activities", value: Activity[]): void;
}>();

/* ---------------- Estado ---------------- */
const showModal = ref(false);
const isPreviewModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const mode = ref<"create" | "edit">("create");
const editingIndex = ref<number | null>(null);
const previewImage = ref<string | null>(null);
const pendingDeleteIndex = ref<number | null>(null);

/* ---------------- Form ---------------- */
const form = ref<Activity>({
  id: "",
  title: "",
  description: "",
  image: "",
});

const previewUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

/* ---------------- Helpers ---------------- */
const resetForm = () => {
  form.value = {
    id: "",
    title: "",
    description: "",
    image: "",
  };
  previewUrl.value = null;
  selectedFile.value = null;
  editingIndex.value = null;
};

const openCreate = () => {
  mode.value = "create";
  resetForm();
  showModal.value = true;
};

const openEdit = (activity: Activity, index: number) => {
  mode.value = "edit";
  form.value = { ...activity };
  previewUrl.value = activity.image;
  selectedFile.value = null;
  editingIndex.value = index;
  showModal.value = true;
};

const openPreview = (imageSrc: string) => {
  previewImage.value = imageSrc;
  isPreviewModalOpen.value = true;
};

const askDelete = (index: number) => {
  pendingDeleteIndex.value = index;
  isDeleteModalOpen.value = true;
};

const removeActivity = () => {
  if (pendingDeleteIndex.value === null) return;

  const updated = [...props.activities];
  updated.splice(pendingDeleteIndex.value, 1);
  emit("update:activities", updated);

  pendingDeleteIndex.value = null;
  isDeleteModalOpen.value = false;
};

/* ---------------- Imagen ---------------- */
const handleFile = (file: File) => {
  if (!file.type.startsWith("image/")) return;

  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
  form.value.image = previewUrl.value;
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

/* ---------------- Guardar ---------------- */
const handleConfirm = () => {
  if (!form.value.title || !form.value.description || !form.value.image) return;

  const updated = [...props.activities];
  const newActivity = {
    ...form.value,
    file: selectedFile.value || undefined,
  };

  if (mode.value === "create") {
    updated.push({
      ...newActivity,
      id: crypto.randomUUID(), // Temp ID
    });
  } else if (mode.value === "edit" && editingIndex.value !== null) {
    updated[editingIndex.value] = { ...newActivity };
  }

  emit("update:activities", updated);
  showModal.value = false;
  resetForm();
};
</script>

<template>
  <div class="flex flex-col gap-6 bg-white p-6 rounded-lg shadow">
    <!-- Header -->
    <div class="flex items-center justify-between ">
      <div>
        <p class="text-gray-500 text-sm font-medium">
          Gestiona las actividades de la especialidad
        </p>
      </div>

      <BaseButton
        text="+ Añadir actividad"
        customClass="bg-[#1226AB] px-4 py-2"
        @click="openCreate"
      />
    </div>

    <!-- LISTA DE ACTIVIDADES -->
    <div class="flex flex-col divide-y divide-gray-200">
      <div
        v-for="(activity, index) in props.activities"
        :key="activity.id"
        class="flex items-center gap-4 py-3"
      >
        <!-- Miniatura de la imagen -->
        <div
          class="w-40 h-24 rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
          @click="openPreview(activity.image)"
        >
          <img 
            :src="activity.image" 
            class="w-full h-full object-cover" 
            :alt="activity.title"
          />
        </div>

        <!-- Información de la actividad -->
        <div class="flex-1 flex flex-col gap-1">
          <h3 class="text-sm font-semibold text-gray-900">
            {{ activity.title }}
          </h3>
          <p class="text-sm text-gray-600 line-clamp-2">
            {{ activity.description }}
          </p>
        </div>

        <!-- Botones de acción -->
        <div class="flex gap-2">
          <BaseButton
            text="Editar"
            customClass="bg-[#1226AB] px-3 py-1.5 text-sm"
            @click="openEdit(activity, index)"
          />
          <BaseButton
            text="Eliminar"
            customClass="bg-red-600 px-3 py-1.5 text-sm"
            @click="askDelete(index)"
          />
        </div>
      </div>

      <!-- Mensaje cuando no hay actividades -->
      <p v-if="!props.activities.length" class="text-center text-gray-500 py-6 text-sm">
        No hay actividades registradas
      </p>
    </div>

    <!-- MODAL PARA CREAR/EDITAR ACTIVIDAD -->
    <BaseModal
      :show="showModal"
      :title="mode === 'create' ? 'Nueva actividad' : 'Editar actividad'"
      :mode="mode"
      size="lg"
      @close="showModal = false"
      @confirm="handleConfirm"
    >
      <div class="flex flex-col gap-4">
        <!-- Imagen -->
        <div>
          <label class="font-semibold text-sm">Imagen</label>
          <div
            class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#1226AB] transition mt-2"
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
        </div>

        <!-- Título -->
        <div>
          <label class="font-semibold text-sm">Título</label>
          <input
            v-model="form.title"
            type="text"
            class="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1226AB] focus:border-transparent"
            placeholder="Ej: Taller de primeros auxilios"
          />
        </div>

        <!-- Descripción -->
        <div>
          <label class="font-semibold text-sm">Descripción</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1226AB] focus:border-transparent"
            placeholder="Describe brevemente la actividad..."
          />
        </div>
      </div>
    </BaseModal>

    <!-- MODAL PREVIEW DE IMAGEN -->
    <BaseModal
      :show="isPreviewModalOpen"
      title="Vista Previa de la Imagen"
      mode="view"
      size="2xl"
      @close="isPreviewModalOpen = false"
      @confirm="isPreviewModalOpen = false"
    >
      <div class="flex flex-col items-center justify-center w-full h-full">
        <div
          v-if="previewImage"
          class="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg p-2"
        >
          <img
            :src="previewImage"
            class="max-w-full max-h-[70vh] object-contain"
            style="max-height: 70vh"
          />
        </div>
      </div>
    </BaseModal>

    <!-- MODAL CONFIRM DELETE -->
    <ConfirmDelete
      :show="isDeleteModalOpen"
      elementName="esta actividad"
      @close="isDeleteModalOpen = false"
      @confirm="removeActivity"
    />
  </div>
</template>