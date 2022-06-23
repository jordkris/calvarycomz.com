module.exports = {
    getAll: (con, res) => {
        con.query('SELECT * FROM profile', (err, rows) => {
            res.header("Content-Type", 'application/json');
            if (!err) {
                res.status(200).send(JSON.stringify(rows, null, 4));
            } else {
                res.status(500).send(JSON.stringify(err, null, 4));
            }
            // con.release();
        });
    },
}