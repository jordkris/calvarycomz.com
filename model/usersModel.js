module.exports = {
    getAdmin: function(con, callback) {
        con.query('SELECT * FROM users WHERE id = "1"', callback);
    }
}