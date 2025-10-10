<template>
  <div class="overflow-x-auto w-full">
    <table class="min-w-full border-collapse">
      <!-- Encabezado -->
      <thead>
        <tr>
          <th
            v-for="(col, index) in columns"
            :key="index"
            class="px-4 py-2 text-white font-bold text-center whitespace-nowrap"
            :style="headerStyle(index)"
          >
            {{ col.label }}
          </th>

          <!-- Columna de acciones -->
          <th
            v-if="showActions"
            class="px-4 py-2 text-white font-bold text-center whitespace-nowrap"
            :style="headerStyle(columns.length)"
          >
            Acciones
          </th>
        </tr>
      </thead>

      <!-- Cuerpo -->
      <tbody>
        <tr
          v-for="(row, rowIndex) in paginatedData"
          :key="rowIndex"
          class="text-black text-center hover:bg-gray-50 transition-colors"
        >
          <td
            v-for="(col, colIndex) in columns"
            :key="colIndex"
            class="px-4 py-2 border-b border-[#E5E5E5] whitespace-nowrap"
            :class="getCellClass(col, row)"
          >
            <!-- Renderizado dinámico -->
            {{ renderCell(col, row) }}
          </td>

          <!-- Botones de acciones -->
          <td
            v-if="showActions"
            class="px-4 py-2 border-b border-gray-300 flex justify-center gap-2"
          >
            <!-- Botón descargar (opcional) -->
            <button
              v-if="onDownload"
              @click="onDownload(row)"
              class="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"
            >
              <slot name="download-icon">
                <img :src="DownloadIcon" alt="Descargar" class="w-4 h-4" />
              </slot>
            </button>

            <!-- Botón editar -->
            <button
              v-if="onEdit"
              @click="onEdit(row)"
              class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer"
            >
              <slot name="edit-icon">
                <img :src="EditIcon" alt="Editar" class="w-4 h-4" />
              </slot>
            </button>

            <!-- Botón eliminar -->
            <button
              v-if="onDelete"
              @click="onDelete(row)"
              class="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
            >
              <slot name="delete-icon">
                <img :src="TrashIcon" alt="Eliminar" class="w-4 h-4" />
              </slot>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación (opcional) -->
    <div
      v-if="pagination && totalPages > 1"
      class="flex items-center justify-center my-8 gap-3 select-none"
    >
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="font-bold text-black border border-gray-300 rounded-lg px-6 py-2 disabled:opacity-40 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        Anterior
      </button>

      <!-- Páginas -->
      <div class="flex items-center gap-2">
        <button
          v-for="(page, index) in visiblePages"
          :key="index"
          @click="typeof page === 'number' && goToPage(page)"
          class="w-10 h-10 flex items-center justify-center font-semibold rounded-full transition-colors duration-200 cursor-pointer"
          :class="{
            'bg-[#1226AB] text-white': currentPage === page,
            'text-black hover:bg-gray-100': currentPage !== page,
            'cursor-default': page === '...',
          }"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="font-bold text-black border border-gray-300 rounded-lg px-6 py-2 disabled:opacity-40 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import TrashIcon from "@/assets/icons/Trash.svg";
import EditIcon from "@/assets/icons/EditPencil.svg";
import DownloadIcon from "@/assets/icons/Download.svg";

interface Column {
  label: string; // Texto del encabezado
  field?: string; // Propiedad directa o anidada (e.g. "user.nombre")
  render?: (row: any) => string | number; // Función personalizada para renderizar el valor
  className?: string | ((row: any) => string); // Clases dinámicas opcionales
}

interface Props {
  columns: Column[];
  data: Record<string, any>[];
  showActions?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
  onDownload?: (row: Record<string, any>) => void;
}

const props = defineProps<Props>();

// Paginación
const currentPage = ref(1);
const pageSize = computed(() => props.pageSize || 20);

const totalPages = computed(() =>
  Math.ceil((props.data?.length || 0) / pageSize.value)
);

const paginatedData = computed(() => {
  if (!props.pagination) return props.data;
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return props.data?.slice(start, end) ?? [];
});

// Generar rango dinámico de páginas visibles
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2; // Cuántas páginas mostrar antes/después

  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | string)[] = [];

  if (current > 3) {
    pages.push(1);
    if (current > 4) pages.push("...");
  }

  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) {
    if (current < total - 3) pages.push("...");
    pages.push(total);
  }

  return pages;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};

watch(
  () => props.data,
  () => {
    currentPage.value = 1;
  }
);

// Acceder a propiedades anidadas como "user.nombre"
const getNestedValue = (obj: any, path?: string): any => {
  if (!path) return "";
  return path.split(".").reduce((acc, part) => acc?.[part], obj) ?? "";
};

// Renderizado dinámico de celdas
const renderCell = (col: Column, row: any) => {
  if (col.render) return col.render(row);
  return getNestedValue(row, col.field);
};

// Clases dinámicas por fila o estáticas
const getCellClass = (col: Column, row: any) => {
  if (!col.className) return "";
  return typeof col.className === "function"
    ? col.className(row)
    : col.className;
};

// Estilos del encabezado
const headerStyle = (index: number) => {
  // Calcular el índice de la última columna visible
  const lastIndex = props.showActions
    ? props.columns.length // la columna de acciones será la última
    : props.columns.length - 1; // última columna de datos

  return {
    backgroundColor: "#1226AB",
    borderTopLeftRadius: index === 0 ? "0.5rem" : undefined,
    borderTopRightRadius: index === lastIndex ? "0.5rem" : undefined,
  };
};
</script>

<style scoped>
table {
  border-spacing: 0;
}

/* Scroll personalizado */
::-webkit-scrollbar {
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #b3b3b3;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}
</style>
