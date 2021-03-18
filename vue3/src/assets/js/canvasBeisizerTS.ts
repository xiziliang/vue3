export default class WavesurRecord {
    beisizer: HTMLCanvasElement;
    ContenofBeisizer: CanvasRenderingContext2D;
    beisizerlinewidth: number;
    config: any;
    sinX: number;
    sinY: number;
    axisLenght: number;
    waveWidth: any;
    waveHeight: number;
    speed: number;
    xofspeed: number;
    rand: number;
    animation: any;
    constructor({ id , config = {}}) {
      this.beisizer = <HTMLCanvasElement>document.getElementById(id);
      this.ContenofBeisizer = this.beisizer.getContext("2d");
      this.config = {
        linewidth: 10, //曲线
        sinY: 2.0, //轴长
        waveWidth:0.01,  //海浪高度
        waveHeight:20.0,
        speed:0.08,//数值越大速率越快
        xofspeed:10,//波浪横向的偏移量
        strokeStyle:"#FFFFFF",//线的颜色
      };
      Object.assign(this.config, config);
      this.beisizerlinewidth = this.config.linewidth;
      this.sinX = 0;
      this.sinY = this.beisizerheight / this.config.sinY; 
      this.axisLenght = this.beisizerwidth; //弧度宽度
      this.waveWidth = this.config.waveWidth;
      this.waveHeight = this.beisizerheight / this.config.waveHeight;
      this.speed = this.config.speed; 
      this.xofspeed = this.config.xofspeed; 
      this.rand = this.beisizerheight; //波浪高度
      this.ContenofBeisizer.lineWidth = this.beisizerlinewidth;
      this.drawSin();
      this.rendY();
    }
    get beisizerwidth() {
      return this.beisizer.width;
    }
    get beisizerheight() {
      return this.beisizer.height;
    }
    drawSin(xofspeed?:number){
      this.ContenofBeisizer.save(); //存放贝塞尔曲线的各个点
      let points = [];
      this.ContenofBeisizer.beginPath(); //创建贝塞尔点
      for (let x = this.sinX; x < this.sinX + this.axisLenght; x += 80 / this.axisLenght) {
        let y = -Math.sin((this.sinX + x) * this.waveWidth + xofspeed);
        points.push([x, this.rand + y * this.waveHeight]);
        this.ContenofBeisizer.lineTo(x, this.sinY + y * this.waveHeight); 
      }
      let lineColor = this.ContenofBeisizer.createLinearGradient(0,0,0,this.beisizerheight);
      lineColor.addColorStop(0.2,"#64A0FF");
      lineColor.addColorStop(1,"#5E9EFF");
      this.ContenofBeisizer.lineTo(this.axisLenght, this.beisizerheight);
      this.ContenofBeisizer.lineTo(this.sinX, this.beisizerheight);
      this.ContenofBeisizer.lineTo(points[0][0], points[0][1]);
      this.ContenofBeisizer.stroke();
      this.ContenofBeisizer.restore();
      this.ContenofBeisizer.strokeStyle = this.config.strokeStyle;
      this.ContenofBeisizer.fillStyle = lineColor; // 填充颜色是渐变的 可以自己通过代码修改 
      this.ContenofBeisizer.fill();
    }
    rendY(){
      this.ContenofBeisizer.clearRect(0, 0, this.beisizerwidth, this.beisizerheight); //控制海浪高度
      let tmp = 0.1;
      this.rand -= tmp;
      let b = this.beisizerheight - this.rand;
      //控制循环涨潮
      if (parseInt(b.toString()) == this.beisizerheight) {
        this.rand = this.beisizerheight;
      }
      this.drawSin(this.xofspeed);
      this.xofspeed += this.speed;
      this.animation = window.requestAnimationFrame(this.rendY.bind(this));
    }
    // 销毁动画
    destroyed() {
      this.ContenofBeisizer.clearRect(0, 0, window.innerWidth, window.innerHeight);
      window.cancelAnimationFrame(this.animation);
    }
  }