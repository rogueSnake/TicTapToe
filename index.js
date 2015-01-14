var express = require("express"),
    app = express(),
    http = require("http").Server(app),
    io = require("socket.io")(http);

app.use(express.static("static"));

io.on("connection", function (socket) {
    socket.on("mod", function (position) {
        io.emit("mod", position);
    });
});

http.listen(3000, function(){
  console.log("Listenin' to port 3000, boss.");
});