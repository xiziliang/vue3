<script setup lang='ts'>
import { ref, computed, effectScope, onScopeDispose, getCurrentScope } from 'vue';
import type { EffectScope } from 'vue';
import { useMouse, createGlobalState, tryOnScopeDispose } from '@vueuse/core';

// NOTE: effectScope的使用方式
let scope: EffectScope | null;
const switchModel = ref(true);
const state = ref(createState());

// NOTE: 当effect不再使用时，销毁副作用
// NOTE: onScopeDispose会收集setup和effectScope创建的scope，所以当两者销毁的时候都会执行
// NOTE: onScopeDispose可以在setup和effectScope().run()中注册，在哪个中注册哪个副作用被销毁后就会执行哪个回调
tryOnScopeDispose(onCloseSetUp);

function useMouseScope() {
  const { x } = useMouse()
  const doubled = computed(() => x.value * 2)

  // NOTE: 只会在createState创建的scope中注册，一般来讲这个effectScope是不需要写的
  onScopeDispose(() => {
    console.log('onScopeDispose end');
  })
  return { x, doubled }
}

function createState() {
  scope = effectScope();
  return scope.run(useMouseScope);
}

function dispose() {
  scope?.stop();
  state.value = scope = null;
}

function onCloseSetUp() {
  dispose();
  console.log('onSetup end');
}

function onChange(value) {
  if (value) {
    state.value = createState();
  } else {
    dispose();
  }
}

</script>
<template>
    <el-switch v-model="switchModel" type="primary" size="default" active-text="控制useMouse" @change="onChange"></el-switch>
    <span>{{ state?.x }}</span>
    -----------
    <span>{{ state?.doubled }}</span>
</template>