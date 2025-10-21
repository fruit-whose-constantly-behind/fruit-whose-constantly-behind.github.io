// Project Title
// Afrukhta Siddique
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//For me: trying to make a mouse pointer that is followed by a trail of small triangles??? start with circles and see how it goes. If there is time make a cute little halloween ghost 
//https://www.geeksforgeeks.org/javascript/create-an-object-that-follows-the-mouse-pointer-using-p5-js/,
https://www.jhkinfotech.com/blog/cursor-animations-with-css-javascript-code-snippets, https://speckyboy.com/css-javascript-cursor-effects/


let radius = 10;
let movingTriangle = [];
let movingCircle = [];
let tri1x1 = mouseX;
let tri1y1 = mouseY - radius;
let tri1x2 = mouseX - radius;
let tri1y2 = mouseY - radius*2;
let tri1x3 = mouseX + radius;
let tri1y3 = mouseY + radius;

let x = 0;
let y = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  makeCirclePointer();
  trailingCircle();
}

function makeCirclePointer() {
  circle(mouseX, mouseY, radius*2);
  triangle(tri1x1, tri1y1, tri1x2, tri1y2, tri1x3, tri1y3);
  triangle(mouseX + radius, mouseY, mouseX + radius*2, mouseY - radius, mouseX + radius*2, mouseY + radius);
  triangle(mouseX, mouseY + radius, mouseX - radius, mouseY + radius*2, mouseX + radius, mouseY + radius*2);
  triangle(mouseX - radius, mouseY, mouseX - radius*2, mouseY - radius, mouseX - radius*2, mouseY + radius);
}

function trailingCircle() {  
movingTriangle.push({
  x1: mouseX + radius,
  y1: mouseY, 
  x2: mouseX + radius*2,
  y2: mouseY - radius, 
  x3: mouseX + radius*2, 
  y3: mouseY + radius, 
})

movingCircle.push({
  xValue: mouseX + radius,
  yValue: mouseY, 
})
movingTriangle.x1 = movingTriangle + 50;

for (let i = 0; i < (windowHeight/50); i = i + 50) {
  movingCircle.xValue = movingCircle.xValue += (mouseX - x) * 0.04;
  movingCircle.yValue = movingCircle.yvalue += (mouseY - y) * 0.04;
  fill(0);
  circle(movingCircle.xValue, movingCircle.y, 25, 25);
}
  //Trailing circle
  x += (mouseX - x) * 0.04;
  y += (mouseY - y) * 0.04;
  fill(0);
  circle(x, y, 25, 25);

  // x += (mouseX - x) * 0.04;
  // y += (mouseY - y) * 0.04;
  // fill(0);
  // circle(x, y, 25, 25);
}
