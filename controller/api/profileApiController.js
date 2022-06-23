const profileModel = require("../../model/profileModel");

module.exports = {
    getAll: (req, res) => {
        profileModel.getAll(req.con, res);
    },
}