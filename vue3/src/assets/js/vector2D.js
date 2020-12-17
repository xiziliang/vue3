class Vector2D extends Array {
    constructor(x = 1, y = 0) {
      super(x, y);
    }
    get x() {
      // v.x; // 在赋值是只调用set 在读取值时只调用get
      return this[0];
    }
    get y() {
      return this[1];
    }
    set x(v) {
      // v.x; // 在赋值是只调用set 在读取值时只调用get
      return (this[0] = v);
    }
    set y(v) {
      return (this[1] = v);
    }
    get lengths() {
      return Math.hypot(this.x, this.y);
    }
    get dir() {
      return Math.atan2(this.y, this.x); //返回从原点(0,0)到(x,y)点的线段与x轴正方向之间的平面角度(弧度值)，也就是Math.atan2(y,x)
    }
    copy() {
      return new Vector2D(this.x, this.y);
    }
    add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
    scale(a) {
      this.x *= a;
      this.y *= a;
      return this;
    }
    // 叉乘
    cross(v) {
      return this.x * v.y - this.y * v. x;
    }
    // 点成
    dot(v) {
      return this.x * v.x + this.y * v.y;
    }
    // 归一化
    normalize() { 
      //  v0 * 1/v0的模
      return this.scale(1 / this.lengths);
    }
    rotate(rad) {
      const c = Math.cos(rad), //对应度数的余弦值
        s = Math.sin(rad); // 对应度数的正弦值
      const [x, y] = this;
      this.x = x * c + y * -s; //?  = x/r * x - y* y/r = (x2 - y2) / (x2 + y2)
      this.y = x * s + y * c; //?   = y/r * x + y*x/r = (x2 * y2)/(x2 + y2)
      return this;
    }
  }

  export default Vector2D;
