<template>
  <div class="box"></div>
</template>
<script>
import { ref, toRefs, reactive, onMounted } from "vue";
import * as d3 from "d3";
import d3tip from "d3-tip";

function initD3() {
  // 坑1: d3tip添加class,需要在全局css样式中去添加样式；
  const tips = d3tip()
    .attr("class", "tips")
    .offset([-4, 96])
    .direction((d) => {
        return 'n';
    })
    .html((...params) => {
      console.log(params);
      return "我是svg的tips";
    });
  const svg = d3.select(".box").append("svg").call(tips);

  svg
    .attr("class", "demo")
    .attr("width", 200)
    .attr("height", 200)
    .attr("style", "background-color:red")
    .on("mouseover", tips.show)
    .on("mouseout", tips.hide);
}
export default {
  name: "D3",
  setup(prop) {
    onMounted(initD3);
    return {};
  },
};
</script>
<style scoped>
</style>
