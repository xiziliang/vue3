<script setup lang="ts">
import { useSlots, ref, watch, computed, toRef, reactive, inject, h, Fragment } from 'vue';

const data = reactive({ name: 'krystal', age: 28 });
const slots = useSlots();

// NOTE: 如果是作用域插槽，在写slot.default() || slot.xxx() 要传对应的值；
// NOTE: 如果想在script setup中使用render的话，需要借助h函数，并且组件如果涉及响应式数据的话，需要自己进行副作用监听，因为缺少render，
//       所有没有入口为h中的响应式做监听，自己使用compted或者watch进行副作用监听
const DefaultSlot = computed(() => h(Fragment, null, slots.default?.({ data })));

</script>

<template>
  <div>
    <el-button @click="data.age++">自加1</el-button>
    <!-- <slot :data="data"></slot> -->

    <DefaultSlot></DefaultSlot>
  </div>
</template>
