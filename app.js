var express = require("express");
var app = express();
var server = require("http").Server(app);

app.get("/", function(req, res) { res.sendFile(__dirname + "/client/index.html"); });

app.use("/client", express.static(__dirname + "/client"));

server.listen(process.env.PORT || 2000);

var io = require("socket.io")(server,{});

var SOCKETS = [];

io.on("connection", (s) => {
  SOCKETS.push({id:s.id, points:[{x:-110,y:-110}]});
  var socketIndex;
  
  s.on("disconnect", () => {
    for (var i in SOCKETS) {
      if (SOCKETS[i]["id"] == s.id) {
        socketIndex = i;
      }
    }
    SOCKETS.splice(socketIndex, 1);
  });
  
  s.on("draw", d => {
    for (var i in SOCKETS) {
      if (SOCKETS[i]["id"] == s.id) {
        socketIndex = i;
      }
    }
    SOCKETS[socketIndex].points.push({x:d.x,y:d.y});
    io.emit("update", SOCKETS);
  });
});
