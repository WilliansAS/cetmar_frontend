<template>
  <div class="flex flex-col w-full">
    <!-- Etiqueta -->
    <label
      v-if="label"
      :for="id"
      class="text-sm sm:text-base font-semibold text-gray-700 mb-2"
    >
      {{ label }}
    </label>

    <!-- Campo input -->
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'border border-gray-300 rounded-lg outline-none transition w-full',
        'px-3 py-2 text-base sm:px-4 sm:py-3 sm:text-lg',
        'focus:ring-2 focus:ring-[#1226AB] focus:border-transparent',
        inputClass, // Permite sobrescribir o complementar estilos
      ]"
    />

    <!-- Mensaje de error -->
    <p v-if="error" class="text-red-500 text-xs sm:text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  error: { type: String, default: "" },
  inputClass: { type: String, default: "" },
});
</script>
