import { apiRequest } from "../utils/httpClient";
import type { BoletaData } from "@/interfaces/IBoleta";

/**
 * Servicio para subir un archivo de boleta.
 * El servidor procesa el archivo y retorna los datos extraídos en formato JSON.
 */
export async function subirBoletaService(file: File): Promise<BoletaData> {
  const formData = new FormData();
  formData.append("file", file);

  return await apiRequest<BoletaData>("/report_card/parse_many", {
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
