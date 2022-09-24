<script setup lang="ts">
import { ref, reactive, provide } from 'vue';

import { injectKeyUser } from '@/model';

// TODO:
// NOTE:
// FIXME:
// BUG

const user = reactive({
  id: 13,
  name: '仇总',
});

provide(injectKeyUser, user);

const switchModel = ref(true);

// NOTE: 虚拟滚动数据
const list = (num = 10) => new Array(num).fill(null).map((_, i) => ({ id: i + 1, name: `第 ${i + 1} 条列表` }));
</script>

<template>
  <!-- NOTE: test virtual-scroll -->
  <!-- <VirtualScroll :data="list(1000)" :height="800" :offset="150" #default="{ data }">  
    <div>
      <div>listData</div>
      <div>{{ data.name }}</div>
      <div>小丑1</div>
      <div>小丑2</div>
      <div>小丑3</div>
      <div>小丑4</div>
    </div>
  </VirtualScroll>
  <el-divider direction="horizontal" content-position="left"></el-divider> -->
  <!-- NOTE: test reactive.vue -->
  <Reactive />
  <el-divider direction="horizontal" content-position="left"></el-divider>
  <!-- NOTE: test slot.vue -->
  <SlotComp>
    <template #default="{ data }">
      <span>{{ data.name }}</span>
      <span>{{ data.age }}</span>
    </template>
  </SlotComp>
  <el-divider direction="horizontal" content-position="left"></el-divider>
  <!-- NOTE: test effectScope.vue -->
  <el-switch v-model="switchModel" active-text="控制EffectScope">控制EffectScope</el-switch>
  <EffectScope v-if="switchModel" />
  <el-divider direction="horizontal" content-position="left"></el-divider>
</template>

