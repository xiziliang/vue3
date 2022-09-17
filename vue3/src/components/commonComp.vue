<script setup lang='ts'>
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import { injectKeyUser, UserInfo } from '../model/inject-key';

const props = defineProps<{
  name: string;
  age: Ref<number> | number;
}>();

const { name, id } = inject(injectKeyUser, {} as UserInfo);

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
    <span>{{ props.name }}</span>
    ---------
    <span>{{ props.age }}</span>
  </div>
</template>