var modelo = require('../models/login');  
var auth = require('../includes/authentication')

var controladorLogin = {
    acessarLogin(req, res) {
        if (req.session.user && req.cookies.user_sid) {
          res.redirect('/painel');
        } else {
          res.render('login', { 
            title: 'Qualidade das Águas do Rio Grande do Sul', 
            headername: 'Qualidade das Águas do Rio Grande do Sul'
          });
        }   
    },

    autenticarUsuario(req, res){
        var username = req.body.myUsername;
        var password = req.body.myPassword;
        if (username && password) {
            modelo.autenticarSenha(username, function(error, result, fields) {
                if (result.length > 0) {
                    var userData = JSON.parse(JSON.stringify(result[0]));
                    var salt = auth.generateSalt(username);
                    const key = auth.getKey(password, salt);
                    if (key.toString('hex') === userData.hash){
                        req.session.loggedin = true;
                        req.session.user = username;
                        res.redirect('/painel');
                    }
                    else {
                        res.send('Incorrect Username and/or Password!');
                    }
                } else {
                    res.send('Incorrect Username and/or Password!');
                }			
                res.end();
            });
        } else {
            res.send('Please enter Username and Password!');
            res.end();
        }
    }
}

module.exports = controladorLogin; 