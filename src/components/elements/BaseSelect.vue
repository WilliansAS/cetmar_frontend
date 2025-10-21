<template>
  <div class="relative w-full">
    <select
      :id="id"
      :value="modelValue"
      @change="handleChange"
      :class="[
        'border border-gray-300 rounded-lg outline-none transition w-full appearance-none',
        'px-3 py-2 text-base sm:px-4 sm:py-3 sm:text-lg',
        'focus:ring-2 focus:ring-[#1226AB] focus:border-transparent',
        'bg-white cursor-pointer',
        selectClass, 
        error ? 'border-red-500 focus:ring-red-500' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      ]"
      :disabled="disabled"
    >
      <option 
        v-if="placeholder" 
        value="" 
        disabled
      >
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- Ícono de flecha -->
    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg 
        class="w-5 h-5 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true },
  placeholder: { type: String, default: "Selecciona una opción" },
  modelValue: { type: [String, Number], default: "" },
  options: { 
    type: Array, 
    default: () => [] 
  },
  error: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  selectClass: { type: String, default: "" },
});

const emit = defineEmits(['update:modelValue', 'change']);

const handleChange = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value);
  emit('change', value);
};
</script>