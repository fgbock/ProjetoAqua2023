var modelo = require('../models/formulario');  
var coleta = require('../includes/sampleData')

var controladorFormulario = {
    acessarFormulario(req, res){
        if (req.session.user && req.cookies.user_sid) {
            modelo.montarFormulario(function (err, result) {
                if (err) throw err;
                var Param = JSON.parse(JSON.stringify(result[0]));
                var uniqueParam = JSON.parse(JSON.stringify(result[1]));
                res.render('form', { 
                    title: 'Formulário para Entrada de Dados - Aqua', 
                    headername: 'Aqua - Qualidade das Águas',
                    dbParameters: Param,
                    uniqueDbParameters: uniqueParam
                });
            });
        } else {
            res.redirect('/login');
        }   
    },

    enviarFormulario (req, res) {
        dbData = coleta.ConvertFormToDatabaseData(req.body);
        if (dbData.isValid) { 
            modelo.verificarLocal(function (err, result, fields) {
                if (err) {
                    res.send("Erro no envio!");
                }
                else {     
                    if (result.length === 0) {
                        modelo.inserirLocal(function (err, result) {
                            if (err) {
                            //console.log(result);
                            }
                        });
                    }
                    modelo.inserirColeta(function (err, result) {
                        if (err) {
                            res.send("Erro no envio!");
                        }
                        else {
                            res.render('formsuccess', { 
                                title: 'Formulário Bem Sucedido! - Aqua', 
                                headername: 'Aqua - Qualidade das Águas'
                            });
                        }
                    });
                }    
            });
        }
    }

}

module.exports = controladorFormulario; 