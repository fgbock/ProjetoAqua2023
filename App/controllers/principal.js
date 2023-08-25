var modelo = require('../models/principal');  
  
var controladorPrincipal = {
    acessarPrincipal(req, res, next) {
        res.render('index', { 
            title: 'Qualidade das Águas do Rio Grande do Sul', 
            headername: 'Qualidade das Águas do Rio Grande do Sul'
        });
    }
}

module.exports = controladorPrincipal; 