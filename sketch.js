/** CURRENT ISSUES
* -Need to flip arrays in b.matrix to allow easier implementation of condense method
* -Add condense method -- When box in raised array is clicked, remove all boxes other than the one selected
* and move down boxes above the removed boxes to replace them. Spaces left empty will be replaced by random
* boxes
* -Implement Background animation
* -Implement Score
* -Implement UI(Pause, Restart, etc.)
*/
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
    for (var i = 0; i < sideLength; i++) {
      this.matrix[i] = new Array(sideLength); //i is x values 
      for (var j = 0; j < sideLength; j++) {
        this.matrix[i][j] = ceil(random(3)); //j is y values
      }
    }
    console.log(this.matrix);
  }
  drawBoard() {
    for (var j = 0; j < this.sideLength; j++) {
      for (var i = 0; i < this.sideLength; i++) {
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
          rect((i) * this.boxSize, (j) * this.boxSize + (this.boxSize - (this.boxSize / 8)), this.boxSize, (this.boxSize / 8));
          fill(this.hue, 100, 95);
          square((i) * this.boxSize, (j) * this.boxSize - (this.boxSize / 8), this.boxSize);
          fill(this.hue, 90, 100);
          triangle(i * this.boxSize, j * this.boxSize - (this.boxSize / 8), i * this.boxSize + this.boxSize, j * this.boxSize - (this.boxSize / 8), i * this.boxSize + (this.boxSize / 2), j * this.boxSize + (this.boxSize - (this.boxSize / 8) - (this.boxSize / 2)));
          fill(this.hue, 100, 85);
          triangle(i * this.boxSize, j * this.boxSize + (this.boxSize - (this.boxSize / 8)), i * this.boxSize + this.boxSize, j * this.boxSize + (this.boxSize - (this.boxSize / 8)), i * this.boxSize + (this.boxSize / 2), j * this.boxSize + (this.boxSize - (this.boxSize / 8) - this.boxSize / 2));
          fill(this.hue, 100, 60);
          text(this.matrix[i][j], (i) * this.boxSize + (this.boxSize / 2), (j) * this.boxSize + (this.boxSize / 2));

        }
        else {
          fill(this.hue, 100, 95);
          square((i) * this.boxSize, (j) * this.boxSize, this.boxSize);
          fill(this.hue, 100, 60);
          text(this.matrix[i][j], (i) * this.boxSize + (this.boxSize / 2), (j) * this.boxSize + (this.boxSize / 2) + (this.boxSize / 8));
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

    if (mouseY < this.sideLength * this.boxSize + this.boxSize && mouseX < this.sideLength * this.boxSize + this.boxSize) {
      if (this.inArray(int((mouseX - this.boxSize) / this.boxSize), int((mouseY - this.boxSize) / this.boxSize))) {
        //condense thing
      } else {
        if (b.raised.length > 0) b.raised = [];
        this.raise(int((mouseX - this.boxSize) / this.boxSize), int((mouseY - this.boxSize) / this.boxSize));
      }
    }
  }
  condenseBlocks() {
    for(var i = 0; i < this.matrix.length; i++)  {
      
    }
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
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.h = random(100, 200);
    this.hv = random(-1, 1);
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

  b.press();

}

function touchEnded() {
  if (b.raised.length > 0) b.raised = [];
  b.press();

}