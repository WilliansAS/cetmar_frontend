import { apiRequest } from "../utils/httpClient";

export interface Uac {
  plantel: string;
  tipo_uac: string;
  clave_uac: string;
  semestre: number;
  nombre: string;
  calif: number;
  horas_sem: number;
  creditos: number;
  periodo: string;
}

export interface BoletaData {
  curp: string;
  alumno: string;
  numero_control: string;
  plan_estudios: string;
  carrera: string;
  avance_oblig: number;
  avance_opt: number;
  avance_total: number;
  promedio: number;
  uac: Uac[];
}

/**
 * Servicio para subir un archivo de boleta.
 * El servidor procesa el archivo y retorna los datos extraídos en formato JSON.
 */
export async function subirBoletaService(file: File): Promise<BoletaData> {
  const formData = new FormData();
  formData.append("file", file);

  return await apiRequest<BoletaData>("/report_card/parse", {
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
