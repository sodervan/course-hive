<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Button } from '@/components/ui/button';

export default defineComponent({
  name: 'MyComponent',
  components: {
    Button
  }
});
</script>

<style scoped>
</style>