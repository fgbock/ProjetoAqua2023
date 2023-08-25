 
var controladorSobre = {
  acessarSobre(req, res, next) {
      res.render('sobre', { 
        title: 'Qualidade das Águas do Rio Grande do Sul', 
        headername: 'Qualidade das Águas do Rio Grande do Sul'
      });
  }
}

module.exports = controladorSobre; 