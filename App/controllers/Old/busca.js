var modelo = require('../models/busca');  
  
var controladorBusca = {
  buscaSimples(req,res){
    modelo.buscaSimples(req.body.coleta_latitude,
      req.body.coleta_longitude,
      req.body.coleta_identificacao,
      
      function (err, result, fields) {
        if (err){
          res.send("Erro no envio!");
        }
        else {
          var dbSamples = JSON.parse(JSON.stringify(result[0]));
          var dbFonte = JSON.parse(JSON.stringify(result[1]));
          var dbData = JSON.parse(JSON.stringify(result[2]));
          return res.json({
            success: true,
            message: "Succesful query!",
            coletas: dbSamples,
            fonte: dbFonte,
            data: dbData
          });
        }
    });
  },

  buscaAvancada(req,res){
    filtros = req.body;
    modelo.buscaAvancada(filtros,
      function (err, result, fields) {
        if (err) {
          return res.json({
            success: false,
            message: "Failed query!"
          });
        }
        var dbSampleData = JSON.parse(JSON.stringify(result[0]));
        var dbLocationData = JSON.parse(JSON.stringify(result[1]));
        
        return res.json({
          success: true,
          message: "Succesful query!",
          coletas: dbSampleData,
          locais: dbLocationData
        });
    });
  },

  acessarFiltros(req, res, next) {
    res.render('filtros', { 
      title: 'Qualidade das Águas do Rio Grande do Sul', 
      headername: 'Qualidade das Águas do Rio Grande do Sul'
    });
  }
}

module.exports = controladorBusca; 