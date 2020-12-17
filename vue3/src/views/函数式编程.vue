<template>
  <div class="Sprite">
    <canvas id="canvas" width="512" height="512"></canvas>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onUpdated, onMounted } from "vue";
import { myParametric } from "../assets/js/myHigherFunction";
import Vector2D from '../assets/js/vector2D.js'
// @ is an alias to /src
const drawCanvas = () => {
  const canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.translate(256, 256);
  ctx.scale(1, -1);

  const helical = myParametric(
    (x, a) => a * x * Math.cos(x),
    (y, a) => a * y * Math.sin(y)
  );
  //绘制出阿基米德螺旋线
  helical(0, 50, 500, 5).draw(ctx, { strokeStyle: "blue" });

  const star = myParametric(
    (x, a) => a * Math.cos(x) ** 3,
    (y, a) => a * Math.sin(y) ** 3
  );
  // 星形线
  star(0, Math.PI * 2, 100, 150).draw(ctx, { strokeStyle: "yellow" });

  // 心形线
  const heart = myParametric(
    (x, r) => 2 * r * (Math.sin(x) - Math.sin(2 * x) / 2),
    (y, r) => 2 * r * (Math.cos(y) - Math.cos(2 * y) / 2)
  );
  heart(0, Math.PI * 2, 100, 40).draw(ctx, { strokeStyle: "red" });


  // 三次贝塞尔曲线
  // const cubicBezier = myParametric(
  //   (t, [{ x: x0 }, { x: x1 }, { x: x2 }, { x: x3 }]) =>
  //     (1 - t) ** 3 * x0 +
  //     3 * t * (1 - t) ** 2 * x1 +
  //     3 * (1 - t) * t ** 2 * x2 +
  //     t ** 3 * x3,
  //   (t, [{ y: y0 }, { y: y1 }, { y: y2 }, { y: y3 }]) =>
  //     (1 - t) ** 3 * y0 +
  //     3 * t * (1 - t) ** 2 * y1 +
  //     3 * (1 - t) * t ** 2 * y2 +
  //     t ** 3 * y3
  // );

  // const p0 = new Vector2D(0, 0);
  // const p1 = new Vector2D(100, 0);
  // p1.rotate(0.75);
  // const p2 = new Vector2D(150, 0);
  // p2.rotate(-0.75);
  // const p3 = new Vector2D(200, 0);
  // const count = 30;
  // for (let i = 0; i < count; i++) {
  //   p1.rotate((2 / count) * Math.PI);
  //   p2.rotate((2 / count) * Math.PI);
  //   p3.rotate((2 / count) * Math.PI);
  //   cubicBezier(0, 1, 300, [p0, p1, p2, p3]).draw(ctx);
  // }
};
export default {
  name: "Sprite",
  components: {},
  setup(prop, ctx) {
    onMounted(() => {
      drawCanvas();
    });
    return {};
  },
};
</script>
