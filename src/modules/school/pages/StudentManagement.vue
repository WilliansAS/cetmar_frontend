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
            text="Formato"
            customClass="bg-green-500 hover:bg-green-600"
            icon="/images/ico-download.svg"
          />
          <BaseButton
            text="Nuevo estudiante"
            customClass="bg-blue-400 hover:bg-blue-500"
            :icon="PlusIcon"
          />
          <BaseButton
            text="Registrar estudiantes"
            customClass="bg-blue-700 hover:bg-blue-800"
            :icon="PlusIcon"
            @click="openFileDialog"
          />
          <input
            ref="fileInput"
            type="file"
            accept=".csv"
            class="hidden"
            @change="onFileSelected"
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

const studentsStore = useStudentsStore();

const fileInput = ref<HTMLInputElement | null>(null);

function openFileDialog() {
  fileInput.value?.click();
}

async function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  try {
    await studentsStore.importCSV(file);
    console.log("Importación completada");
  } catch (error) {
    console.error("Error importando CSV:", error);
  } finally {
    input.value = "";
  }
}

const columns = [
  { label: "Nombre", field: "nombre" },
  { label: "Correo", field: "email" },
  { label: "Matrícula", field: "matricula" },
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
  console.log("Eliminar:", row);
}
</script>
