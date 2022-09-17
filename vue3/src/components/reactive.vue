<script setup lang='ts'>
import { ref, reactive, effectScope, computed, getCurrentScope, inject, InjectionKey, provide, onScopeDispose, useSlots } from 'vue';
import CommonComp from './commonComp.vue'
// const cmdProps = {
//   name: '我是cmd',
//   age: 12,
// };

// reactive 和 ref 的结合使用的一些问题
// 1. 当reactive中使用ref的时候，ref的.value语法会被破坏，所有的取值不再需要加.value, 可以看例子1和2；
// 2. 如果是例子2，传递给子组件的age也是一个ref，和例子1不一样。
// 3. 当给子组件传props时，如果是v-bind的写法，props可以写成一个reactive, 比如例子1和3，在子组件watch写法都() => props.xxx;
//    如果是例子2，则watch写法 watch(props.age); 不是响应式的数据没法watch;
// 4. 当给子组件传props时，不是v-bind的写法，如果数据是ref，传递下去后，打印发现类型会消失，并且watch写法也是 () => props.xxx，但是确是响应式数据;
// 5. 给子组件传的props, 虽然是一个ShallowReactive类型，但是如果cmdProps不是响应式也没用，因为watch和computed的前提是cmdProps是响应式，或者内部想要监听的数据是响应式;

// 例子1
// const cmdProps = reactive({
//   name: '我是cmd',
//   age: ref(12),
// });

// 例子2
// const cmdProps = {
//   name: '我是cmd',
//   age: ref(12),
// };

// 例子3
const cmdProps = reactive({
  name: '我是cmd',
  age: 12,
});
</script>
<template>
  <CommonComp v-bind="cmdProps"/>
</template>