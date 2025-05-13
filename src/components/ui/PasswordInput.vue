<template>
  <div class="relative mb-6">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="isPasswordVisible ? 'text' : 'password'"
      placeholder="Password"
      class="py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm w-full"
    />
    <button
      type="button"
      @click="togglePasswordVisibility"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
    >
      <span v-if="isPasswordVisible">
        <EyeOff class="size-4" />
      </span>
      <span v-else>
        <Eye class="size-4" />
      </span>
    </button>
  </div>
</template>

<script setup>
import { Eye, EyeOff } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps({
  modelValue: String,
  placeholder: String,
  inputClass: {
    type: String,
    default: '',
  },
});

const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
