<script setup lang="ts">
interface Props {
  show: boolean;
  title?: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  show: false,
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl px-12 py-8 w-full max-w-md mx-4 flex flex-col items-center text-center space-y-5"
      >
        <div class="relative w-20 h-20">
          <div
            class="absolute inset-0 rounded-full border-[8px] border-gray-100"
          ></div>

          <div
            class="absolute inset-0 rounded-full border-[8px] border-transparent border-t-[#1226AB] animate-spin"
          ></div>
        </div>

        <div class="space-y-1">
          <h3 class="text-xl font-bold text-gray-800">
            {{ title }}
          </h3>
          <p class="text-sm text-gray-500 font-medium">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
