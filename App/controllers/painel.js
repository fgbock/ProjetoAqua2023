var modelo = require('../models/painel');  

var controladorPainel = {
    acessarPainel(req, res) {
        if (req.session.user && req.cookies.user_sid) {

        } 
        else {
            res.redirect('/login');
        }   
    }

}

module.exports = controladorPainel; 