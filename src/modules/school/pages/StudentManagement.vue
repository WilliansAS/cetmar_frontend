<template>
  <SchoolLayout>
    <h1 class="text-4xl font-bold">Estudiantes</h1>
    <p class="text-sm font-semibold text-gray-500 mb-6">
      Gestión de estudiantes
    </p>

    <StudentStats />

    <div class="bg-white rounded-lg shadow-md p-6 mt-6">
      <div class="flex justify-between items-center mb-4">
        <div class="text-2xl font-semibold">Todos los estudiantes</div>
        <div class="flex gap-3">
          <BaseButton
            @click="downloadFormat"
            text="Formato"
            customClass="bg-green-500 hover:bg-green-600"
            icon="/images/ico-download.svg"
          />
          <BaseButton
            @click="openAddModal"
            text="Nuevo estudiante"
            customClass="bg-blue-400 hover:bg-blue-500"
            :icon="PlusIcon"
          />
          <BaseButton
            @click="openImportModal"
            text="Registrar estudiantes"
            customClass="bg-blue-700 hover:bg-blue-800"
            :icon="PlusIcon"
          />
        </div>
      </div>

      <StudentFilters
        v-model:filteredData="filteredData"
        :originalData="data"
        class="mb-4"
      />

      <BaseTable
        :columns="columns"
        :data="filteredData"
        :showActions="true"
        :pagination="true"
        :onEdit="onEdit"
        :onDelete="onDelete"
      />
    </div>

    <!--Modales-->
    <ConfirmDeleteModal
      :show="showDeleteModal"
      :element-name="studentToDelete?.nombre"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />

    <AddStudentModal :show="showAddModal" @close="closeAddModal" />
    <ImportStudentModal :show="showImportModal" @close="closeImportModal" />
  </SchoolLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import SchoolLayout from "../components/SchoolLayout.vue";
import StudentStats from "../components/StudentStats.vue";
import StudentFilters from "../components/StudentFilter.vue";
import BaseTable from "@/components/elements/BaseTable.vue";
import BaseButton from "@/components/elements/BaseButton.vue";
import PlusIcon from "@/assets/icons/Plus.svg";
import { useStudentsStore } from "@/store/student.store";
import ConfirmDeleteModal from "@/components/elements/ConfirmDeleteModal.vue";
import AddStudentModal from "../components/AddStudentModal.vue";
import ImportStudentModal from "../components/ImportStudentModal.vue";

const studentsStore = useStudentsStore();

// ESTADOS PARA MODALES
const showDeleteModal = ref(false);
const studentToDelete = ref<any>(null);
const showImportModal = ref(false);
const showAddModal = ref(false);

const columns = [
  { label: "Nombre", field: "nombre" },
  { label: "Correo", field: "email" },
  { label: "No. Control", field: "numero_control" },
  { label: "CURP", field: "curp" },
  { label: "Carrera", field: "carrera" },
  { label: "Grupo", field: "grupo" },
  { label: "Teléfono", field: "telefono" },
];

const data = ref<any[]>([]);
const filteredData = ref<any[]>([]);

// Mapear datos del backend → tabla
function updateTableData() {
  data.value = studentsStore.students.map((s) => ({
    id: s.Id,
    nombre: s.User_Name,
    email: s.User_Email,
    matricula: s.Matricula,
    numero_control: s.Numero_Control,
    curp: s.CURP ?? "—",
    carrera: s.Carrera,
    grupo: s.Grupo ?? "—",
    telefono: s.Telephone ?? "—",
  }));

  filteredData.value = [...data.value];
}

// Cargar datos al iniciar
onMounted(async () => {
  await studentsStore.fetchStudents();
  updateTableData();
});

// Cuando cambie la store, refrescamos tabla
watch(() => studentsStore.students, updateTableData);

function onEdit(row: any) {
  console.log("Editar:", row);
}

function onDelete(row: any) {
  studentToDelete.value = row;
  showDeleteModal.value = true;
}

// Función para cerrar el modal y limpiar selección
function closeDeleteModal() {
  showDeleteModal.value = false;
  studentToDelete.value = null;
}

// Funciones para el modal de registro
const openAddModal = () => {
  showAddModal.value = true;
};

const closeAddModal = () => {
  showAddModal.value = false;
};

// Funciones para el modal de importación (CSV)
const openImportModal = () => {
  showImportModal.value = true;
};

const closeImportModal = () => {
  showImportModal.value = false;
};

// Descargar formato CSV
const downloadFormat = (): void => {
  const FILE_NAME: string = "Alta_Estudiantes.csv";
  const FILE_PATH: string = `/formats/${FILE_NAME}`;

  const anchor: HTMLAnchorElement = document.createElement("a");
  anchor.href = FILE_PATH;

  // Forzamos la descarga con el nombre original
  anchor.setAttribute("download", FILE_NAME);

  // Ejecución de la descarga
  document.body.appendChild(anchor);
  anchor.click();

  document.body.removeChild(anchor);
};

// Eliminar estudiante
async function confirmDelete() {
  if (!studentToDelete.value) return;

  try {
    console.log(
      "Eliminando estudiante:",
      studentToDelete.value.nombre,
      "con ID:",
      studentToDelete.value.id,
    );
  } catch (error) {
    console.error("Error al eliminar:", error);
  } finally {
    closeDeleteModal();
  }
}
</script>