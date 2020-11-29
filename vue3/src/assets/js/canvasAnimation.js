const utils = {
  random(min, max) {
    return Math.random() * (max - min) + min;
  },
};
export default class canvasAnimation {
  constructor(OPTION) {
    let { id, type } = OPTION;
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext(type);
    this.animationFn; // 动画函数
    this.dots = []; // 创建点
    this.config = {
      r: 2,
      color: "rgba(255,255,255,0.8)",
      xv_range: [-2, 2],
      yv_range: [-2, 2],
      scale_range: [0.5, 1.5],
      count: 100,
      max_distance: 200,
    };
    this.config = Object.assign(this.config, OPTION.config);
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.flag = false;
    this.init();
  }
  // 初始化
  init() {
    this.setSize();
    this.createDot(this.config.count);
    this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    this.canvas.addEventListener("mouseout", this.mouseOut.bind(this));
    this.draw();
  }
  // 配置canvas宽高
  setSize() {
    this.canvas.width = window.innerWidth; // 获取的宽度包括滚动条
    this.canvas.height = window.innerHeight - 5;
  }
  // 创造点
  createDot(count) {
    while (count--) {
      let dot = new Dot({
        x: utils.random(this.config.r, window.innerWidth - this.config.r),
        y: utils.random(this.config.r, window.innerHeight - this.config.r),
        xv: utils.random(this.config.xv_range[0], this.config.xv_range[1]),
        yv: utils.random(this.config.yv_range[0], this.config.yv_range[1]),
        scale: utils.random(
          this.config.scale_range[0],
          this.config.scale_range[1]
        ),
        color: this.config.color,
        r: this.config.r,
      });
      this.dots.push(dot);
    }
  }
  // 画
  draw() {
    // 先把上次绘画清除
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.dots.forEach((item) => {
      item.draw(this.context);
    });
    // 连接粒子
    for (var i = 0; i < this.dots.length; i++) {
      for (var j = 0; j < this.dots.length; j++) {
        let distance = Math.sqrt(
          Math.pow(this.dots[i].x - this.dots[j].x, 2) +
            Math.pow(this.dots[i].y - this.dots[j].y, 2),
          2
        ); // 判断两个点之间的距离
        if (distance < this.config.max_distance) {
          this.context.strokeStyle = this.config.color.replace(
            /,(\d\.*\d*)\)/,
            (a, b) => {
              return "," + b * (1 - distance / this.config.max_distance) + ")";
            }
          ); // 'rgba(255,255,255,0.8*x)'
          this.context.beginPath();
          this.context.moveTo(this.dots[i].x, this.dots[i].y);
          this.context.lineTo(this.dots[j].x, this.dots[j].y);
          this.context.closePath();
          this.context.stroke();
        }
      }
    }
    if (this.flag) {
      this.mouseDraw();
    }
    // 上一次绘画完成以后自动执行
    this.animationFn = requestAnimationFrame(this.move.bind(this));
  }
  // 画鼠标移动点
  mouseDraw() {
    let dot = new Dot({
      x: this.mouse.x,
      y: this.mouse.y,
      xv: 0,
      yx: 0,
      color: this.config.color,
      scale: 1,
      r: 2,
    });
    dot.draw(this.context); // 画鼠标的点
    for (var i = 0; i < this.dots.length; i++) {
      let distance = Math.sqrt(
        Math.pow(this.dots[i].x - this.mouse.x, 2) +
          Math.pow(this.dots[i].y - this.mouse.y, 2),
        2
      );
      if (distance < this.config.max_distance) {
        // 创造空间 不污染全局 save restore
        this.context.save();
        this.context.strokeStyle = this.config.color.replace(
          /,(\d\.*\d*)\)/,
          (a, b) => {
            return "," + b * (1 - distance / this.config.max_distance) + ")";
          }
        ); // 'rgba(255,255,255,0.8*x)'
        this.context.beginPath();
        this.context.moveTo(this.mouse.x, this.mouse.y);
        this.context.lineTo(this.dots[i].x, this.dots[i].y);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
      }
    }
  }
  // 粒子移动
  move() {
    this.dots.forEach((item) => {
      item.x += item.xv;
      item.y += item.yv;
      if (item.x < item.r || item.x > window.innerWidth - item.r) {
        item.xv *= -1;
      }
      if (item.y < item.r || item.y > window.innerHeight - item.r) {
        item.yv *= -1;
      }
    });
    this.draw();
  }
  // 鼠标移入 配置鼠标点位置
  mouseMove(e) {
    this.flag = true;
    this.mouse.x = e.pageX;
    this.mouse.y = e.pageY;
  }
  // 鼠标移出
  mouseOut(e) {
    this.flag = false;
  }
  // 销毁
  destroyed() {
    // 销毁动画 销毁监听 并且清空画布
    cancelAnimationFrame(this.animationFn);
    this.canvas.removeEventListener("mousemove", this.mouseMove);
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

class Dot {
  // 创造点
  constructor(OPTION) {
    // 点 位置 大小 速度 移动速度 缩放比例
    let { x, y, xv, yv, color, r, scale } = OPTION;
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.color = color;
    this.r = r;
    this.scale = scale;
  }
  draw(context) {
    context.beginPath();
    context.fillStyle = this.color; // 填充颜色
    context.strokeStyle = this.color; // 线（原点）颜色
    context.arc(this.x, this.y, this.r * this.scale, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
}
