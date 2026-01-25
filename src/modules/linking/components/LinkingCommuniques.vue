<template>
  <div
    class="bg-white shadow-md rounded-2xl p-6 w-full lg:w-[100%] flex flex-col"
  >
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <img :src="MegaphoneIcon" class="w-6 h-6" />
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
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex justify-between items-start hover:shadow-md transition relative overflow-hidden"
      >
        <div class="absolute left-0 top-0 bottom-0 w-2 bg-[#4763E4]" />

        <!-- Contenido -->
        <div class="flex items-start gap-3 flex-1 min-w-0 pl-4">
          <div class="w-2 h-2 bg-[#4763E4] rounded-full mt-2"></div>

          <div class="min-w-0 flex-1">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {{ item.title }}
            </h3>
            <p class="text-gray-600 text-sm mt-1 line-clamp-2">
              {{ item.description }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              {{ item.indefinite
                ? "Sin fecha límite"
                : `Fecha límite: ${item.limitDate}` }}
            </p>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex gap-3 ml-6 flex-shrink-0">
          <button
            @click="openEditModal(item, index)"
            class="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 rounded-lg flex items-center justify-center transition"
            title="Editar"
          >
            <img :src="EditPencilIcon" class="w-5 h-5" />
          </button>

          <button
            @click="removeCommunique(index)"
            class="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center transition"
            title="Eliminar"
          >
            <img :src="TrashIcon" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500 text-center mt-6">
      No hay comunicados disponibles
    </p>

    <!-- Modal -->
    <BaseModal
      :show="isModalOpen"
      title="Comunicado"
      size="2xl"
      :mode="modalMode"
      @close="isModalOpen = false"
      @confirm="handleConfirm"
    >
      <div class="flex flex-col gap-4">
        <input
          v-model="form.title"
          placeholder="Título del comunicado"
          class="border rounded-md px-3 py-2"
        />
        <textarea
          v-model="form.description"
          placeholder="Descripción"
          rows="4"
          class="border rounded-md px-3 py-2"
        />
        <input
          v-if="!form.indefinite"
          type="date"
          v-model="form.limitDate"
          class="border rounded-md px-3 py-2"
        />
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" v-model="form.indefinite" />
          Sin fecha límite
        </label>
      </div>
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import BaseModal from "@/components/elements/BaseModal.vue";
import MegaphoneIcon from "@/assets/icons/Megaphone.svg";
import TrashIcon from "@/assets/icons/Trash.svg";
import EditPencilIcon from "@/assets/icons/EditPencil.svg";

interface Communique {
  title: string;
  description: string;
  limitDate: string | null;
  indefinite: boolean;
}

const communiques = ref<Communique[]>([
  {
    title: "Boletas del Primer Parcial Disponibles",
    description:
      "Las boletas de calificaciones del primer parcial ya están disponibles para descarga en el sistema escolar.",
    limitDate: "2025-03-20",
    indefinite: false,
  },
  {
    title: "Suspensión de clases por Consejo Técnico",
    description:
      "El día viernes no habrá clases debido a la sesión del Consejo Técnico Escolar.",
    limitDate: null,
    indefinite: true,
  },
  {
    title: "Entrega de documentación para estadías",
    description:
      "Los alumnos deberán entregar su documentación completa antes de la fecha límite establecida.",
    limitDate: "2025-04-05",
    indefinite: false,
  },
]);

const isModalOpen = ref(false);
const editingIndex = ref<number | null>(null);

const form = ref<Communique>({
  title: "",
  description: "",
  limitDate: null,
  indefinite: false,
});

const modalMode = computed(() =>
  editingIndex.value !== null ? "edit" : "create"
);

const openAddModal = () => {
  editingIndex.value = null;
  form.value = {
    title: "",
    description: "",
    limitDate: null,
    indefinite: false,
  };
  isModalOpen.value = true;
};

const openEditModal = (item: Communique, index: number) => {
  editingIndex.value = index;
  form.value = { ...item };
  isModalOpen.value = true;
};

const handleConfirm = () => {
  if (editingIndex.value !== null) {
    communiques.value[editingIndex.value] = { ...form.value };
  } else {
    communiques.value.push({ ...form.value });
  }
  isModalOpen.value = false;
};

const removeCommunique = (index: number) => {
  communiques.value.splice(index, 1);
};
</script>
