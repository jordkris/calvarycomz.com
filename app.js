const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
// import express, { static, urlencoded } from 'express';
// import { createConnection } from 'mysql';
// const app = express();

// app.use(static('public'));
// app.use(urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yehezkielferi.com'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(3000);
