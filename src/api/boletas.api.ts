import { apiRequest } from "../utils/httpClient";
import type { BoletaData } from "@/interfaces/IBoleta";

/**
 * Servicio para subir un archivo de boleta.
 * El servidor procesa el archivo y retorna los datos extraídos en formato JSON.
 */
export async function subirBoletaService(files: File[]): Promise<BoletaData[]> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  return await apiRequest<BoletaData[]>("/report_card/parse_many", {
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
