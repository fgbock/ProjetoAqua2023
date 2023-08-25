var express = require('express');
var router = express.Router();
var controlador = require('../controllers/login');  

router.get('/', controlador.acessarLogin);

router.post('/auth', controlador.autenticarUsuario);

module.exports = router;
