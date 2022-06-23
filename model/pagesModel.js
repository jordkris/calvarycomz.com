module.exports = {
    getAll: (con, res) => {
        con.query('SELECT * FROM pages', (err, rows) => {
            res.header("Content-Type", 'application/json');
            if (!err) {
                res.status(200).send(JSON.stringify(rows, null, 4));
            } else {
                res.status(500).json(JSON.stringify(err, null, 4));
            }
            // con.release();
        });
    },
    get: (con, res, title) => {
        con.query(`SELECT * FROM pages WHERE title="${title}"`, (err, rows) => {
            res.header("Content-Type", 'application/json');
            if (!err) {
                res.status(200).send(JSON.stringify(rows, null, 4));
            } else {
                res.status(500).json(JSON.stringify(err, null, 4));
            }
            // con.release();
        })
    },
    saveContent: (con, res, opts) => {

        console.log(opts);
        con.query(`UPDATE pages SET contents = "${opts.value}" WHERE id = "${opts.id}"`, (err, rows) => {
            console.log('success', rows)
            res.header("Content-Type", 'application/json');
            if (!err) {
                res.status(200).send(JSON.stringify({
                    status: "success",
                }, null, 4));
            } else {
                res.status(500).send(JSON.stringify({
                    status: "error",
                    message: err.message
                }, null, 4));
            }
            // con.release();
        });
    },
}