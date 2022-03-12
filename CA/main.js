const cells = [];
const cellSize = 10;

let numX = 0;
let numY = 0;

function setup() {
  console.log("setup");
  createCanvas(windowWidth, windowHeight);
  // frameRate(1);
  numX = (int)(width/cellSize);
  numY = (int)(height/cellSize);

  reset();
}

function reset() {
  for(let i=0; i<numX; i++) {
    cells[i] = [];
    for(let j=0; j<numY; j++) {
      cells[i][j] = new Cell(i, j, cellSize);
    }
  }

  for(let i=0; i<numX; i++) {
    for(let j=0; j<numY; j++) {
      let above = j-1;
      let below = j+1;
      let left = i-1;
      let right = i+1;

      if(above < 0) above = numY-1;
      if(below == numY) below = 0;
      if(left < 0) left = numX-1;
      if(right == numX) right = 0;

      cells[i][j].addNeighbor(cells[left][above]);
      cells[i][j].addNeighbor(cells[left][j]);
      cells[i][j].addNeighbor(cells[left][below]);
      cells[i][j].addNeighbor(cells[i][below]);
      cells[i][j].addNeighbor(cells[right][below]);
      cells[i][j].addNeighbor(cells[right][j]);
      cells[i][j].addNeighbor(cells[right][above]);
      cells[i][j].addNeighbor(cells[i][above]);
    }
  }
}

function mouseReleased() {
  reset();
}

function draw() {
  console.log("draw");
  background(255);
  cells.forEach(row => row.forEach(cell => cell.update()));
  cells.forEach(row => row.forEach(cell => cell.draw()));
}

class Cell {
  constructor(i, j, cellSize) {
    this.x = i * cellSize;
    this.y = j * cellSize;
    this.state = false;
    this.nextState = false;
    this.neighbors = [];
    this.cellSize = cellSize;

    if (random(2) > 1) {
      this.nextState = true;
    } else {
      this.nextState = false;
    }

    this.state = this.nextState;
  }

  update() {
    const livingCellCount = this.neighbors.filter(n => n.state).length;
    if (this.state && livingCellCount != 2 && livingCellCount != 3) {
      this.nextState = false;
    } else if (!this.state && livingCellCount == 3) {
      this.nextState = true;
    }

    // let livingCellCount = this.neighbors.filter(n => n.state).length;
    // if (this.state) livingCellCount++;
    // if (livingCellCount > 4) {
    //   this.nextState = true;
    // } else {
    //   this.nextState = false;
    // }
    // if(livingCellCount == 4 || livingCellCount == 5) {
    //   this.nextState = !this.nextState;
    // }

    // const friend = this.neighbors[(int)(random(8))];
    // const friend2 = this.neighbors[(int)(random(8))];
    // let livingCellCount = this.neighbors.filter(n => n.state).length;
    // // if (this.state && livingCellCount != 2 && livingCellCount != 3) {
    // //   this.nextState = false;
    // // } else if (!this.state && livingCellCount == 3) {
    // //   this.nextState = true;
    // // }
    // if (!friend.state && !friend2.state) {
    //   this.nextState = false;
    // } else if(livingCellCount > 4){
    //   this.nextState = true;
    // }
  }

  draw() {
    this.state = this.nextState;
    stroke(0);
    if(this.state) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(this.x, this.y, this.cellSize, this.cellSize);
  }

  addNeighbor(cell) {
    this.neighbors.push(cell);
  }
}