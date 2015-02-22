var mongoClient = require('mongodb').MongoClient,
    cachedGrid = [],
    connect = function (callback) {
        mongoClient.connect('mongodb://localhost:8000/TicTapToe',
                function(err, db) {

            if (err) {

                return console.error(err);
            }
            callback(db.collection("grid"));
        });
    };

connect(function (grid) {
    grid.count(function (err, count) {
        var i = 0,
            docs = {},
            protoRow = {
                columnA: "_",
                columnB: "_",
                columnC: "_"
            };

        if (err) {

            return console.error(err);
        }

        if (count === 0) {

            for (i = 0; i < 3; i += 1) {
                docs["row" + i] = Object.create(protoRow);
            }
            grid.insert(docs, function () {});
        }
    });
});

module.exports = {

    getGrid : function (callback) {
        cachedGrid = [
            {
                columnA: "_",
                columnB: "_",
                columnC: "_"
            },
            {
                columnA: "_",
                columnB: "_",
                columnC: "_"
            },
            {
                columnA: "_",
                columnB: "_",
                columnC: "_"
            }
        ];
/*
        cachedGrid = [];

        connect(function (grid) {
            grid.find().forEach(function (row) {
                cachedGrid.push(row);
            });
        });
*/
        callback(cachedGrid);
    },

    changeGrid : function (position) {
        var x = position.x,
            y = position.y;
    }
};

