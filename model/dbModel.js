module.exports = {
    update: (con, callback, opts) => {
        con.query(`UPDATE ${opts.table} SET ${opts.column} = "${opts.value}" WHERE id ="${opts.id}"`, callback);
    },
}