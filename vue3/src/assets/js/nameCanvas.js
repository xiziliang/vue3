export default class nameCanvas {
  constructor({ id, w, h, btnSaveId, btnClearId }) {
    this.canvas = document.getElementById(id);
    this.saveId = document.getElementById(btnSaveId);
    this.clearId = document.getElementById(btnClearId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = w * 2;
    this.canvas.height = h * 2;
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";

    this.x = 0; // 记录鼠标起始位置
    this.y = 0;
    this.isDown = false;
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.onmousedown = this.mouseDown.bind(this);
    this.canvas.onmouseleave = this.mouseLeave.bind(this);
    this.canvas.onmouseup = this.mouseUp.bind(this);
    this.canvas.onmousemove = this.mouseMove.bind(this);
    this.saveId.onclick = this.save.bind(this);
    this.clearId.onclick = this.clear.bind(this);
  }
  mouseDown(e) {
    this.isDown = true;
    this.x = e.offsetX * 2;
    this.y = e.offsetY * 2;
  }
  mouseUp() {
    this.isDown = false;
  }
  mouseMove(e) {
    if (!this.isDown) return;
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(e.offsetX * 2, e.offsetY * 2);
    this.ctx.stroke();
    this.x = e.offsetX * 2;
    this.y = e.offsetY * 2;
  }
  mouseLeave() {
    this.isDown = false;
  }
  save() {
    let url = this.canvas.toDataURL("image/jpeg"); ///把canvas转成对应的 jpeg的 base64编码
    let a = document.createElement("a"); // 生成a标签
    a.href = url;
    a.download = "签名"; // 设置下载文件名
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
