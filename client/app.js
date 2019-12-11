var s;

function preload() {
  s = io();
}

function setup() {
  createCanvas(800, 600);
  background(51);
}

s.on("update", d => {
  background(51);
  for (var i of d) {
    for (var j of d.points) {
      fill(255);
      noStroke();
      ellipse(j.x, j.y, 5, 5); 
    }
  }
});

function mouseDragged() {
  s.emit("draw", {x:mouseX, y:mouseY});
}

function mousePressed() {
  s.emit("draw", {x:mouseX, y:mouseY}); 
}
