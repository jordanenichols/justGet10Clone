var b;
var background1;
function setup() {
  createCanvas(windowWidth, windowHeight);
  b = new Board(5);
}

function draw() {
  background(0);
  translate(b.boxSize, b.boxSize);
  b.drawBoard();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Board {
  constructor(sideLength) {
    textAlign(CENTER);
    
    var myFont = loadFont('Multicolore.otf');
    textFont(myFont);
    textStyle(BOLD);
    noStroke();
    colorMode(HSB, 100);
    this.sideLength = sideLength;
    this.boxSize = min(windowWidth, windowHeight) / (sideLength + 2);
    textSize(this.boxSize / 2);
    this.hue = 0;
    this.matrix = new Array(sideLength);
    this.raised = [];
    this.raiseY = 0;
    for (var i = 0; i < sideLength; i++) {
      this.matrix[i] = new Array(sideLength);
      for (var j = 0; j < sideLength; j++) {
        this.matrix[i][j] = ceil(random(10));
      }
    }
    console.log(this.matrix);
  }
  drawBoard() {
    for (var i = 0; i < this.sideLength; i++) {
      for (var j = 0; j < this.sideLength; j++) {
        var current = this.matrix[i][j];

        switch (current) {
          case (1):
            this.hue = 29;
            break;
          case (2):
            this.hue = 56;
            break;
          case (3):
            this.hue = 13;
            break;
          case (4):
            this.hue = 7;
            break;
          case (5):
            this.hue = 48;
            break;
          case (6):
            this.hue = 74;
            break;
          case (7):
            this.hue = 87;
            break;
          case (8):
            this.hue = 0;
            break;
          case (9):
            this.hue = 17;
            break;
          case (10):
            this.hue = 43;
            break;
        }

        if (this.inArray(i, j)) {
          fill(this.hue, 100, 60);
          rect((j) * this.boxSize, (i) * this.boxSize + (this.boxSize - (this.boxSize / 8)), this.boxSize, (this.boxSize / 8));
          fill(this.hue, 100, 95);
          square((j) * this.boxSize, (i) * this.boxSize - (this.boxSize / 8), this.boxSize);
          fill(this.hue, 90, 100);
          triangle(j * this.boxSize, i * this.boxSize - (this.boxSize / 8), j * this.boxSize + this.boxSize, i * this.boxSize - (this.boxSize / 8), j * this.boxSize + (this.boxSize / 2), i * this.boxSize + (this.boxSize - (this.boxSize / 8) - (this.boxSize / 2)));
          fill(this.hue, 100, 85);
          triangle(j * this.boxSize, i * this.boxSize + (this.boxSize - (this.boxSize / 8)), j * this.boxSize + this.boxSize, i * this.boxSize + (this.boxSize - (this.boxSize / 8)), j * this.boxSize + (this.boxSize / 2), i * this.boxSize + (this.boxSize - (this.boxSize / 8) - this.boxSize / 2));
          fill(this.hue, 100, 60);
          text(this.matrix[i][j], (j) * this.boxSize + (this.boxSize / 2), (i) * this.boxSize + (this.boxSize / 2) );

        }
        else {
          fill(this.hue, 100, 95);
          square((j) * this.boxSize, (i) * this.boxSize, this.boxSize);
          fill(this.hue, 100, 60);
          text(this.matrix[i][j], (j) * this.boxSize + (this.boxSize / 2), (i) * this.boxSize + (this.boxSize / 2) + (this.boxSize / 8));
        }
      }
    }
  }

  raise(i, j) {
    if (i < 0 || j < 0) return;
    if (!this.inArray(i, j)) this.raised.push(createVector(i, j));
    if (i > 0 && this.matrix[i][j] == this.matrix[i - 1][j] && !this.inArray(i - 1, j)) this.raise(i - 1, j);
    if (j < this.sideLength - 1 && this.matrix[i][j] == this.matrix[i][j + 1] && !this.inArray(i, j + 1)) this.raise(i, j + 1);
    if (i < this.sideLength - 1 && this.matrix[i][j] == this.matrix[i + 1][j] && !this.inArray(i + 1, j)) this.raise(i + 1, j);
    if (j > 0 && this.matrix[i][j] == this.matrix[i][j - 1] && !this.inArray(i, j - 1)) this.raise(i, j - 1);
  }

  inArray(i, j) {
    for (var k = 0; k < this.raised.length; k++) {
      if (this.raised[k].x == i && this.raised[k].y == j) return true;
    }
    return false;

  }
  press() {
    if (mouseX < this.sideLength * this.boxSize + this.boxSize && mouseY < this.sideLength * this.boxSize + this.boxSize)
      this.raise(int((mouseY - this.boxSize) / this.boxSize), int((mouseX - this.boxSize) / this.boxSize));
  }

}

class Background {
  constructor(shapeCount, small, large, maxHits) {
    this.shapeCount = shapeCount;
    this.small = small;
    this.large = large;
    this.maxHits = maxHits;
    this.shapes = [];
  }
}

class Shapes {
  constructor(x, y, smallR, largeR, maxHits) {
    this.x = x;
    this.y = y;
    this.r = random(smallR, largeR);
    this.vx = random(-3,3);
    this.vy = random(-3,3);
    this.h = random(100,200);
    this.hv = random(-1,1);
    this.hits = 0;
    this.maxHits = maxHits - 1;
    this.mediumR = largeR - smallR;
    this.prevX = x;
    this.prevY = y;
    this.maxHits = maxHits;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  updateShape() {
    this.prevX = this.x;
    this.prevY = this.y;
  }

  show
}

function mouseClicked() {
  if (b.raised.length > 0) b.raised = [];
  b.press();

}

function touchEnded() {
  if (b.raised.length > 0) b.raised = [];
  b.press();

}