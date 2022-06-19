require('dotenv').config();
const process = require('process');
const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
// import express, { static, urlencoded } from 'express';
// import { createConnection } from 'mysql';
// const app = express();

// app.use(static('public'));
// app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

let server = app.listen(process.env.PORT || 3000, () => {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});