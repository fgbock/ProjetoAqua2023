var express = require('express');
var router = express.Router();
var controlador = require('../controllers/sobre');  

router.get('/', controlador.acessarSobre);

module.exports = router;
