var modelo = require('../models/painel');  

var controladorFormulario = {
    acessarPainel(req, res) {
        if (req.session.user && req.cookies.user_sid) {
            var callback = function (err, result, fields) {
                var dbSamples;
                if (err) {
                    dbSamples = []
                }
                else {
                    dbSamples = JSON.parse(JSON.stringify(result));
                }
                res.render('painel', { 
                    title: 'Painel de Usuário - Aqua', 
                    headername: 'Aqua - Qualidade das Águas',
                    username: req.session.user,
                    samples: dbSamples
              });
            };
            if (req.session.user === "admin"){
                modelo.popularListaColetasCompleta(callback);
            }
            else {
                modelo.popularListaColetas(req.session.user, callback);
            }
        } 
        else {
            res.redirect('/login');
        }   
    }

}

module.exports = controladorFormulario; 