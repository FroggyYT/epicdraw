var color;

var s;

function preload() {
  color = [0,0,0];
  s = io();
}

function setup() {
  createCanvas(600, 600);

  background(215);

  document.getElementById("display-color").style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;

  document.getElementById("confirm-color").addEventListener("click", () => {
    color = document.getElementById("color").value.split(",");
    for (i of color) {
      i = JSON.parse(i);
    }
    document.getElementById("display-color").style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;
  });
}

function draw() {
  s.on("draw", (d) => {
    fill(d.color[0], d.color[1], d.color[2]);
    noStroke();
    ellipse(d.x, d.y, 25, 25);
  });
}

function mouseDragged() {
  s.emit("draw", {x:mouseX, y:mouseY, color:color});
}
