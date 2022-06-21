const md5 = require('md5');
const usersModel = require("../model/usersModel");
const ls = require("local-storage");

module.exports = {
    index: (req, res) => {
        res.render("admin/index.ejs", { users: ls.get('users') });
    },
    login: (req, res) => {
        res.render("admin/login.ejs", { errorMessage: req.flash('message')[0] });
    },
    processLogin: (req, res) => {
        usersModel.getAdmin(req.con, (err, rows) => {
            if (!err) {
                if (rows[0].email == req.body.email) {
                    if (rows[0].password === md5(req.body.password)) {
                        ls.set('users', JSON.stringify(rows[0]));
                        res.redirect('/admin');
                    } else {
                        req.flash('message', 'Incorrect email or password');
                        res.redirect('/login');
                    }
                } else {
                    req.flash('message', 'Incorrect email or password');
                    res.redirect('/login');
                }

            } else {
                throw err;
            }
        });
    }
}