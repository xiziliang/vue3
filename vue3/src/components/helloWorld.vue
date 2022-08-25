<script setup lang="ts">
import { useSlots, ref, watch, computed, toRef, reactive, inject } from 'vue';
import { onScopeDispose, onUnmounted, effectScope, getCurrentScope, onMounted } from 'vue';
import { injectKeyUser, UserInfo } from '../model/inject-key';

const user = inject(injectKeyUser, {} as UserInfo);
const data = reactive({ name: 'krystal', age: 28 });
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
    <el-button @click="data.age++">自加1</el-button>
    <span>{{ data.age }}</span>
    <span>{{ user.name }}</span>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>