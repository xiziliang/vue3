export default class pieCanvsaProgress {
  constructor(id, w, r, percent) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = w * 2; // canvas 宽度 w*2
    this.canvas.height = w * 2; // canvas 高度 w*2
    this.canvas.style.width = w + "px";
    this.canvas.style.height = w + "px";
    this.ctx.translate(0.5, 0.5); //解决一像素模糊问题
    this.ctx.translate(-0.5, -0.5);

    this.w = w;
    this.r = r;
    this.percent = percent;
    this.i = 0;
    console.log(this.ctx);
    // this.render();
    this.animate();
  }
  animate() {
    this.i++;
    this.render(this.i);
    if (this.i < this.percent) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
  render(i) {
    // 分解percent 实现动画
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.lineWidth = this.r;
    let grad = this.ctx.createLinearGradient(0, 0, 0, this.w * 2);
    grad.addColorStop(0, "rgba(255,0,0,1)");
    grad.addColorStop(1, "rgba(255,0,0,.2)");
    this.ctx.strokeStyle = grad;
    this.ctx.arc(
      this.w,
      this.w,
      this.w - this.r / 2,
      -Math.PI / 2,
      (Math.PI * 2 * i) / 100 - Math.PI / 2
    );
    this.ctx.stroke();
    this.ctx.closePath();

    // 开始的小圆
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
    this.ctx.arc(this.w, this.r / 2, this.r / 2, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    // 结束的小圆
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
    let rad = (i / 100) * Math.PI * 2 - Math.PI / 2;
    let x = (this.w - this.r / 2) * Math.cos(rad) + this.w;
    let y = (this.w - this.r / 2) * Math.sin(rad) + this.w;
    this.ctx.arc(x, y, this.r / 2, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    // 中心的圆
    this.ctx.beginPath();
    this.ctx.arc(this.w, this.w, this.w - this.r * 1.5, 0, Math.PI * 2);
    this.ctx.fillStyle = grad;
    this.ctx.fill();
    this.ctx.closePath();
    //字体
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "25px 微软雅黑";
    // this.ctx.fillText(this.percent+'%',this.w,this.w);
    this.ctx.fillText(i + "%", this.w, this.w);
    this.ctx.closePath();
  }
}
