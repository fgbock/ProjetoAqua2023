var express = require('express');
var router = express.Router();
var controlador = require('../controllers/filtros');  

router.get('/', controlador.acessarFiltros);
  
module.exports = router;