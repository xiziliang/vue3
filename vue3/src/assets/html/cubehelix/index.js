import {cubehelix} from '../../js/cubehelix/index.js'; // 高阶函数
/** @type {HTMLCanvasElement} */

 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');

 ctx.translate(256, 256);
 ctx.scale(1, -1);

 const color = cubehelix(); 
 const T = 2000;

 function update(t) {
     console.log(performance.now())
    const p = 0.5 + 0.5 * Math.sin(t / T);
    ctx.clearRect(-256, -256, 512, 512);
    const {r, g, b} = color(p);
    ctx.fillStyle = `rgb(${255 * r},${255 * g},${255 * b})`;
    ctx.beginPath();
    // ctx.rect(0, 0, 200 * p, 40);
    ctx.arc(0,0,200*p,0,Math.PI*2,false);
    ctx.fill();
    // window.ctx = ctx;
    requestAnimationFrame(update.bind(this)); // requestAnimationFrame 默认会给回调函数一个值，即performance.now() 即当前进行的时间，即update(t)中t是当前函数执行时间
 }

 update(0);