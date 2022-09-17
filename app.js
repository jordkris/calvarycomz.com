// all important modules
const process = require('process');
const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const http = require('http');
require('dotenv').config();
// cookie & session 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// handle crash
// const http = require('http');
// const terminate = require('./config/terminate.js');
// const server = http.createServer(app);

// const exitHandler = terminate(server, {
//     coredump: false,
//     timeout: 500
// });

// process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
// process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
// process.on('SIGTERM', exitHandler(1, 'SIGTERM'));
// process.on('SIGINT', exitHandler(1, 'SIGINT'));


// process.on('uncaughtException', (error, origin) => {
//     console.log('origin', `: ${origin}`);
//     console.log('error', `: ${error}`);
// })

// process.on('unhandledRejection', (reason, promise) => {
//     console.log('promise', `: ${promise}`);
//     console.log('reason', `: ${reason}`);
// })


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
app.use('/assets', express.static('assets'));

// entended config
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
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
app.use((req, res, next) => {
    req.con = con;
    return next();
});

// include router
const webRouter = require("./routes/webRouter");
const apiRouter = require("./routes/apiRouter");
app.use("/", webRouter);
app.use("/api", apiRouter);

// start server
// let appListen = app.listen(process.env.PORT || 30000, () => {
//     console.log("[" + new Date().toLocaleString() + "] Express server listening on port %d in %s mode", appListen.address().port, app.settings.env);
// });
app.set('port', process.env.PORT || 30000);
http.createServer(app).listen(app.get('port'), () => {
    console.log(`[${new Date().toLocaleString()}] Express server listening on port ${app.get('port')}`);
});