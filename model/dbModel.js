module.exports = {
    update: (con, res, opts) => {
        con.query(`UPDATE ${opts.table} SET ${opts.column} = "${opts.value}" WHERE id ="${opts.id}"`, (err, rows) => {
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