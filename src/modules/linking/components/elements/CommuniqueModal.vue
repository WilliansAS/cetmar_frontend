<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl animate-fadeIn">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        {{ data ? "Editar comunicado" : "Añadir comunicado" }}
      </h2>

      <!-- Campos -->
      <div class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium mb-1">Ingresa el título:</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Título del comunicado"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1226AB] outline-none"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Ingresa una descripción:</label>
          <textarea
            v-model="form.description"
            placeholder="Descripción del comunicado"
            rows="3"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1226AB] outline-none resize-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Seleccionar especialidad:</label>
          <BaseSelect
            v-model="form.specialty"
            :options="specialties"
            placeholder="Selecciona una especialidad"
            selectClass="text-black"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Establece una fecha límite:</label>
          <div class="flex items-center gap-3">
            <input
              v-model="form.limitDate"
              type="date"
              :disabled="form.indefinite"
              class="border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1226AB] outline-none text-black"
            />
            <label class="flex items-center gap-2">
              <input v-model="form.indefinite" type="checkbox" class="rounded focus:ring-[#1226AB]" />
              <span class="text-gray-700 text-sm">Dejar fecha indefinida</span>
            </label>
          </div>
        </div>

        <!-- Archivo -->
        <div
          class="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#1226AB] transition"
          @click="triggerFileInput"
        >
          <img :src="UploadIcon" alt="upload" class="w-10 h-10 mb-2" />
          <p class="text-gray-600 font-medium">
            {{ selectedFileName || "Selecciona un archivo" }}
          </p>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            @change="handleFileChange"
          />
        </div>
      </div>

      <!-- Botones -->
      <div class="flex justify-end gap-3 mt-6">
        <BaseButton
          text="Cancelar"
          customClass="bg-gray-400 text-gray-800 hover:brightness-95"
          @click="handleCancel"
        />
        <BaseButton text="Guardar" customClass="bg-[#1226AB]" @click="save" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import BaseSelect from "@/components/elements/BaseSelect.vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import UploadIcon from "@/assets/icons/Upload.svg";

const props = defineProps({
  visible: { type: Boolean, default: false },
  data: { type: Object as any, default: null },
});

const emit = defineEmits(["close", "save"]);

const specialties = [
  { label: "Vida Saludable", value: "Vida Saludable" },
  { label: "Servicios de Hospedaje", value: "Servicios de Hospedaje" },
  { label: "Laboratorio Ambiental", value: "Laboratorio Ambiental" },
  { label: "Sistemas de Información Geográfica", value: "Sistemas de Información Geográfica" },
  { label: "General", value: "General" },
];

const form = reactive({
  title: "",
  description: "",
  specialty: "",
  limitDate: "",
  indefinite: false,
  file: "",
});

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFileName = ref("");

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible) {
      if (props.data) {
        //Aqui pasamos los datos de edicion 
        Object.assign(form, {
          title: props.data.title || "",
          description: props.data.description || "",
          specialty: props.data.specialty || "",
          limitDate: props.data.limitDate || "",
          indefinite: props.data.indefinite || false,
          file: props.data.file || "",
        });
        selectedFileName.value = props.data.file ? "Archivo cargado" : "";
      } else {
        resetForm();
      }
    }
  }
);

const triggerFileInput = () => fileInput.value?.click();

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    selectedFileName.value = file.name;
    const reader = new FileReader();
    reader.onload = () => (form.file = reader.result as string);
    reader.readAsDataURL(file);
  }
};

const resetForm = () => {
  form.title = "";
  form.description = "";
  form.specialty = "";
  form.limitDate = "";
  form.indefinite = false;
  form.file = "";
  selectedFileName.value = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const handleCancel = () => {
  resetForm();
  emit("close");
};

const save = () => {
  if (!form.title.trim() || !form.description.trim()) return;
  
  const saveData = {
    title: form.title.trim(),
    description: form.description.trim(),
    specialty: form.specialty,
    limitDate: form.indefinite ? null : form.limitDate,
    indefinite: form.indefinite,
    file: form.file,
  };
  
  emit("save", saveData);
  resetForm();
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>