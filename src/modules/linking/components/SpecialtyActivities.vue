<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import BaseModal from "@/components/elements/BaseModal.vue";

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
}

const props = defineProps<{
  activities: Activity[];
}>();

const emit = defineEmits<{
  (e: "update:activities", value: Activity[]): void;
}>();

/* ---------------- Estado ---------------- */
const showModal = ref(false);
const mode = ref<"create" | "edit">("create");
const editingIndex = ref<number | null>(null);

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

const removeActivity = (index: number) => {
  const updated = [...props.activities];
  updated.splice(index, 1);
  emit("update:activities", updated);
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

  if (mode.value === "create") {
    updated.push({
      ...form.value,
      id: crypto.randomUUID(),
    });
  } else if (mode.value === "edit" && editingIndex.value !== null) {
    updated[editingIndex.value] = { ...form.value };
  }

  emit("update:activities", updated);
  showModal.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-500 text-sm">
          Gestiona las actividades de la especialidad
        </p>
      </div>

      <BaseButton
        text="+ Añadir actividad"
        customClass="bg-[#1226AB] px-4 py-2"
        @click="openCreate"
      />
    </div>

    <!-- Lista -->
    <div v-if="props.activities.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(activity, index) in props.activities"
        :key="activity.id"
        class="bg-white rounded-xl shadow p-4 flex flex-col gap-4"
      >
        <img
          :src="activity.image"
          class="w-full h-80 object-cover rounded-lg"
        />

        <div>
          <h3 class="font-semibold text-lg">
            {{ activity.title }}
          </h3>
          <p class="text-gray-600 text-sm">
            {{ activity.description }}
          </p>
        </div>

        <div class="flex gap-3 mt-auto">
          <BaseButton
            text="Editar"
            customClass="bg-[#1226AB] px-3 py-2"
            @click="openEdit(activity, index)"
          />
          <BaseButton
            text="Eliminar"
            customClass="bg-red-600 px-3 py-2"
            @click="removeActivity(index)"
          />
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500 text-sm">
      No hay actividades registradas
    </p>

    <!-- Modal -->
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
            class="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>

        <!-- Descripción -->
        <div>
          <label class="font-semibold text-sm">Descripción</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>
      </div>
    </BaseModal>
  </div>
</template>
