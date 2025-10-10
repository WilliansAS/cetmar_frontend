import { defineStore } from "pinia";
import { ref } from "vue";
import type { BoletaData } from "../../api/boletas.api";
import { subirBoletaService } from "../../api/boletas.api";

export const useBoletaStore = defineStore("boleta", () => {
  const boletaData = ref<BoletaData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Acción para subir la boleta
  const subirBoleta = async (file: File) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await subirBoletaService(file);
      console.log("Respuesta del servidor:", response);
      boletaData.value = response;
    } catch (err) {
      console.error("Error al subir la boleta:", err);
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return {
    boletaData,
    loading,
    error,
    subirBoleta,
  };
});
