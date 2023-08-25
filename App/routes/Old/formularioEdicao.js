var express = require('express');
var router = express.Router();
var controlador = require('../controllers/formularioEdicao');  

router.post('/', controlador.acessarFormularioEdicao);

module.exports = router;
