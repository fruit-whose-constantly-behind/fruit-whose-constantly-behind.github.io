// Project Title
// Afrukhta Siddique
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let radius = 10;
let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  makeCirclePointer();
  mousePressed();
}

function makeCirclePointer() {
  circle(mouseX, mouseY, radius*2);
}

function mousePressed() {
  triangle(mouseX, mouseY - radius, mouseX - radius, mouseY - radius*2, mouseX + radius, mouseY - radius*2);
  triangle(mouseX + radius, mouseY, mouseX + radius*2, mouseY - radius, mouseX + radius*2, mouseY + radius);
  triangle(mouseX, mouseY + radius, mouseX - radius, mouseY + radius*2, mouseX + radius, mouseY + radius*2);
  triangle(mouseX - radius, mouseY, mouseX - radius*2, mouseY - radius, mouseX - radius*2, mouseY + radius);
}

function changeShape() {
  shapes = [triangle, circle, square];
}

