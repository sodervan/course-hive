import { computed } from 'vue';

export function useFormValidation(fields) {
  return computed(() => {
    return fields.every(field => field.value.trim() !== '');
  });
}
