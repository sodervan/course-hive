<template>
  <button
    :disabled="disabled || isLoading"
    :class="buttonClass"
    class="relative flex justify-center items-center"
  >
    <span :class="{ 'invisible': isLoading }">{{ label }}</span>
    <svg
      v-if="isLoading"
      class="h-5 w-5 animate-spin absolute text-white"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        fill="transparent"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  label: String,
  isLoading: Boolean,
  disabled: Boolean,
  buttonClass: {
    type: String,
    default: '',
  },
});
</script>
