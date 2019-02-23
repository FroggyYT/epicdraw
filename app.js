var express = require("express");
var app = express();
var server = require("http").Server(app);

app.get("/", function(req, res) { res.sendFile(__dirname + "/client/index.html"); });

app.use("/client", express.static(__dirname + "/client"));

server.listen(process.env.PORT || 2000);

var io = require("socket.io")(server,{});

var SOCKETS = [];

setInterval(() => {
  var zomX = Math.random() * 600;
  var zomY = 650;
  io.emit("zombie", {x:zomX, y:zomY});
}, 1000);

io.on("connection", (s) => {
  SOCKETS.push({id:s.id, pos:[300, 300]});
  var socketIndex;
  s.on("forceUpdate", () => {
    io.emit("update", SOCKETS);
  });
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
    io.emit("update", SOCKETS);
  });
  s.on("disconnect", () => {
    for (var i in SOCKETS) {
      if (SOCKETS[i]["id"] == s.id) {
        socketIndex = i;
      }
    }
    SOCKETS.splice(socketIndex, 1);
    io.emit("update", SOCKETS);
  });
});
