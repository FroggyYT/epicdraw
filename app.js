var express = require("express");
var app = express();
var server = require("http").Server(app);

app.get("/", function(req, res) { res.sendFile(__dirname + "/client/index.html"); });

app.use("/client", express.static(__dirname + "/client"));

server.listen(process.env.PORT || 2000);

var io = require("socket.io")(server,{});

io.on("connection", (s) => {
  s.on("draw", (d) => {
    io.emit("draw", d);
    console.log("Got");
  });
});
