<script setup lang="ts">
import { ref, computed } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import BaseModal from "@/components/elements/BaseModal.vue";
import ConfirmDelete from "@/components/elements/ConfirmDeleteModal.vue";
import ImagesIcon from "@/assets/icons/Image.svg";

export interface ImageItem {
  src: string;
  name: string;
}

const props = defineProps<{
  title: string;
  images: ImageItem[];
  maxImages?: number;
  description?: string;
  layout?: "grid" | "list";
  keepSlots?: boolean;
  fixedSlots?: boolean;
  slotLabels?: string[];
  variant?: "default" | "banner";
}>();

const emit = defineEmits<{
  (e: "update:images", value: ImageItem[]): void;
}>();

const isList = computed(() => props.layout === "list");
const maxImages = computed(() => props.maxImages ?? Infinity);
const keepSlots = computed(() => props.keepSlots ?? false);
const fixedSlots = computed(() => props.fixedSlots ?? false);
const isBannerVariant = computed(() => props.variant === "banner");

/* =======================
   MODALES
======================= */
const isUploadModalOpen = ref(false);
const isPreviewModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const editingIndex = ref<number | null>(null);
const previewImage = ref<ImageItem | null>(null);
const pendingDeleteIndex = ref<number | null>(null);

/* =======================
   FUNCIONES AUXILIARES
======================= */
const getSlotLabel = (index: number): string => {
  if (props.slotLabels && props.slotLabels[index]) {
    return props.slotLabels[index];
  }
  return `Especialidad ${index + 1}`;
};

const getDisplayName = (
  image: ImageItem | undefined,
  index: number,
): string => {
  if (!image || !image.src) {
    return getSlotLabel(index);
  }
  return image.name || getSlotLabel(index);
};

const hasImage = (index: number): boolean => {
  return Boolean(props.images[index]?.src);
};

/* =======================
   ACCIONES
======================= */
const openAddModal = () => {
  editingIndex.value = null;
  isUploadModalOpen.value = true;
};

const openEditModal = (index: number) => {
  editingIndex.value = index;
  isUploadModalOpen.value = true;
};

const openPreview = (image: ImageItem) => {
  previewImage.value = image;
  isPreviewModalOpen.value = true;
};

const handlePreviewClick = (index: number) => {
  const image = props.images[index];
  if (hasImage(index) && image) {
    openPreview(image);
  }
};

const askDelete = (index: number) => {
  pendingDeleteIndex.value = index;
  isDeleteModalOpen.value = true;
};

const confirmDelete = () => {
  if (pendingDeleteIndex.value === null) return;

  const updated = [...props.images];

  if (fixedSlots.value) {
    // Para slots fijos: solo borra la imagen pero mantiene el slot vacío
    updated[pendingDeleteIndex.value] = {
      src: "",
      name: getSlotLabel(pendingDeleteIndex.value),
    };
  } else {
    // Comportamiento normal: elimina el elemento
    updated.splice(pendingDeleteIndex.value, 1);
  }

  emit("update:images", updated);

  pendingDeleteIndex.value = null;
  isDeleteModalOpen.value = false;
};

/* ==UPLOAD== */
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.[0]) return;

  const file = input.files[0];
  if (!file.type.startsWith("image/")) return;

  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
};

const handleConfirm = () => {
  if (!previewUrl.value) return;

  const image: ImageItem = {
    src: previewUrl.value,
    name: selectedFile.value?.name || getSlotLabel(editingIndex.value || 0),
  };

  const updated = [...props.images];

  if (editingIndex.value !== null) {
    updated[editingIndex.value] = image;
  } else {
    updated.push(image);
  }

  emit("update:images", updated);

  selectedFile.value = null;
  previewUrl.value = null;
  editingIndex.value = null;
  isUploadModalOpen.value = false;
};
</script>
<template>
  <section
    class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-6 w-full"
  >
    <!-- HEADER -->
    <header class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img :src="ImagesIcon" class="w-6 h-6" />
        <div>
          <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
          <p v-if="description" class="text-sm text-gray-500 mt-1">
            {{ description }}
          </p>
        </div>
      </div>

      <BaseButton
        v-if="images.length < maxImages && !fixedSlots"
        :text="
          isBannerVariant && images.length === 0
            ? '+ Añadir imagen'
            : '+ Cambiar imagen'
        "
        customClass="bg-[#1226AB] px-4 py-2"
        @click="openAddModal"
      />
    </header>

    <div v-if="isBannerVariant" class="space-y-4">
      <div
        v-if="images.length === 0"
        class="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl"
      >
        <p class="text-gray-500 mb-3">No hay imagen cargada</p>
      </div>

      <div
        v-else
        v-for="(image, index) in images"
        :key="index"
        class="space-y-4"
      >
        <!-- IMAGEN GRANDE -->
        <div
          class="w-full aspect-[12/4] rounded-xl bg-gray-100 overflow-hidden cursor-pointer border border-gray-200"
          @click="handlePreviewClick(index)"
        >
          <img
            :src="image.src"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <!-- INFORMACIÓN DE LA IMAGEN -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-gray-800">{{ image.name }}</h3>
            <div class="flex gap-2">
              <BaseButton
                text="Cambiar"
                customClass="bg-[#1226AB] px-4 py-2 text-sm"
                @click="openEditModal(index)"
              />
              <BaseButton
                text="Eliminar"
                customClass="bg-red-600 px-4 py-2 text-sm"
                @click="askDelete(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- =GRID (ESPECIALIDADES CON SLOTS FIJOS)= -->
    <div
      v-else-if="!isList && fixedSlots"
      class="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      <div
        v-for="(_, index) in maxImages"
        :key="index"
        class="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 items-center text-center"
      >
        <div
          class="w-full aspect-[4/3] rounded-lg bg-gray-200 overflow-hidden flex items-center justify-center cursor-pointer"
          @click="handlePreviewClick(index)"
        >
          <img
            v-if="hasImage(index)"
            :src="images[index]?.src"
            class="w-full h-full object-cover"
          />
          <p v-else class="text-xs text-gray-500 px-2">
            No hay una imagen disponible.<br />
            Por favor carga una.
          </p>
        </div>

        <p class="text-sm font-medium text-gray-700 min-h-[1.5rem]">
          {{ getDisplayName(images[index], index) }}
        </p>

        <div class="flex gap-2">
          <BaseButton
            text="Cambiar"
            customClass="bg-[#1226AB] px-3 py-1.5 text-xs"
            @click="openEditModal(index)"
          />
          <BaseButton
            v-if="hasImage(index)"
            text="Eliminar"
            customClass="bg-red-600 px-3 py-1.5 text-xs"
            @click="askDelete(index)"
          />
        </div>
      </div>
    </div>

    <!-- === GRID (SLOTS DINÁMICOS) === -->
    <div
      v-else-if="!isList && keepSlots"
      class="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      <div
        v-for="(_, index) in maxImages"
        :key="index"
        class="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 items-center text-center"
      >
        <div
          class="w-full aspect-[4/3] rounded-lg bg-gray-200 overflow-hidden flex items-center justify-center cursor-pointer"
          @click="images[index] && openPreview(images[index]!)"
        >
          <img
            v-if="images[index]"
            :src="images[index].src"
            class="w-full h-full object-cover"
          />
          <p v-else class="text-xs text-gray-500 px-2">
            No hay una imagen disponible.<br />
            Por favor carga una.
          </p>
        </div>

        <p class="text-sm font-medium text-gray-700 min-h-[1.5rem]">
          {{ images[index]?.name ?? getSlotLabel(index) }}
        </p>

        <div class="flex gap-2">
          <BaseButton
            text="Cambiar"
            customClass="bg-[#1226AB] px-3 py-1.5 text-xs"
            @click="openEditModal(index)"
          />
          <BaseButton
            v-if="images[index]"
            text="Eliminar"
            customClass="bg-red-600 px-3 py-1.5 text-xs"
            @click="askDelete(index)"
          />
        </div>
      </div>
    </div>

    <!-- ==== LISTA (COMPORTAMIENTO POR DEFECTO) === -->
    <div v-else class="flex flex-col divide-y divide-gray-200">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="flex items-center gap-4 py-3"
      >
        <div
          class="w-40 h-24 rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
          @click="openPreview(image)"
        >
          <img :src="image.src" class="w-full h-full object-cover" />
        </div>

        <p class="flex-1 text-sm font-medium text-gray-800">
          {{ image.name }}
        </p>

        <div class="flex gap-2">
          <BaseButton
            text="Cambiar"
            customClass="bg-[#1226AB] px-3 py-1.5 text-sm"
            @click="openEditModal(index)"
          />
          <BaseButton
            text="Eliminar"
            customClass="bg-red-600 px-3 py-1.5 text-sm"
            @click="askDelete(index)"
          />
        </div>
      </div>

      <p v-if="!images.length" class="text-center text-gray-500 py-6 text-sm">
        No hay imágenes disponibles.
      </p>
    </div>

    <!-- MODAL UPLOAD -->
    <BaseModal
      :show="isUploadModalOpen"
      :title="editingIndex !== null ? 'Cambiar imagen' : 'Subir imagen'"
      :mode="editingIndex !== null ? 'edit' : 'create'"
      size="md"
      @close="isUploadModalOpen = false"
      @confirm="handleConfirm"
    >
      <div
        class="rounded-xl p-6 bg-gray-50 text-center cursor-pointer border-dashed border-2 border-gray-300 hover:border-[#1226AB] transition"
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
          class="w-full h-48 object-cover rounded-lg"
        />

        <div v-if="!previewUrl" class="flex flex-col items-center gap-2">
          <p class="text-gray-600 font-medium">
            Arrastra una imagen aquí o haz clic para seleccionar
          </p>
          <p class="text-sm text-gray-400">
            Formatos permitidos: JPG, PNG, WEBP
          </p>
        </div>
      </div>

      <!-- Muestra el nombre del slot cuando está editando -->
      <div
        v-if="editingIndex !== null && slotLabels?.[editingIndex]"
        class="mt-4 text-center"
      >
        <p class="text-sm text-gray-600">
          Slot:
          <span class="font-semibold">{{ slotLabels[editingIndex] }}</span>
        </p>
      </div>
    </BaseModal>

    <!-- MODAL PREVIEW -->
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
            :src="previewImage.src"
            :alt="previewImage.name"
            class="max-w-full max-h-[70vh] object-contain"
            style="max-height: 70vh"
          />
        </div>

        <!-- Información de la imagen -->
        <div
          v-if="previewImage"
          class="mt-4 text-center w-full bg-gray-50 p-3 rounded-lg"
        >
          <p class="font-medium text-gray-800">{{ previewImage.name }}</p>
          <p class="text-sm text-gray-600 mt-1">
            Haz clic fuera de la imagen o presiona "Aceptar" para salir
          </p>
        </div>
      </div>
    </BaseModal>

    <ConfirmDelete
      :show="isDeleteModalOpen"
      elementName="esta imagen"
      @close="isDeleteModalOpen = false"
      @confirm="confirmDelete"
    />
  </section>
</template>