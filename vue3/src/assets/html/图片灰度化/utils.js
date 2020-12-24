export function loadImage(src) {
    const img = new Image();
    img.crossOrigin = 'anonymous'; //解决图片跨域
    return new Promise((resolve) => {
        img.src = src;
        img.onload = () => {
            resolve(img);
        };
    });
}

const weak = new WeakMap();
export function myGetImageData(img, rect = [0, 0, img.width, img.height]) {
    let context;
    if (weak.has(img)) context = imageDataContext.get(img)
    else {
        const canvas = new OffscreenCanvas(img.width, img.height);
        context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        weak.set(img, context);
    }
    return context.getImageData(...rect);
}

// 循环遍历 imageData 数据
export function traverse(imageData, pass) {
    const {
        width,
        height,
        data
    } = imageData;
    for (let i = 0; i < width * height * 4; i += 4) {
        const [r, g, b, a] = pass({
            r: data[i] / 255,
            g: data[i + 1] / 255,
            b: data[i + 2] / 255,
            a: data[i + 3] / 255,
            index: i,
            width,
            height,
            x: ((i / 4) % width) / width,
            y: Math.floor(i / 4 / width) / height
        });
        data.set([r, g, b, a].map(v => Math.round(v * 255)), i);
    }
    return imageData;
}

function gaussianMatrix(radius, sigma = radius / 3) {
    const a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
    const b = -1 / (2 * sigma ** 2);
    let sum = 0;
    const matrix = [];
    for(let x = -radius; x <= radius; x++) {
      const g = a * Math.exp(b * x ** 2);
      matrix.push(g);
      sum += g;
    }
  
    for(let i = 0, len = matrix.length; i < len; i++) {
      matrix[i] /= sum;
    }
    return {matrix, sum};
  }

/**
  * 高斯模糊 
  * @param  {Array} pixes  pix array
  * @param  {Number} width 图片的宽度
  * @param  {Number} height 图片的高度
  * @param  {Number} radius 取样区域半径, 正数, 可选, 默认为 3.0
  * @param  {Number} sigma 标准方差, 可选, 默认取值为 radius / 3
  * @return {Array}
  */
 export function gaussianBlur(pixels, width, height, radius = 3, sigma = radius / 3) {
    const {matrix, sum} = gaussianMatrix(radius, sigma);
    // x 方向一维高斯运算
    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0;
  
        for(let j = -radius; j <= radius; j++) {
          const k = x + j;
          if(k >= 0 && k < width) {
            const i = (y * width + k) * 4;
            r += pixels[i] * matrix[j + radius];
            g += pixels[i + 1] * matrix[j + radius];
            b += pixels[i + 2] * matrix[j + radius];
          }
        }
        const i = (y * width + x) * 4;
        // 除以 sum 是为了消除处于边缘的像素, 高斯运算不足的问题
        pixels[i] = r / sum;
        pixels[i + 1] = g / sum;
        pixels[i + 2] = b / sum;
      }
    }
  
    // y 方向一维高斯运算
    for(let x = 0; x < width; x++) {
      for(let y = 0; y < height; y++) {
        let r = 0,
          g = 0,
          b = 0;
  
        for(let j = -radius; j <= radius; j++) {
          const k = y + j;
          if(k >= 0 && k < height) {
            const i = (k * width + x) * 4;
            r += pixels[i] * matrix[j + radius];
            g += pixels[i + 1] * matrix[j + radius];
            b += pixels[i + 2] * matrix[j + radius];
          }
        }
        const i = (y * width + x) * 4;
        pixels[i] = r / sum;
        pixels[i + 1] = g / sum;
        pixels[i + 2] = b / sum;
      }
    }
    return pixels;
  }
  export function getPixel(imageData, index) {
    const {data} = imageData;
    const r = data[index] / 255,
      g = data[index + 1] / 255,
      b = data[index + 2] / 255,
      a = data[index + 3] / 255;
    return [r, g, b, a];
  }
  export function brightness(p) {
    return [
      p, 0, 0, 0, 0,
      0, p, 0, 0, 0,
      0, 0, p, 0, 0,
      0, 0, 0, 1, 0,
    ];
  }
  
  export function saturate(p) {
    // p = clamp(0, 1, p);
    const r = 0.212 * (1 - p);
    const g = 0.714 * (1 - p);
    const b = 0.074 * (1 - p);
    return [
      r + p, g, b, 0, 0,
      r, g + p, b, 0, 0,
      r, g, b + p, 0, 0,
      0, 0, 0, 1, 0,
    ];
  }
  // 调整颜色色彩
  export function transformColor(color, ...matrix) {
    const [r, g, b, a] = color;
    matrix = matrix.reduce((m1, m2) => multiply(m1, m2));
    color[0] = matrix[0] * r + matrix[1] * g + matrix[2] * b + matrix[3] * a + matrix[4];
    color[1] = matrix[5] * r + matrix[6] * g + matrix[7] * b + matrix[8] * a + matrix[9];
    color[2] = matrix[10] * r + matrix[11] * g + matrix[12] * b + matrix[13] * a + matrix[14];
    color[3] = matrix[15] * r + matrix[16] * g + matrix[17] * b + matrix[18] * a + matrix[19];
    return color;
  }
  
  export function multiply(a, b) {
    const out = [];
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a04 = a[4]; // eslint-disable-line one-var-declaration-per-line
    const a10 = a[5], a11 = a[6], a12 = a[7], a13 = a[8], a14 = a[9]; // eslint-disable-line one-var-declaration-per-line
    const a20 = a[10], a21 = a[11], a22 = a[12], a23 = a[13], a24 = a[14]; // eslint-disable-line one-var-declaration-per-line
    const a30 = a[15], a31 = a[16], a32 = a[17], a33 = a[18], a34 = a[19]; // eslint-disable-line one-var-declaration-per-line
  
    // Cache only the current line of the second matrix
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4]; // eslint-disable-line one-var-declaration-per-line
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    out[4] = b0 * a04 + b1 * a14 + b2 * a24 + b3 * a34 + b4;
  
    b0 = b[5]; b1 = b[6]; b2 = b[7]; b3 = b[8]; b4 = b[9];
    out[5] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[6] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[7] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[8] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    out[9] = b0 * a04 + b1 * a14 + b2 * a24 + b3 * a34 + b4;
  
    b0 = b[10]; b1 = b[11]; b2 = b[12]; b3 = b[13]; b4 = b[14];
    out[10] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[11] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[12] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[13] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    out[14] = b0 * a04 + b1 * a14 + b2 * a24 + b3 * a34 + b4;
  
    b0 = b[15]; b1 = b[16]; b2 = b[17]; b3 = b[18]; b4 = b[19];
    out[15] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[16] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[17] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[18] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    out[19] = b0 * a04 + b1 * a14 + b2 * a24 + b3 * a34 + b4;
  
    return out;
  }