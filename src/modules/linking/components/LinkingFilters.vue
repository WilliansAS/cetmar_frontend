<template>
  <div class="flex items-center gap-7 flex-wrap justify-end">
    <BaseSelect
      id="sectionSelect"
      v-model="selectedSection"
      :options="sectionOptions"
      placeholder="-- Selecciona una sección --"
      selectClass="min-w-[160px]"
    />

    <BaseSelect
      id="specialtySelect"
      v-model="selectedSpecialty"
      :options="specialtyOptions"
      placeholder="-- Selecciona una especialidad --"
      selectClass="min-w-[220px]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseSelect from "@/components/elements/BaseSelect.vue";

const emit = defineEmits(["update:section", "update:specialty"]);

const selectedSection = ref("");
const selectedSpecialty = ref("");

const sectionOptions = [
  { label: "Resumen", value: "1" },
  { label: "Introducción", value: "2" },
  { label: "Desarrollo de actividades", value: "3" },
  { label: "Conclusión", value: "4" },
];

const specialtyOptions = [
  { label: "Vida Saludable", value: "1" },
  { label: "Servicios de Hospedaje", value: "2" },
  { label: "Laboratorio Ambiental", value: "3" },
  { label: "Sistemas de Información Geográfica", value: "4" },
];

watch(selectedSection, (val) => emit("update:section", val));
watch(selectedSpecialty, (val) => emit("update:specialty", val));
</script>
