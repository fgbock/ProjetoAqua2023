var express = require('express');
var router = express.Router();
var controlador = require('../controllers/formulario');  

router.get('/', controlador.acessarFormulario);

router.post('/', controlador.enviarFormulario);

module.exports = router;
