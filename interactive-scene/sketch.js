//Afrukhta Siddique
//Computer Science 30
//Oct 3, 2025

//Interactive Scene: Lines with spikes that appear when hovering

//Extra for Experts: I learned how to use arrays and objects - including funcitons like push() and splice(). I also experimented with the infinity property in javascript.

/* Credits: Thank you to my older sister and Angelina Zhu for their help on this project. 

Sources used to help develop the project are:
https://www.w3schools.com/jsref/jsref_push.asp
https://www.w3schools.com/Jsref/jsref_infinity.asp
https://www.w3schools.com/jsref/jsref_splice.asp
https://www.youtube.com/watch?v=RVxuGCWZ_8E */

let spaceBetweenRows = 10;       
let triggerDistance = 10;          
let timeBetweenSpikes = 120;   
let speed = 3;
let shrink = 0.95;
let rows = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  buildRows();
  currentColor = color(random(255), random(255), random(255));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Starts at the top and goes down by margins of spaceBetweenRows. Sets the values that will be used for drawing the lines.
function buildRows() {
  for (let y = spaceBetweenRows; y <= height - spaceBetweenRows; y += spaceBetweenRows) {
    rows.push({ y, spikes: [], lastSpike: -Infinity, wasHovering: false });
  }
}

function draw() {
  background(220);
  strokeWeight(5);
  makeSpikes();
}

function makeSpikes() {
   for (row of rows) {
     //Draws the initial horizonal lines in black
    stroke(0);
    line(0, row.y, width, row.y);

    //Check if mouse is within the triggerDistance of the row
    let hovering = abs(mouseY - row.y) <= triggerDistance;

    let justHovered = hovering && !row.wasHovering; //True only when mouse first hovers during the current frame
    let intervalBetweenSpikes = frameCount - row.lastSpike >= timeBetweenSpikes; //Makes sure enough frames have passed become making a new spike
    let activeSpikes = row.spikes.length > 0; //Checks if any spikes currently exist in this row

    if (hovering && (justHovered || intervalBetweenSpikes || !activeSpikes)) {
      
      row.spikes.push({ x: mouseX, triW: 30 }); //Sets dimensions of the spike
      row.lastSpike = frameCount; //Record current frame to limit amount of spikes made
    }

    //Loop backwards through the spikes to update and remove old ones 
    for (let i = row.spikes.length - 1; i >= 0; i--) {
      let spike = row.spikes[i];

      spike.x += speed;
      spike.triW *= shrink;

      
      //Remove spike if it gets to small or moves off screen
      if (spike.triW < 1 || spike.x - spike.triW > width) {
        row.spikes.splice(i, 1);
      }

      //Making triangle coordinates
      let leftCorner = spike.x - spike.triW;
      let rightCorner = spike.x + spike.triW;
      let peak = row.y - 2 * spike.triW;

      stroke(currentColor);
      line(0, row.y, leftCorner, row.y);
      line(leftCorner, row.y, spike.x, peak);
      line(spike.x, peak, rightCorner, row.y);
      line(rightCorner, row.y, width, row.y);
    }

    //Updates the hover state for the next frame
    row.wasHovering = hovering;
  }
}

//If the enter or return key is pressed, change the color that appears when hovering
function keyPressed() {
  if (keyCode === ENTER || keyCode === RETURN) {
    currentColor = color(random(255), random(255), random(255));
  }
}