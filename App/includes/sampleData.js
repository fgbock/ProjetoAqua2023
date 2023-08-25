/*  This file holds water sample data to be used within the server-side scripts
*   It also manages the following methods:
*       - Conversion from Form Request to database data, 
*         including validation and creation of derived fields
*/
var utmObj = require('utm-latlng');

module.exports = {
    ConvertFormToDatabaseData: function (rawData) {
        //console.log(rawData);
        var utm=new utmObj();
        dbData = {};
        dbData.isValid = true;
        dbData.Identificacao = rawData.identificacao;
        dbData.Bacia = rawData.bacia;
        dbData.Municipio = rawData.municipio;
        if (rawData.coordtype === "latlong") {
            var coord = rawData.latitude.replace("º"," ").replace("°"," ").replace("\'"," ").
            replace("\""," ").replace("."," ").replace(","," ").replace("’"," ").
            replace("”","").replace("S","").replace("-","").trim();
            coord = coord.split(" ");
            var i = 1;
            dbData.Latitude_Decimal = 0.0;
            for (subval in coord) {
                dbData.Latitude_Decimal = dbData.Latitude_Decimal + (Number(coord[subval])/i);
                i *= 60;
            }  
            dbData.Latitude_Decimal = dbData.Latitude_Decimal * -1;
            dbData.Latitude_Decimal = Number(dbData.Latitude_Decimal.toFixed(6));
            dbData.Latitude = rawData.latitude;
            dbData.cUTM_E = 0;
            //
            var coord = rawData.longitude.replace("º"," ").replace("°"," ").replace("\'"," ").
            replace("\""," ").replace("."," ").replace(","," ").replace("’"," ").
            replace("”","").replace("S","").replace("-","").trim();
            coord = coord.split(" ");
            var i = 1;
            dbData.Longitude_Decimal = 0.0;
            for (subval in coord) {
                dbData.Longitude_Decimal = dbData.Longitude_Decimal + (Number(coord[subval])/i);
                
                i *= 60;
            }  
            dbData.Longitude_Decimal = dbData.Longitude_Decimal * -1;
            dbData.Longitude_Decimal = Number(dbData.Longitude_Decimal.toFixed(6));
            dbData.Longitude = rawData.longitude;
            dbData.cUTM_N = 0;
        }
        else {
            aux = utm.convertUtmToLatLng(rawData.latitude, rawData.longitude, 22, 'K');
            dbData.Latitude = "";
            dbData.Latitude_Decimal = aux.lat;
            dbData.cUTM_E = rawData.latitude;
            console.log(aux);
            console.log(dbData.cUTM_E);
            dbData.Longitude = "";
            dbData.Longitude_Decimal = aux.lng;
            dbData.cUTM_N = rawData.longitude;
            console.log(dbData.cUTM_N);
        }
        if (!isNaN(Number(rawData.altitude))) {
            dbData.Altitude = Number(rawData.altitude);
        }
        dbData.CoordenadasFake = rawData.coordenadasFake;
        dbData.PontoDeReferencia = rawData.pontoref;
        dbData.Parametro = rawData.parametro;
        dbData.Unidade = rawData.unidade;
        dbData.ParamSemelhante = rawData.param_semelhante;
        dbData.Valor = rawData.valor;
        auxValor = rawData.valor.replace(",", ".");
        if (!isNaN(Number(auxValor))) {
            dbData.ValorConvertido = Number(auxValor);
        }
        dbData.Erro = rawData.erro;
        dbData.DataPublicacao = rawData.data_pub;
        dbData.TipoAgua = rawData.tipodeagua;
        dbData.ClasseSubterraneas = rawData.classesub;
        dbData.DataColeta = rawData.mescoleta + "/" + rawData.anocoleta;
        dbData.MesColeta = Number(rawData.mescoleta);
        dbData.AnoColeta = Number(rawData.anocoleta);
        dbData.ResponsavelDivulgacao = rawData.resp_divul;
        dbData.ResponsavelColeta= rawData.resp_coleta;
        dbData.Fonte = rawData.fonte;
        if (rawData.fonteativa === 'true') {
            dbData.FonteAtiva = 1;
        }
        else {
            dbData.FonteAtiva = 0;
        }
        if (rawData.temcertificado === 'true') {
            dbData.CertificadoLaboratorio = 1;
        }
        else {
            dbData.CertificadoLaboratorio = 0;
        }
        
        //console.log(dbData);
        return dbData;
    }

}