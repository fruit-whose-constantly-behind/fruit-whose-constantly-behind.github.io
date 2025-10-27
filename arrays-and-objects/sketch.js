// Arrays and Objects: Very Hunger Caterpillar Simulation
// Afrukhta Siddique
// Date: October 26, 2025
//
// Extra for Experts: 
// - I used shift() and filter() for arrays, and lerp() (to gradually fade out my circles)

//Sources:
//https://www.geeksforgeeks.org/javascript/create-an-object-that-follows-the-mouse-pointer-using-p5-js/,
//https://www.jhkinfotech.com/blog/cursor-animations-with-css-javascript-code-snippets
//https://speckyboy.com/css-javascript-cursor-effects/
//https://stackoverflow.com/questions/22592773/how-to-spawn-objects-randomly-on-a-line-using-javascript-html5
//https://jsfiddle.net/m1erickson/G2r2r/
//https://www.w3schools.com/js/default.asp
//Credits to my older sister for helping me with this project!

let radius = 20;
let movingCircle = [];
let shrink = 0.95;
let trailLimit = 150;
let appleArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //spawns a few apples in random positions
  for (let i = 0; i < 5; i++) {
    appleSpawn(random(width), random(height));
  }
}

function draw() {
  background(220); 

  //updates apples
  moveApple();
  bounceApple();
  showApple();

  //draws caterpillar and adds the trailing circles
  makeCirclePointer();
  trailingCircles();

  //makes apples disappear if hit by the caterpillar
  eatApples();
}

function makeCirclePointer() {
  fill(98, 191, 132);
  circle(mouseX, mouseY, radius * 2);
}

function trailingCircles() {
  //adds a new circle at the mouse position
  movingCircle.push({
    x: mouseX,
    y: mouseY, 
    r: radius
  });

  //removes oldest circles if there are too many 
  if (movingCircle.length > trailLimit) {
    movingCircle.shift();
  }

  //loops through each circle and draws it
  for (let i = 0; i < movingCircle.length; i++) {
    let blob = movingCircle[i];

    //makes each circle in the trail shrink
    blob.r = blob.r * shrink;

    //makes bigger circles more visible, and smaller ones more transparant
    let alphaValue = map(blob.r, 0, radius, 0, 200);
    fill(98, 191, 132, alphaValue);

    //creates the trail of circles
    if (blob.r > 1) {
      circle(blob.x, blob. y, blob.r * 2);
    }
  }

  //removes circles if they are too small
  movingCircle = movingCircle.filter(blob => blob.r > 1);
}

function appleSpawn(_x, _y) {
  let newApple = {
    x: _x, 
    y: _y, 
    xSpeed: random(-3, 3), //random horizontal speed
    ySpeed: random(-3, 3), //random vertical speed
    radius: 20,
  };

  appleArray.push(newApple);
}

function moveApple() {
  //update each apple's position based on its speed 
  for (let apple of appleArray) {
    apple.x = apple.x + apple.xSpeed;
    apple.y = apple.y + apple.ySpeed;
  }
}

function bounceApple() {
  //makes apples "bounce" if they hit an edge of the window
  for (let apple of appleArray) {
    if (apple.x < apple.radius || apple.x > width - apple.radius) {
      apple.xSpeed = apple.xSpeed * -1;
    }
    if (apple.y < apple.radius || apple.y > height - apple.radius) {
      apple.ySpeed = apple.ySpeed * -1;
    }
  }
}

function showApple() {
  for (let apple of appleArray) {
    //red apple body
    fill(163, 49, 62);
    circle(apple.x, apple.y, apple.radius * 2);

    //brown stem
    fill(60, 30, 10);
    rect(apple.x - 2, apple.y - apple.radius - 6, 4, 8, 2);

    //green leaf
    fill(40, 150, 60);
    ellipse(apple.x + 6, apple.y - apple.radius - 2, 10, 5);
  }
}

function eatApples() {
  //checks if apples hit the caterpillar head
  for (let i = appleArray.length - 1; i >= 0; i--) {
    let apple = appleArray[i];
    let d = dist(mouseX, mouseY, apple.x, apple.y);

    if (d < radius + apple.radius) {
      appleArray.splice(i, 1); //removes apple
      radius = min(radius + 2, 60);
      appleSpawn(random(width), random(height));//spawn new apple
    }
  }
  
  //returns radius back to 20 over time
  radius = lerp(radius, 20, 0.01);
}

//pressing space spawns a new apple
function keyPressed() {
  if (key === " ") {
    appleSpawn(random(width), random(height));
  }
}

//resizes canvas to fit window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}