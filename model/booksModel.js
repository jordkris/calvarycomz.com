module.exports = {
  getAll: function (con,callback) {
    con.query('SELECT * FROM books',callback);
  },
}
