import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAllStudents,
  updateStudent,
  importStudentsCSV,
} from "@/api/students.api";
import type { User } from "@/interfaces/IUser";
import type { Student } from "@/interfaces/IStudent";

export const useStudentsStore = defineStore("students", () => {
  const students = ref<Student[]>([]);
  const error = ref("");

  // Obtener todos los estudiantes
  async function fetchStudents() {
    try {
      error.value = "";
      const data = await getAllStudents();
      students.value = data;
    } catch (err: any) {
      error.value = err.message || "Error al obtener estudiantes";
    }
  }

  // Editar estudiante
  async function editStudent(id: number, payload: User) {
    try {
      error.value = "";
      const updatedStudent = await updateStudent(id, payload);

      // Actualizar en lista local
      const index = students.value.findIndex((s) => s.Id === id);
      if (index !== -1) {
        students.value[index] = updatedStudent;
      }

      return updatedStudent;
    } catch (err: any) {
      error.value = err.message || "Error al editar estudiante";
      throw err;
    }
  }

  // Importar CSV
  async function importCSV(file: File) {
    try {
      error.value = "";
      const response = await importStudentsCSV(file);
      // Actualizar lista tras importar
      await fetchStudents();

      return response;
    } catch (err: any) {
      error.value = err.message || "Error al importar estudiantes desde CSV";
      throw err;
    }
  }

  return {
    students,
    error,
    fetchStudents,
    editStudent,
    importCSV,
  };
});
