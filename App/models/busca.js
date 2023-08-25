var sqlHandler = require('../includes/dbConnection');
var qBuilder = require('../includes/queryBuilder');

var modeloBusca = {
    buscaSimples(latitude, longitude, identificacao, callback){
      var condition = " locais_latitude ='" + latitude + "'\
      AND locais_longitude ='" + longitude + "'\
      AND locais_identificacao='" + identificacao + "';";

      var query = "SELECT * FROM coletas WHERE status = 1 AND" + condition +
      " SELECT DISTINCT fonte FROM coletas WHERE" + condition +
      " SELECT DISTINCT ano_convertido,mes_convertido,data_coleta FROM coletas WHERE" + condition;

      sqlHandler.connection.query(query, callback);     
    },

    buscaAvancada(filtros,callback){
      var query = "";
      var coletasQuery = "";
      var localQuery = "";

      for (i in filtros){
        var key = Object.keys(filtros[i])[0];
        if (filtros[i][key].length != 0){
          switch(key){
            case "locais_identificacao":
            case "locais_bacia_hidrografica":
            case "locais_municipio":
              coletasQuery = qBuilder.addGenericFilterSubQuery(filtros,i,key,coletasQuery);
              localQuery = qBuilder.addLocationFilterSubQuery(filtros,i,key,localQuery);
              break;  
            case "parametros_parametro":
              coletasQuery = qBuilder.addGenericFilterSubQuery(filtros,i,key,coletasQuery);
              break;
            case "data_coleta":
              coletasQuery = qBuilder.addDateFilterSubQuery(filtros,i,key,coletasQuery);
              break;
            default:
              break;      
          }
        }
      }

      query = "SELECT * FROM coletas WHERE status = 1 AND " + coletasQuery + "; "
      if (localQuery.length > 0){
        localQuery = " SELECT * FROM locais WHERE " + localQuery;
        query += localQuery + ";";
      }

      console.log(query);
      
      try {
        sqlHandler.connection.query(query, callback);
      }
      catch(err) {
        return res.json({
          success: false,
          message: "Failed query!"
        });
      } 
    }
}

module.exports = modeloBusca;
