import { apiRequest } from "@/utils/httpClient";
import type { Student } from "@/interfaces/IStudent";
import type { User } from "@/interfaces/IUser";

// Obtener todos los estudiantes
export function getAllStudents() {
  return apiRequest<Student[]>("/students", {
    method: "GET",
  });
}

// Editar estudiante
export function updateStudent(id: number, payload: User) {
  return apiRequest<User>(`/students/${id}`, {
    method: "PUT",
    data: payload,
  });
}

// Importar CSV de estudiantes
export function importStudentsCSV(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<void>("/students/import_csv", {
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
