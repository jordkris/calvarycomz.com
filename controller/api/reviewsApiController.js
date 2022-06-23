const reviewsModel = require("../../model/reviewsModel");

module.exports = {
    getAll: (req, res) => {
        reviewsModel.getAll(req.con, res);
    },
}