<template>
  <div>
    <!-- <div>{{ a }}</div> -->
    <!-- <canvas id="canvas" width="900" height="800"></canvas>
    <canvas id="canvas2"></canvas>
    <div class="nameBox">
      <canvas id="canvasName"></canvas>
      <div>
        <button id="save">保存</button>
        <button id="clear">清除</button>
      </div>
    </div>
    <div>
      <canvas id="water" width="2000" height="300"></canvas>
    </div> -->
    <div>
      <canvas id="animation"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, onUnmounted } from "vue";
import Canvas from "../assets/js/pieCanvas";
import pieCanvsaProgress from "../assets/js/pieCanvasProgress";
import nameCanvas from "../assets/js/nameCanvas";
import canvasAnimation from "../assets/js/canvasAnimation";
import * as fn from "../assets/js/canvasBeisizer";
export default {
  setup(prop) {
    let pie; // 饼图
    let pie2; // 动态饼图
    let canvasName; // 签名
    let beisizer = fn.wavesurRecord; // 水波纹
    let canAnimation = reactive({}); // 网格动画
    let a = ref("你好 canvas");
    let data = [
      {
        title: "20岁以下",
        num: 6,
      },
      {
        title: "20-25岁",
        num: 50,
      },
      {
        title: "25-30岁",
        num: 20,
      },
      {
        title: "30岁以上",
        num: 4,
      },
    ];
    onMounted(() => {
      // a.value = "莎莎侬";
      // pie = new Canvas(data, "canvas", "skyblue");
      // pie2 = new pieCanvsaProgress("canvas2", 400, 10, 100); // id 宽度 最外边圆半径 百分比
      // canvasName = new nameCanvas({
      //   id: "canvasName",
      //   w: 1000,
      //   h: 500,
      //   btnSaveId: "save",
      //   btnClearId: "clear",
      // });
      // beisizer("water");
      canAnimation = new canvasAnimation({
        id: "animation",
        type: "2d",
        config: { count: 150 },
      });
      window.addEventListener("resize", resize);
    });
    onUnmounted(() => {
      console.log("销毁");
      window.removeEventListener("resize", resize);
      canAnimation.destroyed();
    });
    const resize = () => {
      canAnimation.destroyed();
      canAnimation = new canvasAnimation({
        id: "animation",
        type: "2d",
        config: { count: 150 },
      });
    };
    return {
      data,
      a,
      resize,
      canAnimation,
    };
  },
};
</script>

<style scoped>
canvas {
  /* background-color: #eee; */
}
.nameBox {
  width: 100%;
  height: 550px;
}
#canvasName {
  border: 1px solid;
  background-color: #fff;
}
</style>
