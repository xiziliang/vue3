<script setup lang='ts'>
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import { injectKeyUser, UserInfo } from '@/model';

const props = defineProps<{
  name: string;
  age: Ref<number> | number;
}>();

const { name, id } = inject(injectKeyUser, {} as UserInfo);

const color = ref('skyblue');

const font = ref({
  size: '20px',
})

</script>
<template>
  <!-- NOTE: test inject -->
  <div>
     <span> {{ id }}</span>
     --------
     <span> {{ name }}</span>
  </div>
  <el-divider direction="horizontal"></el-divider>
  <!-- NOTE: test reactive.vue -->
  <div>
    <span class="name">{{ props.name }}</span>
    ---------
    <span class="age">{{ props.age }}</span>
  </div>
</template>
<style>
.name {
  color: v-bind(color);
}
.age {
  font-size: v-bind('font.size');
}
</style>