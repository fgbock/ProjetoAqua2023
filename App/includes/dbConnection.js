var mysql = require('mysql');
var config=require('../config/config.json');  // Fun fact: se modificar valores do json eles ficam guardados para proxima passagem pelo arq (durante uma mesma exec), se for fazer isso n use o require

var con = mysql.createConnection({
  host: "localhost",
  user: config.databaseConfig[process.argv[3]].user,
  password: config.databaseConfig[process.argv[3]].password,
  database: config.databaseConfig[process.argv[3]].database,
  multipleStatements: true
});

exports.connection = con;
