<script setup lang="ts">
import VirtualScroll from './components/virtual-scroll.vue';
import { ref, effectScope, computed, getCurrentScope, inject, InjectionKey, provide, onScopeDispose } from 'vue';
import { useMouse, createGlobalState } from '@vueuse/core';


// NOTE: provide和inject 类型安全问题
interface UserInfo {
  id: number;
  name: string;
}
const injectKeyUser: InjectionKey<UserInfo> = Symbol('user');

provide(injectKeyUser, {
  id: 13,
  name: 'sss',
});

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
onScopeDispose(dispose);

// TODO:
// NOTE:
// FIXME:
// BUG

function onChange(value) {
  if (value) {
    state.value = createState();
  } else {
    dispose();
  }
}

// NOTE: 虚拟滚动数据
const list = (num = 10) => new Array(num).fill(null).map((_, i) => ({ id: i + 1, name: `第 ${i + 1} 条列表` }));
</script>

<template>
  <el-switch v-model="switchModel" type="primary" size="default" @change="onChange"></el-switch>
  {{ state?.x }}
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

