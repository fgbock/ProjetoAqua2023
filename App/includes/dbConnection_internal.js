var mysql = require('mysql');
var config=require('../config/config.json');  // Fun fact: se modificar valores do json eles ficam guardados para proxima passagem pelo arq (durante uma mesma exec), se for fazer isso n use o require

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "qualidadedasaguas3",
  multipleStatements: true
});

exports.connection = con;
