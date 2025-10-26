<template>
  <div
    class="bg-white rounded-[14px] p-5 flex justify-between shadow-sm min-h-40"
  >
    <div class="flex flex-col">
      <slot v-if="$slots.default"></slot>

      <template v-else>
        <span class="text-sm font-semibold text-gray-500 mb-3">{{
          title
        }}</span>
        <span class="text-3xl font-bold text-gray-900">{{ value }}</span>
      </template>
    </div>

    <div
      class="w-14 h-14 flex items-center justify-center rounded-[23px] flex-shrink-0 ml-4"
      :class="iconBgClass"
    >
      <img :src="iconSrc" alt="" class="w-7 h-7" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";

defineProps<{
  title?: string;
  value?: string;
  iconSrc: string;
  iconBgClass?: string;
}>();

// Necesitamos 'useSlots' para comprobar si el slot 'default' fue pasado
const $slots = useSlots();
</script>
