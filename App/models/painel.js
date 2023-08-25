var sqlHandler = require('../includes/dbConnection');

var modeloPrincipal = {
    popularLocais(user,callback){
        var query = "SELECT * FROM coletas WHERE usuarios_username='" + user + "'\
        AND status=1;";
        sqlHandler.connection.query(query, callback);
    },

    popularListaColetasCompleta(callback){
        var query = "SELECT * FROM coletas \
        WHERE status=1;";
        sqlHandler.connection.query(query, callback);
    },
}

module.exports = modeloPrincipal;
