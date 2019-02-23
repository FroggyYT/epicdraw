var express = require("express");
var app = express();
var server = require("http").Server(app);

app.get("/", function(req, res) { res.sendFile(__dirname + "/client/index.html"); });

app.use("/client", express.static(__dirname + "/client"));

server.listen(process.env.PORT || 2000);

var io = require("socket.io")(server,{});

var SOCKETS = [];

io.on("connection", (s) => {
  SOCKETS.push({id:s.id, pos:[300, 300]});
  var socketIndex;
  s.on("move", (d) => {
    for (i in SOCKETS) {
      if (SOCKETS[i]["id"] == s.id) {
        socketIndex = i;
      }
    }
    if (d == "w") {
      SOCKETS[i]["pos"][1] += -0.5;
    }
    if (d == "a") {
      SOCKETS[i]["pos"][0] += -0.5;
    }
    if (d == "s") {
      SOCKETS[i]["pos"][1] += 0.5;
    }
    if (d == "d") {
      SOCKETS[i]["pos"][0] += 0.5;
    }
    io.emit("update", SOCKETS);
  });
  s.on("disconnect", () => {
    for (i in SOCKETS) {
      if (SOCKETS[i]["id"] == s.id) {
        socketIndex = i;
      }
    }
    SOCKETS.splice(i, 1);
  });
});
