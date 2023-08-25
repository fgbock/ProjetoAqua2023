var sqlHandler = require('../includes/dbConnection');

var modeloFormulario = {
    montarFormulario(callback){
        var query = "SELECT * FROM parametros;\
        SELECT DISTINCT parametro FROM parametros;"
    
        sqlHandler.connection.query(query, callback);
    },

    verificarLocal(callback){
        var locationQuery = 
        "SELECT * FROM locais\
        WHERE latitude_decimal='" + dbData.Latitude_Decimal + "'\
        AND longitude_decimal='" + dbData.Longitude_Decimal + "'\
        AND identificacao='" + dbData.Identificacao + "'";
        sqlController.connection.query(locationQuery, callback);
    },

    inserirLocal(callback){
        var locationInsertionQuery = 
        "INSERT INTO locais \
        (identificacao, latitude_decimal, longitude_decimal, utm_e, utm_n, altitude, municipio, bacia_hidrografica, latitude, longitude) \
        VALUES ?";

        var values = [
          [ dbData.Identificacao, 
            dbData.Latitude_Decimal,
            dbData.Longitude_Decimal,
            dbData.cUTM_E,
            dbData.cUTM_N,
            dbData.Altitude,
            dbData.Municipio,
            dbData.Bacia,
            dbData.Latitude,
            dbData.Longitude
          ]
        ];

        sqlController.connection.query(locationInsertionQuery, [values], callback);
    },

    inserirColeta(callback){
        var sampleInsertionQuery =  
        "INSERT INTO coletas (parametros_parametro, parametros_unidade, data_publicacao, \
        parametro_semelhante, valor, valor_convertido, erro, responsavel_divulgacao, responsavel_coleta, \
        data_coleta, ano_convertido, mes_convertido, fonte, fonte_ativa, certificado_laboratorio, tipo_agua,\
        classificacao_subterranea, locais_identificacao, locais_latitude, locais_longitude, ponto_referencia,\
        locais_municipio, locais_bacia_hidrografica, usuarios_username, status) \
        VALUES ?";
            
        var values = [
            [ 
            dbData.Parametro, 
            dbData.Unidade,
            dbData.DataPublicacao,
            dbData.ParamSemelhante,
            dbData.Valor,
            dbData.ValorConvertido,
            dbData.Erro,
            dbData.ResponsavelDivulgacao,
            dbData.ResponsavelColeta,
            dbData.DataColeta,
            dbData.AnoColeta,
            dbData.MesColeta,
            dbData.Fonte,
            dbData.FonteAtiva,
            dbData.CertificadoLaboratorio,
            dbData.TipoAgua,
            dbData.ClasseSubterraneas,
            dbData.Identificacao,
            dbData.Latitude_Decimal,
            dbData.Longitude_Decimal,
            dbData.PontoDeReferencia,
            dbData.Municipio,
            dbData.Bacia,
            req.session.user,
            '1'
            ]
        ];
            
        sqlController.connection.query(sampleInsertionQuery, [values], callback);        
    }
}

module.exports = modeloFormulario;