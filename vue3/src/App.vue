<script setup lang="ts">
import { ref, reactive, effectScope, computed, getCurrentScope, inject, InjectionKey, provide, onScopeDispose, useSlots } from 'vue';
import { useMouse, createGlobalState, tryOnScopeDispose } from '@vueuse/core';

import Cmd from './components/cmd.vue';
import VirtualScroll from './components/virtual-scroll.vue';
import HelloWorld from './components/helloWorld.vue';
import { injectKeyUser } from './model/inject-key';

const user = reactive({
  id: 13,
  name: '仇总',
});

const age = ref(12);

const cmdProps = {
  name: '我是cmd',
  age: 12,
};

// reactive 和 ref 的结合使用的一些问题
// 1. 当reactive中使用ref的时候，ref的.value语法会被破坏，所有的取值不再需要加.value, 可以看例子1和2；
// 2. 如果是例子2，传递给子组件的age也是一个ref，和例子1不一样。
// 3. 当给子组件传props时，如果是v-bind的写法，props可以写成一个reactive, 比如例子1和3，在子组件watch写法都() => props.xxx;
//    如果是例子2，则watch写法 watch(props.age); 不是响应式的数据没法watch;
// 4. 当给子组件传props时，不是v-bind的写法，如果数据是ref，传递下去后，打印发现类型会消失，并且watch写法也是 () => props.xxx，但是确是响应式数据;
// 5. 给子组件传的props, 虽然是一个ShallowReactive类型，但是如果cmdProps不是响应式也没用，因为watch和computed的前提是cmdProps是响应式，或者内部想要监听的数据是响应式;

// 1
// const cmdProps = reactive({
//   name: '我是cmd',
//   age: ref(12),
// });

// 2
// const cmdProps = {
//   name: '我是cmd',
//   age: ref(12),
// };

// 3
// const cmdProps = reactive({
//   name: '我是cmd',
//   age: 12,
// });

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
  <el-button type="primary" size="default" @click="cmdProps.age++">cmd</el-button>
  
  <el-switch v-model="switchModel" type="primary" size="default" @change="onChange"></el-switch>
  {{ state?.x }}
  <HelloWorld >
    <template #default="{ data }">
      <div>123 {{ data.name }}</div>
      <span>222 {{ data.age }}</span>
    </template>
  </HelloWorld>
  <Cmd v-bind="cmdProps" :age="age"></Cmd>
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

