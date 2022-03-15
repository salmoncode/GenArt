const boids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i<40; i++) {
    boids.push(new Boid(windowWidth, windowHeight));
  }
  // frameRate(1);
}

function draw() {
  background(0);

  boids.forEach(boid => {
    boid.calcVector(boids);
  });

  boids.forEach(boid => {
    boid.update(boids);
    boid.draw();
  });
}

class Boid {
  constructor(width_, height_) {
    this.position = {x: random(width_), y: random(height_)};
    this.maxVelocity = 5;
    this.velocity = {x: random(this.maxVelocity), y: random(this.maxVelocity)};
    this.accel = {x: 0, y: 0};
    this.size = 20;
    this.viewDistance = this.size * 8;
    this.space = this.size * 1.5;
    this.look = false;
    this.lastAngle = 0;
    // console.log(this.position.x, this.position.y);
  }

  update() {
    this.lastPosition = {x: this.position.x, y: this.position.y}
    this.move();
    this.accel = {x: 0, y: 0};
  }

  calcVector(boids) {
    const neighbors = boids.filter(boid => boid != this && dist(boid.position.x, boid.position.y, this.position.x, this.position.y) < this.viewDistance)
    if(neighbors.length == 0) {
      this.look = false;
      return;
    }

    this.look = true;

    const vectors = [
      this.separation(neighbors),
      this.alignment(neighbors),
      this.cohension(neighbors)
    ];

    const sumVectors = vectors.reduce((sum, vector) => {
      sum.x += vector.x;
      sum.y += vector.y;
      return sum;
    }, {x:0, y:0});

    this.accel.x += sumVectors.x;
    this.accel.y += sumVectors.y;
  }

  separation(boids) {
    const sumVectors = boids.reduce((sum, boid) => {
        const difVector = {
          x: this.position.x - boid.position.x,
          y: this.position.y - boid.position.y
        }
        sum.x += difVector.x / pow(this.magnitude(difVector), 2);
        sum.y += difVector.y / pow(this.magnitude(difVector), 2);
        return sum;
    }, {x:0, y:0});
    // console.log(sumVectors)

    const averageVector = {
      x: sumVectors.x / boids.length,
      y: sumVectors.y / boids.length
    }
    // console.log(this.normalize(averageVector))
    return this.normalize(averageVector);
  }

  alignment(boids) {
    const sumVector = boids.reduce((sum, boid) => {
      sum.x += boid.velocity.x;
      sum.y += boid.velocity.y;
      return sum;
    }, {x:0, y:0});

    const averageVector = {
      x: (sumVector.x / boids.length) - this.velocity.x,
      y: (sumVector.y / boids.length) - this.velocity.y
    }
    // console.log(this.normalize(averageVector))
    return this.normalize(averageVector);
  }

  cohension(boids) {
    const sumPosition = boids.reduce((sum, boid) => {
      sum.x += boid.position.x;
      sum.y += boid.position.y;
      return sum;
    }, {x:0, y:0});

    const averageVector = {
      x: (sumPosition.x / boids.length) - this.position.x,
      y: (sumPosition.y / boids.length) - this.position.y
    }

    // console.log(this.normalize(averageVector));

    return this.normalize(averageVector);
  }

  normalize(vector) {
    if(vector.x == 0 && vector.y == 0) {
      return {x: 0, y: 0};
    }
    const size = this.magnitude(vector);
    return {
      x: vector.x/size,
      y: vector.y/size,
    }
  }

  magnitude(vector) {
    return Math.pow(Math.pow(vector.x, 2) + Math.pow(vector.y, 2), 1/2)
  }

  move() {
    this.velocity.x += this.accel.x;
    this.velocity.y += this.accel.y;

    if (this.velocity.x > this.maxVelocity) {
      this.velocity.x = this.maxVelocity;
    }
    if (this.velocity.x < -this.maxVelocity) {
      this.velocity.x = -this.maxVelocity;
    }
    if (this.velocity.y > this.maxVelocity) {
      this.velocity.y = this.maxVelocity;
    }
    if (this.velocity.y < -this.maxVelocity) {
      this.velocity.y = -this.maxVelocity;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  draw() {
    push();
    // console.log(this.position.x, this.position.y);
    // noStroke();
    // if(this.look) {
    //   fill(0, 0, 220, 100);
    // }else {
    //   fill(220, 100);
    // }
    // ellipse(this.position.x, this.position.y, this.viewDistance*2, this.viewDistance*2);

    stroke(255);
    strokeWeight(2);
    noFill();
    translate(this.position.x, this.position.y);
    const angle = atan2(this.lastPosition.y - this.position.y , this.lastPosition.x - this.position.x);
    if(abs(this.lastAngle - degrees(angle)) > 45) {
      this.lastAngle = degrees(angle);
    }
    rotate(radians(this.lastAngle));
    const topX = -this.size
    const topY = 0
    const rightX =  0
    const rightY =  this.size/4
    const leftX =  0
    const leftY =  -this.size/4
    triangle(topX, topY, rightX, rightY, leftX, leftY);
    point(0,0);
    point(topX,0);
    pop();
  }
}