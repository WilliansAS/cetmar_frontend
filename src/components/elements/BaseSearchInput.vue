<template>
  <div class="relative w-full">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <img :src="SearchIcon" alt="Buscar" class="w-5 h-5 text-gray-400" />
    </div>
    <input
      type="text"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      class="w-full pl-10 pr-4 py-2.5 text-base border border-[#B5ADAD] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#1226AB]"
      :class="customClass"
    />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/icons/Search.svg";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  customClass?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
