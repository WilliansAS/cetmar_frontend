<template>
  <div class="relative inline-block">
    <select
      :id="id"
      :value="modelValue"
      @change="handleChange"
      :class="[
        'border border-[#B5ADAD] rounded-lg outline-none transition appearance-none',
        'pl-3 pr-15 py-2.5 text-base',
        'focus:ring-2 focus:ring-[#1226AB] focus:border-transparent',
        'bg-white cursor-pointer',
        selectClass,
      ]"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <div
      class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
    >
      <img :src="ExpandIcon" alt="desplegar" class="w-4 h-4 text-gray-400" />
    </div>
  </div>
</template>

<script setup>
import ExpandIcon from "@/assets/icons/Expand.svg";

const props = defineProps({
  id: { type: String, required: true },
  placeholder: { type: String, default: "Selecciona una opción" },
  modelValue: { type: [String, Number], default: "" },
  options: {
    type: Array,
    default: () => [],
  },
  selectClass: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "change"]);

const handleChange = (event) => {
  const value = event.target.value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
