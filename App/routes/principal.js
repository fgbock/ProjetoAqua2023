var express = require('express');
var router = express.Router();
var controlador = require('../controllers/principal');  

router.get('/', controlador.acessarPrincipal);

module.exports = router;
