<template>
  <DirectorLayout>
    <div class="max-w-7xl mx-auto space-y-10">
      <div class="flex justify-center">
        <h1 class="font-bold text-4xl">¡Bienvenida de nuevo, Directora!</h1>
      </div>

      <StatsDirector />
      <ChartsDirector />
    </div>
  </DirectorLayout>
</template>


<script setup lang="ts">
import ChartsDirector from '../components/ChartsDirector.vue';
import DirectorLayout from '../components/DirectorLayout.vue';
import StatsDirector from '../components/StatsDirector.vue';
  
</script>