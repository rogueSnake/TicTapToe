var database = require("./database.js"),
    server = require("./server.js");

server.on("connection", function (socket) {

    socket.on("requestGrid", function () {
        database.getGrid(function (grid) {
            server.emit("broadcastGrid", grid);
        });
    });
/*
    database.getGrid(function (grid) {
        console.log(grid);
        server.emit("broadcastGrid", grid);
    });
*/
    socket.on("mod", function (position) {
        server.emit("mod", position);
    });
});

