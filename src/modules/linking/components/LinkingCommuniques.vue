<template>
  <div
    class="bg-white shadow-md rounded-2xl p-5 w-full md:w-[48%] flex flex-col"
  >
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <img :src="MegaphoneIcon" alt="comunicados" class="w-6 h-6" />
        <h2 class="text-lg font-semibold text-gray-900">Comunicados</h2>
      </div>

      <BaseButton
        text="+ Añadir comunicado"
        customClass="bg-[#1226AB] px-4 py-2"
        @click="openAddModal"
      />
    </div>

    <!-- Lista -->
    <div v-if="communiques.length" class="flex flex-col gap-4">
      <div
        v-for="(item, index) in communiques"
        :key="index"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-start hover:shadow-md transition relative overflow-hidden"
      >
        <div class="absolute left-0 top-0 bottom-0 w-2 bg-[#4763E4]"></div>

        <!-- Contenido del comunicado -->
        <div class="flex items-start gap-3 flex-1 min-w-0 pl-3">
          <div class="flex-shrink-0"></div>
            <div class="w-2 h-2 bg-[#4763E4] rounded-full mt-2"></div>

          <div class="min-w-0 flex-1">
            <h3
              class="text-lg font-semibold text-gray-900 truncate"
              :title="item.title"
            >
              {{ item.title }}
            </h3>
            <p class="text-gray-600 text-sm mt-1 line-clamp-2">
              {{ item.description }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              Especialidad:
              <span class="font-medium">{{ item.specialty || "General" }}</span>
              <span v-if="item.limitDate">
                • Fecha límite: {{ item.limitDate }}</span
              >
              <span v-else> • Sin fecha límite</span>
            </p>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex gap-2 ml-4 flex-shrink-0">
          <button
            @click="removeCommunique(index)"
            class="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition duration-200 flex items-center justify-center"
            title="Eliminar"
          >
            <img :src="TrashIcon" alt="Eliminar" class="w-4 h-4" />
          </button>
          <button
            @click="openEditModal(item, index)"
            class="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-lg transition duration-200 flex items-center justify-center"
            title="Editar"
          >
            <img :src="EditPencilIcon" alt="Editar" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500 text-center mt-6">
      No hay comunicados disponibles
    </p>

    <!-- Modal -->
    <CommuniqueModal
      :visible="isModalOpen"
      :data="selectedCommunique"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import CommuniqueModal from "./elements/CommuniqueModal.vue";
import MegaphoneIcon from "@/assets/icons/Megaphone.svg";
import TrashIcon from "@/assets/icons/Trash.svg";
import EditPencilIcon from "@/assets/icons/EditPencil.svg";

interface Communique {
  title: string;
  description: string;
  specialty: string;
  limitDate: string | null;
  indefinite: boolean;
  file?: string;
}

const communiques = ref<Communique[]>([
  {
    title: "Boletas del Primer Parcial Disponibles",
    description:
      "Las boletas de calificaciones del primer parcial ya están disponibles para descarga en el sistema escolar.",
    specialty: "General",
    limitDate: "2025-03-20",
    indefinite: false,
  },
  {
    title: "Inscripciones de nuevo ingreso",
    description:
      "Las inscripciones de los estudiantes de nuevo ingreso se llevarán a cabo del 20 al 25 de marzo de 2025.",
    specialty: "Administración",
    limitDate: null,
    indefinite: true,
  },
]);

const isModalOpen = ref(false);
const selectedCommunique = ref<Communique | null>(null);
const editingIndex = ref<number | null>(null);

const openAddModal = () => {
  selectedCommunique.value = null;
  editingIndex.value = null;
  isModalOpen.value = true;
};

const openEditModal = (item: Communique, index: number) => {
  selectedCommunique.value = { ...item };
  editingIndex.value = index;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCommunique.value = null;
  editingIndex.value = null;
};

const handleSave = (data: Communique) => {
  if (editingIndex.value !== null) {
    communiques.value[editingIndex.value] = data;
  } else {
    communiques.value.push(data);
  }
  closeModal();
};

const removeCommunique = (index: number) => {
  communiques.value.splice(index, 1);
};
</script>
