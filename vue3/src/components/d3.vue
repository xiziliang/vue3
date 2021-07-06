<template>
  <div class="box"></div>
</template>
<script>
import { ref, reactive, toRefs, computed, watch, onMounted } from "vue";
import d3 from "d3";
function init() {
  console.log(d3.select(".box"));
}
export default {
  name: "D3",
  setup(prop) {
    onMounted(() => {
      init();
    });
    return {};
  },
};
</script>

