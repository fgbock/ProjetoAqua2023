var express = require('express');
var router = express.Router();
var controlador = require('../controllers/avaliar');  

router.get('/', controlador.acessarAvaliar);

module.exports = router;
