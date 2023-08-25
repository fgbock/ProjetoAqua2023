var controladorBusca = {
  acessarFiltros(req, res, next) {
    res.render('filtros', { 
      title: 'Qualidade das Águas do Rio Grande do Sul', 
      headername: 'Qualidade das Águas do Rio Grande do Sul'
    });
  }
}

module.exports = controladorBusca; 