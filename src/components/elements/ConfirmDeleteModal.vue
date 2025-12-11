<script setup lang="ts">
interface Props {
  show: boolean;
  elementName?: string;
}

// Definimos valores por defecto
withDefaults(defineProps<Props>(), {
  elementName: "este registro", // Texto por defecto si no se pasa nada
});

// Eventos
const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();

// Funciones
const handleClose = () => emit("close");
const handleConfirm = () => emit("confirm");
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity"
      @click.self="handleClose"
    >
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 transform transition-all"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg
              class="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Eliminar Registro
            </h3>

            <div class="mt-2">
              <p class="text-sm text-gray-700">
                ¿Estás seguro de que deseas eliminar
                <strong class="text-gray-700">{{ elementName }}</strong
                >? Esta acción no se puede deshacer.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm cursor-pointer"
            @click="handleConfirm"
          >
            Eliminar
          </button>

          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm cursor-pointer"
            @click="handleClose"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
