<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
const slot = slots.default?.();
</script>

<template>
  <div>
    <span>helloWorld</span>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>