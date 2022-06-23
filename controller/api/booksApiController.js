const booksModel = require("../../model/booksModel");

module.exports = {
    getAll: (req, res) => {
        booksModel.getAll(req.con, res);
    },
}