<template>
  <div class="box"></div>
</template>
<script>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import * as Eoption from "../../utils/echartsOption";
import * as Tool from "../../utils/api";

function fetchData(cb) {
  // 通过 setTimeout 模拟异步加载
  setTimeout(function() {
    cb({
      categories: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      data: [5, 20, 36, 10, 10, 20],
    });
  }, 3000);
}
function createEcharts() {
  const chartDom = document.getElementsByClassName("box")[0];
  const myChart = echarts.init(chartDom);
  myChart.setOption(Eoption.asyncOption);
  myChart.showLoading();
  fetchData(function(data) {
    const option = { ...Eoption.asyncOption }; // 如果不想做深拷贝的话，export一个函数
    myChart.hideLoading();
    Eoption.asyncOption &&
      myChart.setOption({
        xAxis: {
          data: data.categories,
        },
        series: [
          {
            // 根据名字对应到相应的系列
            name: "销量",
            data: data.data,
          },
        ],
      });
  });
  Tool.resize(myChart);
}
function init() {
  onMounted(() => {
    createEcharts();
  });
}
export default {
  name: "asyncComp",
  setup(props, context) {
    init();
  },
};
</script>
<style scoped></style>
