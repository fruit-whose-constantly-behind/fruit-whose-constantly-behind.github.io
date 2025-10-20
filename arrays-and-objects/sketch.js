// Project Title
// Afrukhta Siddique
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let radius = 10;
let shapes = [];
let tri1x1 = mouseX;
let tri1y1 = mouseY - radius;
let tri1x2 = mouseX - radius;
let tri1y2 = mouseY - radius*2;
let tri1x3 = mouseX + radius;
let tri1y3 = mouseY + radius;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  makeCirclePointer();
  keyPressed();
}

function makeCirclePointer() {
  circle(mouseX, mouseY, radius*2);
  triangle(tri1x1, tri1y1, tri1x2, tri1y2, tri1x3, tri1y3);
  triangle(mouseX + radius, mouseY, mouseX + radius*2, mouseY - radius, mouseX + radius*2, mouseY + radius);
  triangle(mouseX, mouseY + radius, mouseX - radius, mouseY + radius*2, mouseX + radius, mouseY + radius*2);
  triangle(mouseX - radius, mouseY, mouseX - radius*2, mouseY - radius, mouseX - radius*2, mouseY + radius);
}

function keyPressed() {
  let moveSpeed = 10;
  while ( x < windowWidth && y < windowHeight) {
    triangle(tri1x1, tri1y1, tri1x2, tri1y2, tri1x3, tri1y3);
    tri1y1 = tri1y1 + moveSpeed;
    tri1y2 = tri1y2 + moveSpeed;
    tri1y3 = tri1y3 + moveSpeed;
  }
}




function changeShape() {
  shapes = [triangle, circle, square];
}

