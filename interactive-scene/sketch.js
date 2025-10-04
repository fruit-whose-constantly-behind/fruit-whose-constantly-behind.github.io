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
    stroke(0);
    line(0, row.y, width, row.y);

    let hovering = abs(mouseY - row.y) <= triggerDistance;

    let justHovered = hovering && !row.wasHovering;
    let intervalBetweenSpikes = frameCount - row.lastSpike >= timeBetweenSpikes;
    let activeSpikes = row.spikes.length > 0;

    if (hovering && (justHovered || intervalBetweenSpikes || !activeSpikes)) {
      row.spikes.push({ x: mouseX, triW: 30 });
      row.lastSpike = frameCount;
    }

    for (let i = row.spikes.length - 1; i >= 0; i--) {
      let spike = row.spikes[i];

      spike.x += speed;
      spike.triW *= shrink;

      if (spike.triW < 1 || spike.x - spike.triW > width) {
        row.spikes.splice(i, 1);
      }

      let leftCorner = spike.x - spike.triW;
      let rightCorner = spike.x + spike.triW;
      let peak = row.y - 2 * spike.triW;

      stroke(currentColor);
      line(0, row.y, leftCorner, row.y);
      line(leftCorner, row.y, spike.x, peak);
      line(spike.x, peak, rightCorner, row.y);
      line(rightCorner, row.y, width, row.y);
    }

    row.wasHovering = hovering;
  }
}

function keyPressed() {
  if (keyCode === ENTER || keyCode === RETURN) {
    currentColor = color(random(255), random(255), random(255));
  }
}