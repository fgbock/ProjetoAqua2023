var sqlHandler = require('../includes/dbConnection');

var modeloEditForm = {
    buscarDadosColeta(idColeta, callback){
        var query = 'SELECT * FROM coletas WHERE id_coleta = ' + idColeta + ';';
        
        sqlHandler.connection.query(query, callback);
    },

    buscarDadosLocal(identificacao, latitude, longitude, callback){
        var queryLocal = "SELECT * FROM locais WHERE \
        identificacao = '" + identificacao + "' \
        AND latitude_decimal = '" + latitude + "' \
        AND longitude_decimal = '" + longitude + "';";
        sqlHandler.connection.query(queryLocal, callback);
    },

    buscarDadosParametros(parametro, callback){
        var query = "SELECT * FROM parametros;\
        SELECT DISTINCT parametro FROM parametros;\
        SELECT unidade FROM parametros WHERE parametro='" + parametro + "';";
    
        sqlHandler.connection.query(query, callback);
    },

    atualizarStatusColeta(idColeta, callback){
        var queryUpdate = "UPDATE coletas SET status = " + 0 + " WHERE id_coleta = " + idColeta;

        sqlHandler.connection.query(queryUpdate, callback);
    }
}

module.exports = modeloEditForm;