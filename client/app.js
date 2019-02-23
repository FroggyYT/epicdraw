var s;

var sockets;

function preload() {
  s = io();
}

function setup() {
  createCanvas(600, 600);
  background(51);
  s.on("update", (d) => {
    background(51);
    fill(0, 0, 255);
    stroke(0);
    sockets = d;
    for (socket of d) {
      ellipse(socket["pos"][0], socket["pos"][1], 25, 25);
    }
  });
  s.on("zombie", (d) => {
    setInterval((d) => {
      background(51);
      fill(0, 255, 0);
      stroke(0);
      ellipse(d.x, d.y, 25, 25);
      d.x += 3;
      d.y += 3;
      s.emit("forceUpdate");
    }, 500);
  });
}

function draw() {

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
