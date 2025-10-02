let triWidth;
let x1;
let y1;
let x2;
let x3;
let x4;
let triHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  strokeWeight(5);
  line(x1, y1, x2, y1);
  line(x3, y1, x4, y1);
  makeSpike();
}

function makeSpike() {
  triWidth = 50;
  if (mouseY >= height/2 && mouseY <= height/2 + 50 || mouseY <= height/2 && mouseY >= height/2 - 50) {
    x1 = 0;
    y1 = height/2;
    x2 = mouseX - triWidth;
    x3 = mouseX + triWidth;
    x4 = width;
    triHeight = height/2 - 2*triWidth;
    
    for (let i; i > 0; i = 6) {
      x1 = 0;
      y1 = height/2;
      x2 = x2 + 50;
      x3 = x3 + 50;

      line(x1, y1, x2, y1);
      noFill();
      line(x2, y1, mouseX, triHeight);
      line(mouseX, triHeight, x3, y1);
    }
  }
  
  else {
    x1 = x3 = 0;
    y1 = y3;
    x2 = x4 = width;
    y2 = y4;
    line(x1, y1, x2, y2);
    line(x3, y3, x4, y4);
  }
}
