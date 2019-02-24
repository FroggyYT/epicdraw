var s;

var pew;
var tseries;

function preload() {
  s = io();
  pew = loadImage("/client/pew.png");
  tseries = loadImage("/client/tseries.png");
}

function setup() {
  createCanvas(600, 600);
  background(215);
  s.on("update", (d) => {
    background(215);
    sockets = d;
    for (socket of d) {
      image(pew, socket["pos"][0] - 50, socket["pos"][1] - 50, 100, 100);
    }
  });
  s.on("tseries", (d) => {
    background(215);
    for (socket of d[1]) {
      image(pew, socket["pos"][0] - 50, socket["pos"][1] - 50, 100, 100);
    }
    for (tserie of d[0]) {
      image(tseries, tserie.x - 50, tserie.y - 50, 100, 100);
    }
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
