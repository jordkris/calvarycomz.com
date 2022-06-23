const dbModel = require("../../model/dbModel");
module.exports = {
    update: (req, res) => {
        dbModel.update(req.con, res, {
            table: req.body.table,
            column: req.body.column,
            value: req.body.value,
            id: req.body.id
        });
    },
}