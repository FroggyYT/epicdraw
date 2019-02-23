var s;

function preload() {
  s = io();
}

function setup() {
  createCanvas(600, 600);
  background(51);
}

function draw() {
  s.on("update", (d) => {
    background(51);
    fill(0, 0, 255);
    stroke(0);
    for (socket of d) {
      ellipse(socket["pos"][0], socket["pos"][1], 25, 25);
    }
  });
}

var movingW = false;
var movingA = false;
var movingS = false;
var movingD = false;

setInterval(() => {
  if (movingW) {
    s.emit("move", "w");
  }
  if (movingA) {
    s.emit("move", "a");
  }
  if (movingS) {
    s.emit("move", "s");
  }
  if (movingD) {
    s.emit("move", "d");
  }
}, 1);

function keyPressed() {
  if (key == "w" || key == "W") {
    movingW = true;
  }
  if (key == "a" || key == "A") {
    movingA = true;
  }
  if (key == "s" || key == "S") {
    movingS = true;
  }
  if (key == "d" || key == "D") {
    movingD = true;
  }
}

function keyReleased() {
  if (key == "w" || key == "W") {
    movingW = false;
  }
  if (key == "a" || key == "A") {
    movingA = false;
  }
  if (key == "s" || key == "S") {
    movingS = false;
  }
  if (key == "d" || key == "D") {
    movingD = false;
  }
}
