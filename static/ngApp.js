var TTT = {},
    socket = io();

TTT.app = angular.module("app", []);

TTT.app.controller("appCtrl", function ($scope) {
    var i = 0,
        protoRow =  {
        columnA: "_",
        columnB: "_",
        columnC: "_"
    };

    $scope.grid = [];

    for (i = 0; i < 3; i += 1) {
        $scope.grid.push(Object.create(protoRow));
    }

    $scope.pushMod = function (row, column) {
        socket.emit("mod", [row, column]);
    };

    socket.on("mod", function(position) {
        var row = position[0],
            column = position[1];

        if ($scope.grid[row][column] === "_") {
            $scope.grid[row][column] = "x";
        }

        else if ($scope.grid[row][column] === "x") {
            $scope.grid[row][column] = "o";
        }

        else {
            $scope.grid[row][column] = "_";
        }
        $scope.$apply();
    });
});