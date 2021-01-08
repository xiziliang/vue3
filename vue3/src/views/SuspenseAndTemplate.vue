<template>
  <div class="susAndTemp">susAndTemp</div>
  <div v-if="error">{{error}}</div>
  <Suspense v-else>
    <template #default>
      <async-component></async-component>
    </template>
    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
  <!--Teleport 所渲染的位置是在他所选择id的内部  -->
  <!-- <TeleportModal name="#app"></TeleportModal> -->
</template>

<script>
import { reactive, toRefs, ref, onUpdated, onMounted, onErrorCaptured } from "vue";
import GlRenderer from "gl-renderer";
export default {
  name: "susAndTemp",
  setup(prop, ctx) {
    let error = ref(null);
    onErrorCaptured((e) => {
      error.value = e;
      return true
    })
    return {
      error
    };
  },
};
</script>
<style scoped>
</style>
