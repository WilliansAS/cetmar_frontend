<script setup lang="ts">
import { computed } from "vue";

interface Props {
  show: boolean;
  title: string;
  mode?: "create" | "edit" | "view"; // Prop para detectar el modo (opcional, por defecto 'create')
}

// Valores por defecto
const props = withDefaults(defineProps<Props>(), {
  mode: "create",
});

// Definición de Eventos
const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();

// Computado: Texto del botón basado en el modo
const confirmButtonText = computed(() => {
  if (props.mode === "edit") return "Guardar Cambios";
  if (props.mode === "create") return "Guardar";
  return "Aceptar";
});

// Función para manejar el cierre
const handleClose = () => {
  emit("close");
};

// Función para confirmar
const handleConfirm = () => {
  emit("confirm");
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity"
      @click.self="handleClose"
    >
      <div
        class="bg-white rounded-lg shadow-xl p-4 w-full max-w-md mx-4 transform transition-all flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="px-6 py-4 border-b border-gray-100 flex justify-between items-center"
        >
          <h3 class="text-xl font-semibold text-gray-800">
            {{ title }}
          </h3>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto">
          <slot></slot>
        </div>

        <div
          class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end items-center gap-3"
        >
          <button
            @click="handleClose"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1226AB] cursor-pointer"
          >
            Cancelar
          </button>

          <button
            @click="handleConfirm"
            class="px-4 py-2 text-sm font-medium text-white bg-[#1226AB] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1226AB] disabled:opacity-50 disabled:cursor-not-allowed flex items-center cursor-pointer"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
