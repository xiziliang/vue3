export function wavesurRecord(id) {
  //获取画布
  let beisizer = document.getElementById(id);
  let ContenofBeisizer = beisizer.getContext("2d"); //设置波浪海域（海浪宽度，高度）
  let beisizerwidth = beisizer.width;
  let beisizerheight = beisizer.height;
  let beisizerlinewidth = 10; //曲线
  let sinX = 0;
  let sinY = beisizerheight / 2.0; //轴长
  let axisLenght = beisizerwidth; //弧度宽度
  let waveWidth = 0.01; //海浪高度
  let waveHeight = beisizerheight / 20.0;
  let speed = 0.08; //数值越大速率越快
  let xofspeed = 10; //波浪横向的偏移量
  let rand = beisizerheight; //波浪高度

  ContenofBeisizer.lineWidth = beisizerlinewidth;

  // 创建静态的曲线
  function drawSin(xofspeed) {
    ContenofBeisizer.save(); //存放贝塞尔曲线的各个点
    let points = [];
    ContenofBeisizer.beginPath(); //创建贝塞尔点
    for (let x = sinX; x < sinX + axisLenght; x += 80 / axisLenght) {
      // let y = -Math.sin((sinX + x) * waveWidth);  //测试请解开注释，注释下一行
      let y = -Math.sin((sinX + x) * waveWidth + xofspeed);
      // points.push([x, sinY + y * waveHeight]); //测试请解开注释，注释下一行
      points.push([x, rand + y * waveHeight]);
      ContenofBeisizer.lineTo(x, sinY + y * waveHeight); //测试请解开注释，注释下一行
      //   ContenofBeisizer.lineTo(x, rand + y * waveHeight);
    }

    ContenofBeisizer.lineTo(axisLenght, beisizerheight);
    ContenofBeisizer.lineTo(sinX, beisizerheight);
    ContenofBeisizer.lineTo(points[0][0], points[0][1]);
    ContenofBeisizer.stroke();
    ContenofBeisizer.restore(); //贝塞尔曲线样式设置
    ContenofBeisizer.strokeStyle = "#3bc777";
    ContenofBeisizer.fillStyle = "#3bc777";
    ContenofBeisizer.fill();
  }

  function rendY() {
    ContenofBeisizer.clearRect(0, 0, beisizerwidth, beisizerheight); //控制海浪高度
    let tmp = 0.1;
    rand -= tmp;
    let b = beisizerheight - rand;
    //控制循环涨潮
    if (parseInt(b) == beisizerheight) {
      rand = beisizerheight;
    }
    drawSin(xofspeed);
    xofspeed += speed;
    requestAnimationFrame(rendY);
  }
  // 动态
  drawSin();
  rendY();
}
