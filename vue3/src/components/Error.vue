<template>
      <div>{{ error }}</div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: "Error",
  props: {
    name
  },
  setup(props) {
    let error = ref(null);
    error.value = '报错了';
    return {
      error
    }
  }
};
</script>

<style scoped>
</style>
