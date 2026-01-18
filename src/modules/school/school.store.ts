import { defineStore } from "pinia";
import { ref } from "vue";
import type { BoletaData } from "@/interfaces/IBoleta";
import { subirBoletaService } from "../../api/boletas.api";

export const useBoletaStore = defineStore("boleta", () => {
  const boletasData = ref<BoletaData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Acción para subir la boleta
  const subirBoleta = async (files: File[]) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await subirBoletaService(files);
      console.log("Respuesta del servidor:", response);
      boletasData.value = response;
    } catch (err) {
      console.error("Error al subir la boleta:", err);
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return {
    boletasData,
    loading,
    error,
    subirBoleta,
  };
});
