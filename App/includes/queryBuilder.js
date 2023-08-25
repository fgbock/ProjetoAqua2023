var filterDict = require('../config/filtros.json'); // Fun fact: se modificar valores do json eles ficam guardados para proxima passagem pelo arq (durante uma mesma exec), se for fazer isso n use o require

var filterQuery = {
    addGenericFilterSubQuery : function(filters,index,key,query){
        var subQuery = "";

        for (j in filters[index][key]){
            if (subQuery.length > 0){
                subQuery += " OR ";
            }
            subQuery += key + " = " + "'" + filters[index][key][j] + "'";
        }

        if (query.length > 0){
            query = query + " AND " + "(" + subQuery + ")";
        }
        else {
            query = "(" + subQuery + ")";
        }
        return query;
    },

    addLocationFilterSubQuery : function (filters,index,key,query){
        var subQuery = "";

        for (j in filters[index][key]){
            if (subQuery.length > 0){
                subQuery += " OR ";
            }
            subQuery += filterDict[key] + " = " + "'" + filters[index][key][j] + "'";
        }

        if (query.length > 0){
            query = query + " AND " + "(" + subQuery + ")";
        }
        else {
            query = "(" + subQuery + ")";
        }
        return query;
    },

    addDateFilterSubQuery : function (filters,index,key,query){
        var subQuery = "";

        for (j in filters[index][key]){
            if (subQuery.length > 0){
                subQuery += " OR ";
            }
            if (filters[index][key][j][0] != 0){
                subQuery += "mes_convertido" + " = " + "'" + filters[index][key][j][0] + "'"  + " AND " + "ano_convertido" + " = " + "'"  + filters[index][key][j][1] + "'" ;
            }
            else {
                subQuery += "ano_convertido" + " = " + "'" + filters[index][key][j][1] + "'" ;
            }
        }

        if (query.length > 0){
            query = query + " AND " + "(" + subQuery + ")";
        }
        else {
            query = "(" + subQuery + ")";
        }
        return query;
    }
}


module.exports = filterQuery;