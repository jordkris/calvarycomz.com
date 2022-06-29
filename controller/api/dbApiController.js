const dbModel = require("../../model/dbModel");
module.exports = {
    get: (req, res) => {
        res.header('Content-Type', 'application/json');
        dbModel.get(req.con, {
            table: req.body.table,
            select: req.body.select,
            whereColumn: req.body.whereColumn,
            whereValue: req.body.whereValue,
        }, (results) => {
            res.status(200).send(JSON.stringify(results, null, 4));
        }, (err) => {
            res.status(500).send(JSON.stringify({
                status: 'error',
                message: err.message
            }, null, 4));
        });
    },
    update: (req, res) => {
        res.header('Content-Type', 'application/json');
        dbModel.update(req.con, res, {
            table: req.body.table,
            column: req.body.column,
            value: req.body.value,
            id: req.body.id
        });
    }
}