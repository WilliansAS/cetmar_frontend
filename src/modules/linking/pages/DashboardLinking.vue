<template>
  <LinkingLayout>
    <div class="flex flex-col w-full p-6 gap-6">
      <div class="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-3xl font-semibold text-gray-900">Anuncios: Públicos</h1>
          <p class="text-gray-500 text-base font-semibold">Gestión de anuncios</p>
        </div>

        <LinkingFilters
          @update:section="selectedSection = $event"
          @update:specialty="selectedSpecialty = $event"
        />
      </div>

          <!-- Contenido principal -->
      <div class="flex flex-wrap justify-between gap-6">
        <LinkingVideo />
        <LinkingCalendar />
        <LinkingImages />
        <LinkingCommuniques />
      </div>

    </div>
  </LinkingLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LinkingLayout from "../components/LinkingLayout.vue";
import LinkingFilters from "../components/LinkingFilters.vue";
import LinkingVideo from "../components/LinkingVideo.vue";
import LinkingCalendar from "../components/LinkingCalendar.vue";
import LinkingImages from "../components/LinkingImages.vue";
import LinkingCommuniques from "../components/LinkingCommuniques.vue";
const selectedSection = ref("");
const selectedSpecialty = ref("");
</script>
