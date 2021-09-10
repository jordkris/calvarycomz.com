module.exports = {
  getAll: function (con,callback) {
    con.query('SELECT * FROM profile',callback);
  },
}
