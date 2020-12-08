<template>
  <div class="box">
    <canvas id="canvaas" width="512" height="256"></canvas>
  </div>
</template>

<script>
// 用来实现canvas的手绘图形
import rough from "roughjs/bin/rough";
import { onMounted, reactive } from "vue";
export default {
  name: "rougthjs",
  components: {},
  setup(props) {
    onMounted(() => {
      drew();
    });
    const drew = () => {
      const rc = rough.canvas(document.querySelector("canvas"));
      let ctx = rc.ctx;
      ctx.translate(256, 256);
      ctx.scale(1, -1); //坐标变换
      const hillOpts = { roughness: 2.8, strokeWidth: 2, fill: "skyblue" };
      rc.path("M-180 0L-80 100L20 0", hillOpts);
      rc.path("M-20 0L80 100L180 0", hillOpts);
      rc.circle(0, 150, 105, {
        stroke: "red",
        roughness: 2.0,
        strokeWidth: 4,
        fill: "rgba(255, 255, 0, 0.4)",
        fillStyle: "sunburst",
      });
    };
    return {
      drew,
    };
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
