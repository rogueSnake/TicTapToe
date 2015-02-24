var rowIds = [],
    mongoClient = require('mongodb').MongoClient,
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
                grid.insert(Object.create(defaultRow), function (err, row) {

                    if (err) {throw err}
                    rowIds.push(row._id);
                });
            }
        }

        else {
            grid.find(function (err, cursor){

                if (err) {throw err}
                cursor.each(function (err, row) {
                    if (err) {throw err}
                    rowIds.push(row._id);
                });
            });
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
        var rowId = rowIds[position.y],
            columnUpdate = {},
            oldSymbol,
            newSymbol;

        connect(function (grid) {
            grid.find({_id: rowId}, function (err, row) {

                if (err) {throw err}
                oldSymbol = row[position.x];
            })

            switch (oldSymbol) {
                case "_" :
                    newSymbol = "x";
                    break;
                case "x" :
                    newSymbol = "o";
                    break;
                case "o" :
                    newSymbol = "_";
                    break;
            }
            columnUpdate[position.x] = newSymbol;
            // I'm not sure why, but this doesn't really update the stored grid.
            grid.update({_id : rowId}, {$set : columnUpdate}, function () {});
        });
    }
};

