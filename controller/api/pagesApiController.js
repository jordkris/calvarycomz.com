const dbModel = require("../../model/dbModel");
const summernote = require('summernote-nodejs');
const multer = require('multer');
const fs = require('fs');
const he = require('he');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets/data/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage }).single('pageContents');

module.exports = {
    getAll: (req, res) => {
        pagesModel.getAll(req.con, res);
    },
    get: (req, res) => {
        pagesModel.get(req.con, res, req.body.title);
    },
    updatePageContent: async(req, res) => {
        try {
            upload(req, res, (e) => {
                throw e;
            });
        } catch (err) {
            console.log(err);
        } finally {
            fs.readFile('assets/data/pageContents.json', 'utf8', async(err, data) => {
                if (err) throw err;
                let summernoteContents = await summernote(JSON.parse(data)[`page-content-${req.params.id}`], 'assets/data');
                dbModel.update(req.con, res, {
                    table: 'pages',
                    column: 'contents',
                    value: he.encode(await summernoteContents.replace(/\s\s+/g, ' ').replace('./', '/')),
                    id: req.params.id
                });
            });
        }
    }
}