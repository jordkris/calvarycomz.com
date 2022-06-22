module.exports = {
    getAll: function(con, callback) {
        con.query('SELECT * FROM pages', callback);
    },
    get: (con, callback, title) => {
        con.query(`SELECT * FROM pages WHERE title="${title}"`, callback)
    }
}