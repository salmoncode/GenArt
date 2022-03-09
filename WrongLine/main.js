function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(1);
}

function draw() {
  background(255);
  // 線を描く正しい方法
  // line(20, height/2, 380, height/2);

  // 線を描く間違った方法
  // const strokeLength = 360;
  // const step = 10;
  // let lastX = 20;
  // let lastY = height/2;
  // const times = strokeLength/step;

  // for(let t=0; t<times; t++) {
  //   const x = t*step + 20;
  //   const y = height/2;
  //   line(lastX, lastY, x, y);
  //   lastX = x;
  //   lastY = y;
  // }

  // 線を描く間違った方法を改造する
  const strokeLength = width - 30;
  const step = 10;
  let lastX = 20;
  let lastY = height/2;
  const times = strokeLength/step;

  for(let t=0; t<times; t++) {
    const x = t*step + 20;
    const y = height/2 + random(40) - 20;
    line(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }
  // noLoop();
}