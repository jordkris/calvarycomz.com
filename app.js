// all important modules
const process = require('process');
const express = require('express');
const app = express();
const path = require("path");
var $ = require('jquery');
// var methodOverride = require("method-override");

app.use(express.static('public'));
// app.use(express.urlencoded({ extended: false }));
// import express, { static, urlencoded } from 'express';
// import { createConnection } from 'mysql';
// const app = express();
// declare connection to db connection
let con = require("./config/database.js");

// set assets path
app.use(express.static('assets'));

// entended config
app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride("_method"));

// set views path
app.set("views", './views');
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.render('home/index.ejs');
// });

// connect route to database
app.use(function(req, res, next) {
    req.con = con;
    next();
});

// include router
const webRouter = require("./routes/webRouter");
const apiRouter = require("./routes/apiRouter");
app.use("/", webRouter);
app.use("/api", apiRouter);

// start server
let server = app.listen(process.env.PORT || 3000, () => {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});