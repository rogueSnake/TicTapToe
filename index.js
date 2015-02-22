var database = require("./database.js"),
    server = require("./server.js");

server.io.on("connection", function (socket) {

    socket.on("requestGrid", function () {
        database.getGrid(function (grid) {
            server.io.emit("broadcastGrid", grid);
        });
    });

    socket.on("requestChange", function (position) {
        database.changeGrid(position);
        server.io.emit("broadcastChange", position);
    });
});

