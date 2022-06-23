const pagesModel = require("../../model/pagesModel");

module.exports = {
    getAll: (req, res) => {
        pagesModel.getAll(req.con, res);
    },
    get: (req, res) => {
        pagesModel.get(req.con, res, req.body.title);
    }
}