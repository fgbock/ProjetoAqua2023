var sqlHandler = require('../includes/dbConnection');

var modeloPrincipal = {
    popularLocais(callback){
        var query = "SELECT * FROM locais;\
        SELECT DISTINCT identificacao FROM locais WHERE TRIM(identificacao) > '';";
      
        sqlHandler.connection.query(query, callback);
    },

    popularFiltros(selected, callback){
      var query = "";
      //console.log(selected);
      switch(selected){
        case "Identificação":
          query += "SELECT DISTINCT identificacao FROM locais";
          break;
        case "Bacia Hidrográfica":
          query += "SELECT DISTINCT bacia_hidrografica FROM locais";
          break;
        case "Município":
          query += "SELECT DISTINCT municipio FROM locais";
          break;  
        case "Parâmetro":
          query += "SELECT DISTINCT parametro FROM parametros";
          break;
        default:
          break;      
      }
      sqlHandler.connection.query(query, callback);
    },

    popularReferencias(parametro, callback){
      var query = "SELECT * from valores_referencia WHERE parametros_parametro='" + parametro + "';";
  
      sqlHandler.connection.query(query, callback);
    }
}

module.exports = modeloPrincipal;
