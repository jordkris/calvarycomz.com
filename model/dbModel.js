module.exports = {
    get: (con, opts, callback, error) => {
        if (opts.whereColumn && opts.whereValue) {
            con(opts.table).select(opts.select).where(opts.whereColumn, opts.whereValue).then(callback).catch(error);
        } else {
            con(opts.table).select(opts.select).then(callback).catch(error);
        }
    },
    update: (con, res, opts) => {
        con(opts.table).update(opts.column, opts.value).where('id', opts.id).then((results) => {
            res.status(200).send(JSON.stringify({
                status: "success",
            }, null, 4));
        }).catch((err) => {
            res.status(500).send(JSON.stringify({
                status: 'error',
                message: err.message
            }, null, 4));
        });
    },
}