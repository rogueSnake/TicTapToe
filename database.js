var mongoClient = require('mongodb').MongoClient,
    connect = function (callback) {
        mongoClient.connect('mongodb://localhost:8000/TicTapToe',
                function(err, db) {

            if (err) {throw err}
            callback(db.collection("grid"));
        });
    };

connect(function (grid) {
    grid.count(function (err, count) {
        var i = 0,
            defaultRow = {
                columnA: "_",
                columnB: "_",
                columnC: "_"
            };

        if (err) {throw err}

        if (count === 0) {

            for (i = 0; i < 3; i += 1) {
                grid.insert(Object.create(defaultRow), function () {});
            }
        }
    });
});

module.exports = {

    getGrid : function (callback) {
        connect(function (grid) {
            grid.find(function (err, cursor) {

                if (err) {throw err}
                cursor.toArray(function (err, rows) {

                    if (err) {throw err}
                    callback(rows);
                });
            });
        });
    },

    changeGrid : function (position) {
        var x = position.x,
            y = position.y;
    }
};

