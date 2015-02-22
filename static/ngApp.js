var TTT = {};

TTT.socket = io();

TTT.app = angular.module("app", []);

TTT.app.controller("appCtrl", function ($scope) {
    var i = 0,
        protoRow =  {
            columnA: "?",
            columnB: "?",
            columnC: "?"
        };

    $scope.grid = [];

    for (i = 0; i < 3; i += 1) {
        $scope.grid.push(Object.create(protoRow));
    }

    TTT.socket.emit("requestGrid");
    TTT.socket.on("broadcastGrid", function (grid) {
        $scope.grid = grid;
        $scope.$apply();
    });

    $scope.tapSquare = function (column, row) {
        TTT.socket.emit("requestChange", {x: column, y: row});
    };

    TTT.socket.on("broadcastChange", function(position) {
        var row = position.y,
            column = position.x,
            setGrid = function (symbol) {
                $scope.grid[row][column] = symbol;
                $scope.$apply();
            };

        switch ($scope.grid[row][column]) {
            case "_" :
                setGrid("x");
                break;
            case "x" :
                setGrid("o");
                break;
            case "o" :
                setGrid("_");
                break;
            case "?" :
                // "?" should only be displayed if the client 
                // has not yet recieved a broadcastGrid event.
                break;
        }
    });
});
