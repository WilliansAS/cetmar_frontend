<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import LinkingImages from "@/modules/linking/components/LinkingImages.vue";
import SpecialtyActivities from "@/modules/linking/components/SpecialtyActivities.vue";

import { hospedaje } from "@/modules/linking/data/specialties/hospedaje";
import { laboratorio } from "@/modules/linking/data/specialties/laboratorio";
import { sig } from "@/modules/linking/data/specialties/sig";
import { vidaSaludable } from "@/modules/linking/data/specialties/vidaSaludable";

import type {
  SpecialtyData,
  SpecialtyImage,
  SpecialtyActivity,
} from "@/modules/linking/data/specialties/hospedaje";

const route = useRoute();

/* -----------------------------
   Especialidades disponibles
-------------------------------- */
const specialtiesMap: Record<string, SpecialtyData> = {
  hospedaje: hospedaje,
  "vida-saludable": vidaSaludable,
  ambiental: laboratorio,
  sig: sig,
};


const specialty = computed(() => {
  return specialtiesMap[route.params.slug as string];
});

/* -----------------------------
   Banner (estado editable)
-------------------------------- */
const bannerImages = ref<SpecialtyImage[]>([]);

/* -----------------------------
   Actividades (estado editable)
-------------------------------- */
const activities = ref<SpecialtyActivity[]>([]);

/* -----------------------------
   Sincronización al cambiar slug
-------------------------------- */
watch(
  specialty,
  (newVal) => {
    if (!newVal) return;

    bannerImages.value = [...newVal.banner];
    activities.value = [...newVal.activities];
  },
  { immediate: true },
);
</script>

<template>
    <div v-if="specialty" class="flex flex-col w-full p-6 gap-8">
      <!-- ================= HEADER ================= -->
      <div>
        <h1 class="text-3xl font-semibold text-gray-900">
          Contenido: {{ specialty.title }}
        </h1>
        <p class="text-gray-500 text-base font-medium mt-1">
          Gestiona el contenido visual y las actividades correspondientes a esta especialidad
        </p>
      </div>

      <!-- ================= BANNER ================= -->
      <section>
        <LinkingImages
          title="Banner de la especialidad"
          :images="bannerImages"
          :maxImages="1"
          galleryMode
          description="Imagen principal que representa la especialidad en la página de detalle."
          @update:images="bannerImages = $event"
        />
      </section>

      <!-- ================= ACTIVIDADES ================= -->
      <section class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900">
            Actividades de la especialidad
          </h2>

          <span class="text-sm text-gray-500">
            Total: {{ activities.length }}
          </span>
        </div>

        <SpecialtyActivities
          v-model:activities="activities"
        />
      </section>
    </div>

    <!-- ================= FALLBACK ================= -->
    <div v-else class="p-6 text-gray-500">
      Especialidad no encontrada
    </div>
</template>
