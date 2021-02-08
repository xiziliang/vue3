<template>
  <div class="box2"></div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue';
import * as Eoption from '../../utils/echartsOption';
import * as Tool from '../../utils/api'
export default {
  name: "comp",
  setup(props, context) {
    onMounted(() => {
      const chartDom = document.getElementsByClassName('box2')[0];
      const myChart = echarts.init(chartDom);
      Eoption.option && myChart.setOption(Eoption.option)
      Tool.resize(myChart);
    })
  },
};
</script>
<style scoped>
</style>
