<script setup lang="ts">
import { useSlots } from 'vue';
import { onScopeDispose, onUnmounted, effectScope, getCurrentScope } from 'vue';

const slots = useSlots();
const slot = slots.default?.();

// NOTE: onScopeDispose会收集setup和effectScope创建的scope，所以当两者销毁的时候都会执行
onScopeDispose(() => {
  console.log('onScopeDispose end');
})

onUnmounted(() => {
  console.log('onUnmounted end');
})
</script>

<template>
  <div>
    <span>helloWorld</span>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>