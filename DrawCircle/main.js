num = 10;
const circles = [];

function setup() {
  console.log("setup");
  createCanvas(windowWidth, windowHeight);
  // frameRate(1);
  fill(150, 50);
}

function draw() {
  console.log("draw");
  background(255);
  circles.forEach(circle => {
    circle.update(circles);
    // circle.draw()
  });
}

function mouseReleased() {
  console.log("setup");
  drawCircles();
}

drawCircles = () => {
  for(let i=0; i<num; i++) {
    const circle = new Circle();
    circles.push(circle);
  }
}

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radius = random(100) + 10;
    this.fillCol = color(random(255), random(255), random(255));
    this.lineCol = color(random(255), random(255), random(255));
    this.alpha = color(random(255));

    this.speedX = random(10) - 5;
    this.speedY = random(10) - 5;
  }

  draw = () => {
    noStroke();
    fill(this.fillCol, this.alpha);
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
    stroke(this.lineCol, 150);
    noFill();
    ellipse(this.x, this.y, 10, 10);
  }

  update = circles => {
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x > (width+this.radius)) this.x = 0 - this.radius;
    if(this.x < (0-this.radius)) this.x = width + this.radius;
    if(this.y > (height+this.radius)) this.y = 0 - this.radius;
    if(this.y < (0-this.radius)) this.x = height + this.radius;

    circles.forEach(circle => {
      if(circle == this) return;
      const distance = dist(circle.x, circle.y, this.x, this.y);
      let overlap = distance - this.radius - circle.radius;
      if(overlap >= 0) return;
      const midX = (this.x + circle.x)/2;
      const midY = (this.y + circle.y)/2;
      stroke(0, 100);
      noFill();
      overlap *= -1;
      ellipse(midX, midY, overlap, overlap);
    })
  }

}