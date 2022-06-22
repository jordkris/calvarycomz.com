const dbModel = require("../../model/dbModel");
const decodeURIComponent = require('decode-uri-component');
module.exports = {
    update: (req, res) => {
        dbModel.update(req.con, (err, rows) => {
            res.header("Content-Type", 'application/json');
            if (!err) {
                res.status(200).send(JSON.stringify({
                    status: "success",
                }, null, 4));
            } else {
                throw err;

            }
        }, {
            table: req.body.table,
            column: req.body.column,
            value: decodeURIComponent(req.body.value),
            id: req.body.id
        });
    },
}