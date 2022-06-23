const pagesModel = require("../../model/pagesModel");
const summernote = require('summernote-nodejs');
const multer = require('multer');
const path = require('path');
let fs = require('fs');

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
        upload(req, res, (err) => {
            if (err) {
                console.log(err)
            }

            if (!req.files) {
                console.log('No files received');
            } else {
                console.log('success');
            }

            (async() => {
                fs.readFile('assets/data/pageContents.json', 'utf8', function(err, data) {
                    if (err) throw err;
                    let summernoteContents = summernote(decodeURIComponent(JSON.parse(data)[`page-content-${req.params.id}`]), 'assets/data/');
                    console.log(summernoteContents.replace(/\s\s+/g, ' '));
                    pagesModel.saveContent(req.con, res, { value: encodeURIComponent(summernoteContents.replace(/\s\s+/g, ' ')), id: req.params.id });
                });
            })()
        });
    }
}