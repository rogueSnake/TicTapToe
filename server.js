var express = require("express"),
    app = express(),
    http = require("http").Server(app),
    io = require("socket.io")(http);

app.use(express.static("client"));
http.listen(3000, function(){
    console.log("Listenin' to port 3000, boss.");
});

module.exports.io = io;

