function draw(points, ctx, {
  strokeStyle = 'black',
  fillStyle = null,
  close = false,
}={}) {
  // console.log(strokeStyle,fillStyle,close)
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.moveTo(...points[0]);
  for (let i = 0; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }
  if (close) ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  console.log(this)
  ctx.stroke();
}

export function myParametric(xFun, yFun) {
  return function (start, end, size = 100, ...args) {
    const points = [];
    for (let i = 0; i < size; i++) {
      const p = i / size;
      const t = start * (1 - p) + end * p;
      // console.log(...args)
      const x = xFun(t, ...args);
      const y = yFun(t, ...args);
      // console.log(x,y)
      points.push([x, y]);
    }
    return {
      draw: draw.bind(null, points),
      points
    }
  }

}