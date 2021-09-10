const profileModel = require("../../model/profileModel");

module.exports = {
    getAll: (req, res) => {
        profileModel.getAll(req.con, (err, rows) => {
            res.header("Content-Type", 'application/json');
            if (!err) {
                res.send(JSON.stringify(rows, null, 4));
            } else {
                res.send(JSON.stringify(err, null, 4));
            }
        });
    },
}