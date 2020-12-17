// 根据点来绘制图形
function draw(points, context, {
  strokeStyle = 'black',
  fillStyle = null,
  close = false,
} = {}) {
  context.strokeStyle = strokeStyle;
  context.beginPath();
  context.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(...points[i]);
  }
  if (close) context.closePath();
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  context.stroke();
}


/** 函数parametric
 * @param start // X值  
 * @param end   // Y值 
 * @param seg   // 分量 分享越大，绘制越精细
 * @param args  // 传入的函数除x,y以外的参数
 */
export function parametric(xFunc, yFunc) {
  return function (start, end, seg = 100, ...args) {
    console.log(...args)
    const points = [];
    for (let i = 0; i <= seg; i++) {
      const p = i / seg;
      const t = start * (1 - p) + end * p;
      const x = xFunc(t, ...args); // 计算参数方程组的x
      const y = yFunc(t, ...args); // 计算参数方程组的y
      points.push([x, y]);
    }
    return {
      draw: draw.bind(null, points),
      points,
    };
  };
}