 var controladorAvaliar = {
    acessarAvaliar(req, res, next) {
        res.render('avaliar', { 
          title: 'Qualidade das Águas do Rio Grande do Sul', 
          headername: 'Qualidade das Águas do Rio Grande do Sul'
        });
    }
  }
  
  module.exports = controladorAvaliar; 