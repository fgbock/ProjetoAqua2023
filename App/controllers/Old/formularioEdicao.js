var modelo = require('../models/formularioEdicao');  

var controladorFormulario = {
    acessarFormularioEdicao(req, res) {
        if (req.session.user && req.cookies.user_sid) {
            modelo.buscarDadosColeta(req.body.IdColeta, function (err, result, fields) {
                if (err) {
                //console.log(result);
                res.send("Erro no envio!");
                }
                else {
                    var dbColeta = JSON.parse(JSON.stringify(result));
                    modelo.buscarDadosLocal(dbColeta[0].locais_identificacao,
                        dbColeta[0].locais_latitude,
                        dbColeta[0].locais_longitude,
                        function (err, result, fields) {
                        if (err) {
                        //console.log(result);
                        res.send("Erro no envio!");
                        }
                        else {
                            var dbLocal = JSON.parse(JSON.stringify(result));
                            if (dbLocal[0].latitude === "" && dbLocal[0].longitude === ""){
                                coordenada1 = dbLocal[0].utm_e;
                                coordenada2 = dbLocal[0].utm_n;
                            }
                            else {
                                coordenada1 = dbLocal[0].latitude;
                                coordenada2 = dbLocal[0].longitude;
                            }
                
                            modelo.atualizarStatusColeta(req.body.IdColeta, function (err, result, fields) {
                                if (err) throw err;                
                            });
                
                            modelo.buscarDadosParametros(dbColeta[0].parametros_parametro,
                                function (err, result, fields) {
                                if (err) throw err;
                                var Param = JSON.parse(JSON.stringify(result[0]));
                                var uniqueParam = JSON.parse(JSON.stringify(result[1]));
                                var dbUnidades = JSON.parse(JSON.stringify(result[2]));
                                res.render('editform', { 
                                    title: 'Formulário para Entrada de Dados - Aqua', 
                                    headername: 'Aqua',
                                    dbParameters: Param,
                                    uniqueDbParameters: uniqueParam,
                                    dadosColeta: dbColeta,
                                    dadosLocal: dbLocal,
                                    coord1: coordenada1,
                                    coord2: coordenada2,
                                    unidades: dbUnidades
                                });
                            });
                        }
                    });
                }
            });
        }
        else {
            res.redirect('/login');
        }   
    }
}

module.exports = controladorFormulario; 