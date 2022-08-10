<!-- // App.vue -->
<script setup>
import VirtualScroll from './components/virtual-scroll.vue';
const list = (num = 10)=> new Array(num).fill(null).map((_,i) => ({ id: i+1, name: `第 ${i+1} 条列表` }));
</script>

<template>
  <VirtualScroll :data="list(100)" :height="500" :offset="150" #default="{ data }">  
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

