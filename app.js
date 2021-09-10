// all important modules
const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require("path");
var $ = require('jquery');
// var methodOverride = require("method-override");

// declare connection to db
const con = require("./config/database.js");

// set assets path
app.use(express.static('assets'));

// entended config
app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride("_method"));

// set views path
app.set("views", path.join(__dirname, "views"));

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
const port = 3000;
app.listen(port, function() {
    console.log("server listening on port " + port);
});