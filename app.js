var express = require("express");
var app = express();
var server = require("http").Server(app);

app.get("/", function(req, res) { res.sendFile(__dirname + "/client/index.html"); });

app.use("/client", express.static(__dirname + "/client"));

server.listen(process.env.PORT || 2000);

var io = require("socket.io")(server,{});

var SOCKETS = [];

var TSERIES = [];

setInterval(() => {
  var zomX = Math.random() * 500 + 50;
  var zomY = 700;
  TSERIES.push({x:zomX, y:zomY, health:100});
}, 5000);

setInterval(() => {
  for (var i in TSERIES) {
    TSERIES[i].y -= 10;
  }
  io.emit("TSERIES[i]s", [TSERIES,SOCKETS]);
}, 500);

io.on("connection", (s) => {
  SOCKETS.push({id:s.id, pos:[300, 300]});
  var socketIndex;

  s.on("move", (d) => {
    for (var i in SOCKETS) {
      if (SOCKETS[i]["id"] == s.id) {
        socketIndex = i;
      }
    }
    if (d == "w") {
      SOCKETS[socketIndex]["pos"][1] += -0.5;
    }
    if (d == "a") {
      SOCKETS[socketIndex]["pos"][0] += -0.5;
    }
    if (d == "s") {
      SOCKETS[socketIndex]["pos"][1] += 0.5;
    }
    if (d == "d") {
      SOCKETS[socketIndex]["pos"][0] += 0.5;
    }
    io.emit("update", [TSERIES,SOCKETS]);
  });

  s.on("attack", (d) => {
    for (var i in TSERIES) {
      if (d.x < TSERIES[i].x + 25 && d.x > TSERIES[i].x - 25 && d.y < TSERIES[i].y + 25 && d.y > TSERIES[i].y - 25) {
        TSERIES[i].health -= 25;
        if (TSERIES[i].health == 0) {
          TSERIES.splice(i, 1);
        }
      }
    }
  });

  s.on("disconnect", () => {
    for (var i in SOCKETS) {
      if (SOCKETS[i]["id"] == s.id) {
        socketIndex = i;
      }
    }
    SOCKETS.splice(socketIndex, 1);
    io.emit("update", [TSERIES,SOCKETS]);
  });
});
