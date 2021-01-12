<template>
  <div class="Sprite" >
    sprite
    <!-- <div v-lazyimg:xxx="require('../assets/img/success.png')">
      <img src="">
    </div> -->
  </div>
</template>

<script>
import { reactive, toRefs, ref, onUpdated, onMounted, onErrorCaptured } from "vue";
import GlRenderer from "gl-renderer";
export default {
  name: "Sprite",
  setup(prop, ctx) {

  },
};
</script>
<style scoped>
.Sprite{
  padding-top: 100vh;
}
img{
  width: 500px;
  height: 400px;
}
</style>
