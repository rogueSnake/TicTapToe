var TTT = {};
TTT.app = angular.module('app', []);

TTT.app.controller('appCtrl', function ($scope) {
    var i = 0,
        row = {},
        protoRow =  {
        columnA: "_",
        columnB: "_",
        columnC: "_"
    };

    for (i=0; i < 3; i += 1) {
        row[i] = Object.create(protoRow);
    }

    $scope.grid = [
        row[0],
        row[1],
        row[2]
    ];

    $scope.mod = function (row, column) {
        
        if ($scope.grid[row][column] === "_"){
            $scope.grid[row][column] = "x";
        }
        
        else if ($scope.grid[row][column] === "x"){
            $scope.grid[row][column] = "o";
        }
        
        else {
            $scope.grid[row][column] = "_";
        }
    };
});