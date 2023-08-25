  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  // Start file download.
  function generateReport(source){
    translationTable = {
      "parametros_parametro" : "PARÂMETRO",
      "parametros_unidade" : "UNIDADE",
      "parametro_semelhante" : "PARÂMETRO SEMELHANTE",	
      "valor" : "VALOR",	
      "erro" : "ERRO OU DESVIO",	
      "responsavel_divulgacao" : "RESPONSÁVEL PELA DIVULGAÇÃO",	
      "responsavel_coleta" : "RESPONSÁVEL PELA COLETA",	
      "data_publicacao" : "DATA DE PUBLICAÇÃO",	
      "data_coleta" : "DATA DE COLETA",		
      "fonte" : "FONTE",	
      "fonte_ativa" : "FONTE ATIVA",	
      "certificado_laboratorio" : "CERTIFICADO DE LABORATÓRIO",	
      "tipo_agua" : "TIPO DE ÁGUA",	
      "classificacao_subterranea" : "CLASSIFICAÇÃO DE ÁGUA SUBTERRÂNEA",	
      "ponto_referencia" : "PONTO DE REFERÊNCIA",	
      "locais_latitude" : "LATITUDE OU UTM-E",	
      "locais_longitude" : "LONGITUDE OU UTM-N",	
      "locais_identificacao" : "IDENTIFICAÇÃO OU NOME DE CORPO HÍDRICO",	
      "locais_bacia_hidrografica" : "BACIA HIDROGRÁFICA",	
      "locais_municipio" : "MUNICÍPIO"
    };
    var children = document.getElementById(source).childNodes;
    var rows = [];
    for (i in children){
      if (children[i].tagName === 'DIV'){
        if (rows.length === 0){
          var header = [];
          var keys = Object.keys(children[0].value[0]);
          //console.log(keys);
          for (j in keys){
            header.push(translationTable[keys[j]]);
          }
          rows.push(header);
        }
        //console.log(children[i].value[0]);
        var newRow = [];
        for (k in children[i].value[0]){
          newRow.push('"'+children[i].value[0][k]+'"');
        }
        rows.push(newRow);
      }
    }
    console.log(rows);
    let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Report.csv");
    document.body.appendChild(link); // Required for FF
    
    link.click();
  }


  function abrirMaisInfo(ident){
    //console.log(ident);
    //var tabelaInfo = ParametrosReferencia;
    $("#janelaInfo").show();
    $('#ParametrosReferencia').empty();
    var xhr = new XMLHttpRequest();
    var res;
    var data = { 
      'parametro': ident, 
    };

    xhr.open('POST', '/referencia', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        res = JSON.parse(xhr.response);
        console.log(res.references);
        var table = $('<table>');

        var headerRow = $('<tr>');
        headerRow.append($('<th>').text('Parâmetro'))
        headerRow.append($('<th>').text('Unidade'))
        headerRow.append($('<th>').text('Valor de Referência'))
        headerRow.append($('<th>').text('Tipo de Água'))
        headerRow.append($('<th>').text('Uso ou Classe de Água'))
        headerRow.append($('<th>').text('Classificação de Salinidade'))
        headerRow.append($('<th>').text('Notas Portaria'))
        headerRow.append($('<th>').text('Comentários Adicionais'))
        headerRow.append($('<th>').text('Condição'))
        table.append(headerRow)

        for(i=0; i < res.references.length; i++){
            var row = $('<tr>');
            row.append($('<td>').text(res.references[i].parametros_parametro))
            row.append($('<td>').text(res.references[i].unidade))
            row.append($('<td>').text(res.references[i].valor_maximo))
            row.append($('<td>').text(res.references[i].tipo_agua))
            row.append($('<td>').text(res.references[i].use_ou_classe_agua))
            row.append($('<td>').text(res.references[i].classe_superficial))
            row.append($('<td>').text(res.references[i].notas_portaria))
            row.append($('<td>').text(res.references[i].comentarios_adicionais))
            row.append($('<td>').text(res.references[i].condicao))
            table.append(row);
        }

        $('#ParametrosReferencia').append(table);
      }
    }; 
    //console.log(data); 
    xhr.send(JSON.stringify(data)); 
  }

  function gerarBotaoMaisInfo(ident){
    var button = document.createElement('div');
    button.style.display = "inline-block";
    button.innerHTML = `<button style="border-radius=100%; font-size:10px; margin-left:0.5vw;" onclick="abrirMaisInfo('`+ident+`')" type="button" >?</button>`;

    return button;
  }
  
  // prepararColeta
  function prepararColeta(coleta){
    var entry = document.createElement('div');

    var listaValores = [{identificador: "Parâmetro: ", valor: coleta.parametros_parametro},
      {identificador: "Parâmetro semelhante: ", valor:  coleta.parametro_semelhante},
      {identificador: "Unidade: ", valor:  coleta.parametros_unidade},
      {identificador: "Valor coletado: ", valor:  coleta.valor},
      {identificador: "Ponto de Referência do Local: ", valor:  coleta.ponto_referencia},
      {identificador: "Responsável pela Coleta: ", valor:  coleta.responsavel_coleta},
      {identificador: "Tipo de Água: ", valor:  coleta.tipo_agua}
    ]
    for (i in listaValores){
      var identificador = document.createElement('p');
      identificador.style.cssText="margin-left:0.5vw; font-weight: bold; display: inline-block;";
      identificador.appendChild(document.createTextNode(listaValores[i].identificador));
      entry.appendChild(identificador);

      var valor = document.createElement('p');
      valor.style.cssText="line-height: 1em; margin-left:0.5vw; display: inline-block;";
      valor.appendChild(document.createTextNode(listaValores[i].valor));
      entry.appendChild(valor);
      if (listaValores[i].identificador === "Parâmetro: "){
        entry.appendChild(gerarBotaoMaisInfo(coleta.parametros_parametro));
      }
      entry.appendChild(document.createElement('br'));
    }
    entry.appendChild(document.createElement('br'));
    delete coleta.id_coleta; 
    delete coleta.usuarios_username; 
    delete coleta.valor_convertido; 
    delete coleta.ano_convertido; 
    delete coleta.mes_convertido; 
    entry.value = [coleta];
    entry.style.cssText = "border-bottom: 1px solid black;";
    return entry;
  }

  // setSampleData: sets sample data in the display area
  // data: 
  function setSampleData(res){
    var x = document.getElementById("JanelaDeLocal");
    if (x.style.display  === "none"){
        x.style.display = "block";
    }

    $('#JanelaDeColetas').empty();
    var resultados = document.getElementById("JanelaDeColetas");
    for(var i=0;i<res.coletas.length;i++){
        resultados.appendChild(prepararColeta(res.coletas[i]));
    }  
  }

  function setDateAndSource(res){
    var data = document.getElementById('SeletorDataDeColetas');
    removeOptions(data);
    res.data.sort(function(a,b)
    { 
      if (a.ano_convertido === b.ano_convertido)
      {
        return a.mes_convertido - b.mes_convertido;
      }
      else {
        return a.ano_convertido - b.ano_convertido;
      }
    });
    for(i=0;i<res.data.length;i++){
      //console.log(res.data[i]);
      var entry = document.createElement('option');
      entry.value = res.data[i].data_coleta;
      entry.appendChild(document.createTextNode(res.data[i].data_coleta));
      data.appendChild(entry);
    }  
    var fonte = document.getElementById('SeletorFonteDeColetas');
    removeOptions(fonte);
    for(i=0;i<res.fonte.length;i++){
      //console.log(res.fonte[i]);
      var entry = document.createElement('option');
      entry.appendChild(document.createTextNode(res.fonte[i].fonte));
      fonte.appendChild(entry);
    }  
  }

  function ValidateDateOrSource(date,source){
    var coletas = document.getElementById('JanelaDeColetas').childNodes;
    for (var i = 0; i < coletas.length; i++) {
      if (coletas[i].tagName === "DIV")
      {
        if ((coletas[i].value[0].data_coleta === date || date === '') && (coletas[i].value[0].fonte === source || source === '')){
          coletas[i].style.display = "block";
        }
        else {
          coletas[i].style.display = "none";
        }
      }
    }
  }

  function simpleQuery(ident,lat_dec,long_dec){
    var xhr = new XMLHttpRequest();
    var data = { 
      'coleta_identificacao': ident, 
      'coleta_latitude': lat_dec,
      'coleta_longitude': long_dec
    };
    var res;
    xhr.open('POST', '/busca/simples', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        res = JSON.parse(xhr.response); 
        setSampleData(res);
        setDateAndSource(res);
      }
    }; 
    xhr.send(JSON.stringify(data));
  }

function advancedSearch(){
  var id = 0;
  var done = false;
  var data = [{'locais_identificacao': []},
  {'locais_bacia_hidrografica': []},
  {'locais_municipio': []},
  {'parametros_parametro': []},
  {'data_coleta': []}
  ];

  while (done === false){
    if($('#Filtro'+id).length > 0){
      filter = $('#TipoDeFiltro'+id)[0];
      //console.log(filter);
      if (filter.value === "Data de Coleta") {
        var mes = document.getElementById('MesSelecionado'+id);
        var ano = document.getElementById('AnoSelecionado'+id); 
        data[4].data_coleta.push([mes.value,ano.value]);
      }  
      else {
        var entry = document.getElementById('ValorSelecionado'+id);
        if (filter.value === "Identificação" && entry.value != ""){
          data[0].locais_identificacao.push(entry.value);
        }
        else if (filter.value === "Bacia Hidrográfica"  && entry.value != ""){
          data[1].locais_bacia_hidrografica.push(entry.value);
        }
        else if (filter.value === "Município" && entry.value != ""){
          data[2].locais_municipio.push(entry.value);
        }
        else if (filter.value === "Parâmetro" && entry.value != ""){   
          data[3].parametros_parametro.push(entry.value);
        }
      }    
    } 
    else {
      done = true;
    }
    id = id + 1;
  }
  var xhr = new XMLHttpRequest();
  var res;

  xhr.open('POST', '/busca/avancada', true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      res = JSON.parse(xhr.response);
      setAdvancedResults(res);
    }
  }; 
  //console.log(data); 
  xhr.send(JSON.stringify(data));
}


function prepararResultados(coleta){
  var entry = document.createElement('div');
  var listaValores = [
    {identificador: "Identificação:  ", valor: coleta.locais_identificacao},
    {identificador: "Bacia:  ", valor: coleta.locais_bacia_hidrografica},
    {identificador: "Município:  ", valor: coleta.locais_municipio},
    {identificador: "Parâmetro:  ", valor: coleta.parametros_parametro},
    {identificador: "Parâmetro semelhante:  ", valor:  coleta.parametro_semelhante},
    {identificador: "Unidade:  ", valor:  coleta.parametros_unidade},
    {identificador: "Valor coletado:  ", valor:  coleta.valor},
    {identificador: "Ponto de Referência do Local:  ", valor:  coleta.ponto_referencia},
    {identificador: "Responsável pela Coleta:  ", valor:  coleta.responsavel_coleta},
    {identificador: "Tipo de Água:  ", valor:  coleta.tipo_agua},
    {identificador: "Data de Coleta:  ", valor:  coleta.data_coleta},
    {identificador: "Latitude:  ", valor:  coleta.locais_latitude},
    {identificador: "Longitude:  ", valor:  coleta.locais_longitude}
  ]
  for (i in listaValores){
    if (listaValores[i].identificador === "Parâmetro: "){
      entry.appendChild(gerarBotaoMaisInfo(coleta.parametros_parametro));
    }
    var identificador = document.createElement('p');
    identificador.style.cssText="margin-left:0.5vw; font-weight: bold; display: inline-block;";
    identificador.appendChild(document.createTextNode(listaValores[i].identificador));
    var valor = document.createElement('p');
    valor.style.cssText="line-height: 1em; margin-left:0.5vw; display: inline-block;";
    valor.appendChild(document.createTextNode(listaValores[i].valor));
    entry.appendChild(identificador);
    entry.appendChild(valor);
    entry.appendChild(document.createElement('br'));
  }
  entry.appendChild(document.createElement('br'));
  delete coleta.id_coleta; 
  delete coleta.usuarios_username; 
  entry.value = [coleta];
  entry.style.cssText = "border-bottom: 1px solid black;";
  return entry;
}

function setAdvancedResults(res){
  var janela = document.getElementById('JanelaDeResultados');
  janela.style.display = "block";
  var resultados = document.getElementById("SubJanelaDeResultados");
  while (resultados.firstChild) {
    resultados.removeChild(resultados.firstChild);
  }
  if (res.success === true){
    if (res.coletas.length != 0){
      //console.log(res);
      popularResultadosFiltros(res.locais);
      for (i in res.coletas){
        resultados.appendChild(prepararResultados(res.coletas[i]));
      }
    }
    else{
      var subjanela = document.getElementById('SubJanelaDeResultados');
      var failMessage = document.createElement('p');
      failMessage.appendChild(document.createTextNode("Nenhum resultado encontrado."));
      subjanela.appendChild(failMessage);
    }
  }
  else {
    var subjanela = document.getElementById('SubJanelaDeResultados');
    var failMessage = document.createElement('p');
    failMessage.appendChild(document.createTextNode("Falha ao executar a busca!"));
    subjanela.appendChild(failMessage);
  }
}

function SetFilter(filter,indx){
    document.getElementById('ListaValoresFiltro'+indx).innerHTML = '';
    document.getElementById('FiltroDeValor'+indx).style.display = "block";
    document.getElementById('FiltroDeData'+indx).style.display = "none";
    if (filter != "Data de Coleta"){
      var xhr = new XMLHttpRequest();
      var data = { 
        'selectedFilter': filter
      };
      var res;
      xhr.open('POST', '/filtro', true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          res = JSON.parse(xhr.response); 
          // Set response into the datalist         
          for(i=0;i<res.filterData.length;i++){
            if (filter === "Identificação"){
              $("#ListaValoresFiltro"+indx).append("<option>" + res.filterData[i].identificacao + "</option>");
            }
            else if (filter === "Bacia Hidrográfica"){
              $("#ListaValoresFiltro"+indx).append("<option>" + res.filterData[i].bacia_hidrografica + "</option>");
            }
            else if (filter === "Município"){
              $("#ListaValoresFiltro"+indx).append("<option>" + res.filterData[i].municipio + "</option>");
            }
            else if (filter === "Parâmetro"){
              $("#ListaValoresFiltro"+indx).append("<option>" + res.filterData[i].parametro + "</option>");
            }
          }  
        }
      }; 
      xhr.send(JSON.stringify(data));
      // /console.log(data);
    }
    else {
      document.getElementById('FiltroDeValor'+indx).style.display = "none";
      document.getElementById('FiltroDeData'+indx).style.display = "block";
    }
  }
  
  function switchSearch(setTo){
    if(setTo === 'avancada'){
      var x = document.getElementById("BuscaSimples");
      if (x.style.display  != "none"){
        x.style.display = "none";
      }
      var y = document.getElementById("BuscaAvancada");
      if (y.style.display  === "none"){
        y.style.display = "block";
      }
      var z = document.getElementById("Buscador");
      z.value = "avancada"
      var w = document.getElementById("JanelaDeLocal");
      w.style.display = "none";
    }
    else if (setTo === 'simples'){
      var x = document.getElementById("BuscaAvancada");
      if (x.style.display  != "none"){
        x.style.display = "none";
      }
      var y = document.getElementById("BuscaSimples");
      if (y.style.display  === "none"){
        y.style.display = "block";
      }
      var z = document.getElementById("Buscador");
      z.value = "simples"
      var w = document.getElementById("JanelaDeResultados");
      w.style.display = "none";
    }
  }

  function addFilter(){
    var id = 0;
    var filtro = $('#Filtro0')[0];
    var done = false;
    while(done === false){
      if($('#Filtro'+id).length > 0){
        filtro = $('#Filtro'+id)[0];
      } else{
        filtro.insertAdjacentHTML('afterend', `<div id="Filtro${id}" style="margin-left:0.5vw; display: flex; ">\
        <label for="Filtro${id}">Filtrar:</label>\
        <select name="TipoDeFiltro${id}" id="TipoDeFiltro${id}" style="width: 100px;" onChange="SetFilter(this.value,${id})">\
          <option>-</option>\
          <option>Identificação</option>\
          <option>Bacia Hidrográfica</option>\
          <option>Município</option>\
          <option>Parâmetro</option>\
          <option>Data de Coleta</option>\
        </select>\
        <div id="FiltroDeValor${id}">\
          <input type="text" id="ValorSelecionado${id}" name="ValorSelecionado${id}" list="ListaValoresFiltro${id}" placeholder="Valor desejado" \
          style="width: 100px; margin-left:1.6%; margin-left:0.5vw;">\
          <datalist id="ListaValoresFiltro${id}" name="ListaValoresFiltro${id}" required>\
          </datalist>\
        </div>\
        <div id="FiltroDeData${id}" style="display: none; margin-left:0.5vw;">\
          <select id="MesSelecionado${id}" name="MesSelecionado${id}" required>\
            <option value="0">-</option>\
            <option value="1">Janeiro</option>\
            <option value="2">Fevereiro</option>\
            <option value="3">Março</option>\
            <option value="3">Outono</option>\
            <option value="4">Abril</option>\
            <option value="5">Maio</option>\
            <option value="6">Junho</option>\
            <option value="6">Inverno</option>\
            <option value="7">Julho</option>\
            <option value="8">Agosto</option>\
            <option value="9">Setembro</option>\
            <option value="9">Primavera</option>\
            <option value="11">Novembro</option>\
            <option value="12">Dezembro</option>\
            <option value="12">Verão</option>\
          </select>\
          <input id="AnoSelecionado${id}" name="AnoSelecionado${id}" type="number" min="1970" max="2050" placeholder="2021" required>\
        </div>\
        <br> \
      </div>`);
        done = true;
        //console.log("added filter ",id);
      }
      id = id+1;
    }
  }

  function removeFilter(){
    var id = 0;
    var filtro = $('#Filtro0')[0];
    var done = false;
    while(done === false){
      if($('#Filtro'+id).length > 0){
        filtro = $('#Filtro'+id)[0];
        var x = document.getElementById("Filtro"+id);
        //console.log(id , x);
      } else{
        if (id > 1){
          filtro.remove();
        }
        done = true;
      }
      id = id+1;
    }
  }

  function addCoordFilter(ident,lat,long){
    var resultados = document.getElementById("SubJanelaDeResultados");
    var children = resultados.childNodes;
    //console.log(lat, long);
    var coordLat = document.getElementById("FiltroCoordLat");
    var coordLong = document.getElementById("FiltroCoordLong");
    coordLat.value=lat;
    coordLong.value=long;
    for (i in children){
      if (children[i].tagName === 'DIV') {
        //console.log(children[i].value[0].locais_latitude, children[i].value[0].locais_longitude);
        if(children[i].value[0].locais_latitude === lat && children[i].value[0].locais_longitude === long){
          children[i].style.display = "block";
        }
        else {
          children[i].style.display = "none";
        }
      }
    }
  }