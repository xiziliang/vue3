export default class pieCanvas {
  constructor(data, className, hoverColor) {
    this.data = data;
    this.className = className;
    this.hoverColor = hoverColor;
    this.canvas = document.getElementById(this.className);
    this.ctx = this.canvas.getContext("2d");
    this.setRatio(); // 适应屏幕的分辨率
    this.x0 = this.canvas.width / 2;
    this.y0 = this.canvas.height / 2;

    this.radius = 200;
    this.addLine = 50;

    this.init();
    this.bindEvent();
  }
  setRatio() {
    let d = window.devicePixelRatio || 1;
    let cd = this.ctx.backingStorePixelRatio || 1;
    let r = 1.5;
    this.r = r;
    let w = this.canvas.width;
    let h = this.canvas.height;
    this.canvas.width = r * w;
    this.canvas.height = r * h;
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
  }
  toAngle() {
    // 把数据转成弧度
    let t = 0;
    this.data.forEach((item) => {
      t += item.num;
    });
    this.data.forEach((item, i) => {
      let angle = (item.num / t) * Math.PI * 2;
      item.angle = angle;
      item.color = this.randomColor();
    });
  }
  randomColor() {
    // 禅城随机颜色
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }
  init() {
    this.toAngle();
    this.drawPie();
  }
  drawPie(x, y) {
    let start = 0;
    // 根据数据画饼
    // console.log(this.data);
    this.data.forEach((item, i) => {
      // 结束弧度 就是起始 + 自己的弧度
      let end = start + item.angle;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x0, this.y0);
      this.ctx.arc(this.x0, this.y0, this.radius, start, end, false);
      this.ctx.closePath();
      if (this.ctx.isPointInPath(x * this.r, y * this.r)) {
        this.ctx.moveTo(this.x0, this.y0);
        this.ctx.arc(this.x0, this.y0, this.radius * 1.1, start, end, false);
        this.ctx.fillStyle = this.hoverColor;
        this.ctx.fill();
        this.drawTitle(start, this.radius * 1.1, item, this.hoverColor);
      } else {
        this.ctx.fillStyle = item.color;
        this.ctx.fill();
        this.drawTitle(start, this.radius, item, item.color);
      }

      this.drawLengend(i, item);
      start = end;
    });
  }
  drawTitle(start, radius, item, color) {
    // 写标题的
    let lineLength = radius + this.addLine;
    let endX = lineLength * Math.cos(start + item.angle / 2);
    let endY = lineLength * Math.sin(start + item.angle / 2);
    let outX = this.x0 + endX;
    let outY = this.y0 + endY;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x0, this.y0);
    this.ctx.lineTo(outX, outY);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();

    // 写字
    this.ctx.font = "14px 微软雅黑";
    this.ctx.textAlign = outX > this.x0 ? "left" : "right";
    this.ctx.textBaseline = "bottom"; // 字以底部为基准
    this.ctx.fillStyle = color;
    this.ctx.fillText(item.title, outX, outY);

    // 添加下划线
    let textW = this.ctx.measureText(item.title).width; // 获取文字所占宽度
    this.ctx.moveTo(outX, outY);
    let textEndX = outX > this.x0 ? outX + textW : outX - textW;
    this.ctx.lineTo(textEndX, outY);
    this.ctx.stroke();
  }
  drawLengend(index, item) {
    // 画lengend
    this.ctx.beginPath();
    this.ctx.rect(10, 30 * index + 30, 40, 20); //  (x,y,w,h)
    this.ctx.fillStyle = item.color;
    this.ctx.fill();
    this.ctx.font = "14px 微软雅黑";
    this.ctx.textAlign = "left";
    this.ctx.fillText(item.title, 60, 30 * index + 30 + 20);
  }
  bindEvent() {
    this.canvas.addEventListener("mousemove", (e) => {
      // 获取鼠标点 相对画布的位置
      let x = e.clientX - this.canvas.getBoundingClientRect().left;
      let y = e.clientY - this.canvas.getBoundingClientRect().top;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawPie(x, y);
    });
  }
}
