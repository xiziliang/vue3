<template>
  <div class="box">
    <div id="demo"></div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onUpdated, onMounted, onErrorCaptured } from "vue";
import * as Eoption from '../utils/echartsOption.js'
import GlRenderer from "gl-renderer";
export default {
  name: "Echarts5",
  setup(prop, ctx) {
    onMounted(() => {
      const chartDom = document.getElementById('demo');
      const myChart = echarts.init(chartDom);
      myChart.setOption(Eoption.option)
    })
    return {
    }
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
#demo {
  width: 100%;
  height: 500px;
}
</style>
