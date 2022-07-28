<script setup>
import { ref } from 'vue';

const value = ref('你好');

</script>
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button type="primary" size="default" @click="">{{ value }}</el-button>
  </div>
</template>

