<template>
  <div class="Sprite">
    <D3/>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onUpdated, onMounted,onUnmounted, onErrorCaptured } from "vue";
import D3 from '../components/d3.vue';
export default {
  name: "Sprite",
  components: {
    D3
  },
  setup(prop, ctx) {

  },
};
</script>
<style scoped>
img {
  width: 500px;
  height: 400px;
}
#demo {
  width: 100%;
  height: 500px;
}
.Sprite{
  padding-top: 50px;
}
</style>
