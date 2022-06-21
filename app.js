// all important modules
const process = require('process');
const express = require('express');
const app = express();
const path = require("path");
var $ = require('jquery');
// cookie & session 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
// handle crash
const http = require('http');
const terminate = require('./config/terminate.js');
const server = http.createServer(app);

const exitHandler = terminate(server, {
    coredump: false,
    timeout: 500
});

process.on('uncaughtException', exitHandler(0, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(0, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));


// var methodOverride = require("method-override");

app.use(express.static('public'));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
// app.use(express.urlencoded({ extended: false }));
// import express, { static, urlencoded } from 'express';
// import { createConnection } from 'mysql';
// const app = express();

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

// declare connection to db connection
let con = require("./config/database.js");
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
let appListen = app.listen(process.env.PORT || 3000, () => {
    console.log("Express server listening on port %d in %s mode", appListen.address().port, app.settings.env);
});