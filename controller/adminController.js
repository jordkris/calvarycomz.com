const md5 = require('md5');
const dbModel = require("../model/dbModel");

module.exports = {
    index: (req, res) => {
        res.render("admin/index.ejs", { users: ls.get('users') });
    },
    login: (req, res) => {
        res.render("admin/login.ejs", { errorMessage: req.flash('message')[0] });
    },
    processLogin: (req, res) => {
        dbModel.get(req.con, {
            table: 'users',
            select: '*',
            whereColumn: 'id',
            whereValue: '1',
        }, (results) => {
            if (results[0].email == req.body.email) {
                if (results[0].password === md5(req.body.password)) {

                    res.redirect('/admin');
                } else {
                    req.flash('message', 'Incorrect email or password');
                    res.redirect('/login');
                }
            } else {
                req.flash('message', 'Incorrect email or password');
                res.redirect('/login');
            }
        }, (err) => {
            req.flash('message', err.message);
            res.redirect('/login');
        });
    }
}