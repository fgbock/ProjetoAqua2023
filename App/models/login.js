const crypto = require('crypto');
var seedrandom = require("../node_modules/seedrandom");
var sqlHandler = require('../includes/dbConnection');

var modeloLogin = {
    autenticarSenha(username, callback){
        sqlHandler.connection.query('SELECT * FROM usuarios WHERE username = ?', [username], callback);
    }
}

module.exports = modeloLogin;