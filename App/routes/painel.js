var express = require('express');
var router = express.Router();
var controlador = require('../controllers/painel');  

router.get('/', controlador.acessarPainel);

module.exports = router;
