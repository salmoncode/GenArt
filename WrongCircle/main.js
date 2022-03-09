function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(1);
}

function draw() {
  background(255);
  strokeWeight(5);

  // 円を描く間違った方法
  const step = 5;
  let lastX;
  let lastY;
  const times = 360/step;
  const centerX = width/2;
  const centerY = height/2;
  const radius = width/2 * 1/3;
  let noiseSeed = random(60);

  for(let t=0; t<times; t++) {
    const angle = t * step;
    const offset = random(60);
    // const offset = noise(noiseSeed)*60 - 30;
    // const offset = sin(radians(angle)*8) * 30 + random(30);

    noiseSeed += 0.1;
    const x = centerX + (radius * cos(radians(angle)));
    const y = centerY + (radius * sin(radians(angle)));
    const wrongX = centerX + ((radius + offset) * cos(radians(angle)));
    const wrongY = centerY + ((radius + offset) * sin(radians(angle)));

    if(lastX && lastY) {
      stroke(150);
      point(x, y);
      stroke(50);
      line(lastX, lastY, wrongX, wrongY);
    } else {
      firstX = wrongX;
      firstY = wrongY;
    }
    // lastX = wrongX;
    // lastY = wrongY;
    lastX = x;
    lastY = y;
  }
  line(lastX, lastY, firstX, firstY);

  // 塗りつぶし
  // const step = 5;
  // let firstX = 0;
  // let firstY = 0;
  // const times = 360/step;
  // const centerX = width/2;
  // const centerY = height/2;
  // const radius = width/2 * 1/3;
  // let noiseSeed = random(60);
  // fill(150);

  // beginShape();
  // for(let t=0; t<times; t++) {
  //   const angle = t * step;
  //   const offset = random(60) - 30;
  //   // const offset = noise(noiseSeed)*120 - 60;
  //   // const offset = sin(radians(angle)*8) * 30 + random(30);

  //   noiseSeed += 0.1;
  //   const x = centerX + (radius * cos(radians(angle)));
  //   const y = centerY + (radius * sin(radians(angle)));
  //   const wrongX = centerX + ((radius + offset) * cos(radians(angle)));
  //   const wrongY = centerY + ((radius + offset) * sin(radians(angle)));

  //   stroke(150);
  //   point(x, y);
  //   noStroke();
  //   curveVertex(wrongX, wrongY);
  // }
  // endShape();
}