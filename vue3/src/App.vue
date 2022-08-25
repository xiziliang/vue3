<script setup lang="ts">
import VirtualScroll from './components/virtual-scroll.vue';
import HelloWorld from './components/helloWorld.vue';
import { ref, reactive, effectScope, computed, getCurrentScope, inject, InjectionKey, provide, onScopeDispose } from 'vue';
import { useMouse, createGlobalState, tryOnScopeDispose } from '@vueuse/core';
import { injectKeyUser } from './model/inject-key';

const user = reactive({
  id: 13,
  name: '仇总',
});
provide(injectKeyUser, user);

// NOTE: effectScope的使用方式
let scope;
const switchModel = ref(true);
const state = ref(createState());

function useMouseScope() {
  const { x } = useMouse()
  const doubled = computed(() => x.value * 2)

  return { x, doubled }
}

function createState() {
  scope = effectScope();
  return scope.run(useMouseScope);
}

function dispose() {
  scope.stop();
  state.value = scope = null
}

// NOTE: 当effect不再使用时，销毁副作用
tryOnScopeDispose(dispose);

// TODO:
// NOTE:
// FIXME:
// BUG

function onChange(value) {
  if (value) {
    user.name = '仇总';
    state.value = createState();
  } else {
    user.name = '本币';
    dispose();
  }
}

console.log(getCurrentScope())

// NOTE: 虚拟滚动数据
const list = (num = 10) => new Array(num).fill(null).map((_, i) => ({ id: i + 1, name: `第 ${i + 1} 条列表` }));
</script>

<template>
  <el-switch v-model="switchModel" type="primary" size="default" @change="onChange"></el-switch>
  {{ state?.x }}
  <HelloWorld></HelloWorld>
  <VirtualScroll :data="list(1000)" :height="800" :offset="150" #default="{ data }">  
    <div>
      <div>listData</div>
      <div>{{ data.name }}</div>
      <div>小丑1</div>
      <div>小丑2</div>
      <div>小丑3</div>
      <div>小丑4</div>
    </div>
  </VirtualScroll>
</template>

