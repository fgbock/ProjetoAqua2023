import mysql.connector
import csv
import sys
import parsesheet as p
from tabulate import tabulate

mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="admin",
    database="qualidadedasaguas3"
)

print ('Number of arguments:', len(sys.argv), 'arguments.')
print ('Argument List:', str(sys.argv))

InserirLocais = False
InserirParametros = False
InserirColetas = False

if (len(sys.argv)  == 2):
    if (sys.argv[1] == "-l"):
        InserirLocais = True
    elif (sys.argv[1] == "-p"):
        InserirParametros = True
    elif (sys.argv[1] == "-c"):
        InserirColetas = True

dict_locais = {}
dict_parametros = {}
coletas = []
i = 0
parametro_vazio = 0
with open('../Sheets/qualidade_sample_2.csv', newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        #j += 1
        #print(j)
        # Encontra header, salva info para atribuir as coletas
        if (len(row) == 2):
            bacia_codigo = row[0]
        else:
            coletas.append(p.Coleta(row))
            # achar todos os locais de coleta
            key = (coletas[i].local.identificacao, coletas[i].local.latitude_decimal, coletas[i].local.longitude_decimal, coletas[i].local.coord_UTM_E, coletas[i].local.coord_UTM_N, coletas[i].local.altitude, coletas[i].local.municipio, coletas[i].local.bacia)
            if dict_locais.get(key) is None:
                dict_locais[key] = (coletas[i].local)
            # dict param
            key = (coletas[i].parametro, coletas[i].unidade)
            if dict_parametros.get(key) is None:
                dict_parametros[key] = coletas[i]
            if (coletas[i].parametro == ""):
                parametro_vazio  += 1
            i += 1
coletas_total_count = i


# # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                   #
#                     Locais                        #
#                                                   #
# # # # # # # # # # # # # # # # # # # # # # # # # # #
# Verificar locais
i = 0
j = 0
locais_c = []
locais_sc = []
for key in dict_locais:
    if ((dict_locais[key].latitude_decimal != 0 and dict_locais[key].longitude_decimal != 0) or (dict_locais[key].coord_UTM_E != 0 and dict_locais[key].coord_UTM_N != 0)):
        locais_c.append(["Local " + str(i), dict_locais[key].identificacao, dict_locais[key].latitude_decimal, dict_locais[key].longitude_decimal, dict_locais[key].coord_UTM_E, dict_locais[key].coord_UTM_N, dict_locais[key].altitude, dict_locais[key].municipio.replace('\n',''), dict_locais[key].bacia.replace('\n',''), dict_locais[key].ponto_referencia.replace('\n','')])
        i+=1
    else:
        locais_sc.append(["Local " + str(j), dict_locais[key].identificacao, dict_locais[key].latitude_decimal, dict_locais[key].longitude_decimal, dict_locais[key].coord_UTM_E, dict_locais[key].coord_UTM_N, dict_locais[key].altitude, dict_locais[key].municipio.replace('\n',''), dict_locais[key].bacia.replace('\n',''), dict_locais[key].ponto_referencia.replace('\n','')])
        j+=1
print("\n\nLocais COM coordenadas:")
print(tabulate(locais_c,headers=["Local","Identificacao", "Latitude","Longitude", "UTM E", "UTM N", "Altitude", "Municipio","Bacia","Ponto de Ref"]))
print("\n\nLocais SEM coordenadas:")
print(tabulate(locais_sc,headers=["Local","Identificacao", "Latitude","Longitude", "UTM E", "UTM N", "Altitude","Bacia","Ponto de Ref"]))

# Enviar os locais para o banco de dados
if (InserirLocais):
    mycursor = mydb.cursor()
    sql = "INSERT INTO locais (identificacao, latitude_decimal, longitude_decimal, utm_e, utm_n, altitude, municipio, bacia_hidrografica, latitude, longitude) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = []
    i = 1
    for key in dict_locais:
        if (dict_locais[key].latitude_decimal != 0 and dict_locais[key].longitude_decimal != 0):
            aux = (dict_locais[key].identificacao
            ,'%.6f' % dict_locais[key].latitude_decimal
            ,'%.6f' %  dict_locais[key].longitude_decimal
            ,dict_locais[key].coord_UTM_E
            ,dict_locais[key].coord_UTM_N
            ,dict_locais[key].altitude
            ,dict_locais[key].municipio
            ,dict_locais[key].bacia
            ,dict_locais[key].latitude
            ,dict_locais[key].longitude)
            ##print(aux)
            val.append(aux)
            i += 1
    
    mycursor.executemany(sql, val)
    mydb.commit()
    print(mycursor.rowcount, "was inserted.")

# # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                   #
#                     Parametros                    #
#                                                   #
# # # # # # # # # # # # # # # # # # # # # # # # # # #
# Verificar parametros
print("\n\n\n\nParametros:")
print(f"Quantidade de campos de parametro vazios = {parametro_vazio}\n")
parametros = []
for key in dict_parametros:
    parametros.append([dict_parametros[key].parametro.replace("\u03bc",""), dict_parametros[key].unidade.replace("\u03bc","")])
print(tabulate(parametros,headers=["Parametro", "Ident. Parametro", "Unidade"]))

# Enviar os parametros para o banco de dados 
if (InserirParametros):
    # verificar parametros
    mycursor = mydb.cursor()
    sql = "INSERT INTO parametros (parametro, unidade, usa_unidade) VALUES (%s, %s, %s)"
    val = []
    i = 1
    for key in dict_parametros:
        val.append((dict_parametros[key].parametro
        ,dict_parametros[key].unidade
        ,(str(1) if (dict_parametros[key].unidade == "") else str(0))))
        i += 1
    #print(val)
    mycursor.executemany(sql, val)

    mydb.commit()
    print(mycursor.rowcount, "was inserted.")

# # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                   #
#                      Coletas                      #
#                                                   #
# # # # # # # # # # # # # # # # # # # # # # # # # # #
# Verificar coletas
# local
identificacao_vazia = 0
latitude_vazia = 0
longitude_vazia = 0
utm_e_vazia = 0
utm_n_vazia = 0
altitude_vazia = 0 
ponto_ref_vazia = 0
bacia_vazia = 0
municipio_vazia = 0
# param
parametro_vazio = 0
unidade_vazia = 0
# resto
parametro_semelhante_vazio = 0
valor_vazio  = 0
erro_vazio  = 0
metodo_vazio  = 0
data_pub_vazio  = 0
data_coleta_vazio  = 0
fonte_vazio  = 0
responsavel_div_vazio  = 0
responsavel_coleta_vazio  = 0
certificacao_vazio = 0
tipo_de_agua_vazio = 0
classificacao_subterranea_vazio = 0

for coleta in coletas:
    #if (coleta.local.identificacao == "Rio Taquari"):
    #    print(coleta.local.latitude_decimal," ", coleta.local.longitude_decimal, coleta.data_coleta," ", coleta.ano, "\n")
    # local
    if (coleta.local.identificacao == ""):
        identificacao_vazia += 1
    if (coleta.local.latitude_decimal == 0):
        latitude_vazia += 1        
    if (coleta.local.longitude_decimal == 0):
        longitude_vazia += 1
    if (coleta.local.coord_UTM_E == 0):
        utm_e_vazia += 1        
    if (coleta.local.coord_UTM_N == 0):
        utm_n_vazia += 1
    if (coleta.local.altitude == 0):
        altitude_vazia += 1      
    if (coleta.local.ponto_referencia == ""):
        ponto_ref_vazia += 1        
    if (coleta.local.bacia == ""):
        bacia_vazia += 1
    if (coleta.local.municipio == ""):
        municipio_vazia += 1                
    # param
    if (coleta.parametro == ""):
        parametro_vazio += 1
    if (coleta.unidade == ""):
        unidade_vazia += 1        
    # resto
    if (coleta.parametro_semelhante == ""):
        parametro_semelhante_vazio += 1
    if (coleta.valor == ""):
        valor_vazio += 1
    if (coleta.erro == ""):
        erro_vazio += 1
    if (coleta.metodo == ""):
        metodo_vazio += 1
    if (coleta.data_pub == ""):
        data_pub_vazio += 1
    if (coleta.data_coleta == ""):
        data_coleta_vazio += 1
    if (coleta.fonte == ""):
        fonte_vazio += 1
    if (coleta.responsavel_div == ""):
        responsavel_div_vazio += 1
    if (coleta.responsavel_coleta == ""):
        responsavel_coleta_vazio += 1
    if (coleta.certificacao == ""):
        certificacao_vazio += 1
    if (coleta.tipo_de_agua == ""):
        tipo_de_agua_vazio += 1
    if (coleta.classificacao_subterranea == ""):
        classificacao_subterranea_vazio += 1
campos_vazios = []
# local
campos_vazios.append(["Identificacao",identificacao_vazia])
campos_vazios.append(["Latitude",latitude_vazia])
campos_vazios.append(["Longitude",longitude_vazia])
campos_vazios.append(["UTM E",utm_e_vazia])
campos_vazios.append(["UTM N",utm_n_vazia])

campos_vazios.append(["Altitude",altitude_vazia])
campos_vazios.append(["Ponto de Referencia",ponto_ref_vazia])
campos_vazios.append(["Bacia",bacia_vazia])
campos_vazios.append(["Municipio",municipio_vazia])
# param
campos_vazios.append(["Parametro",parametro_vazio])
campos_vazios.append(["Unidade",unidade_vazia])
# resto
campos_vazios.append(["Parametro Semelhante",parametro_semelhante_vazio])
campos_vazios.append(["Valor",valor_vazio])
campos_vazios.append(["Erro",erro_vazio])
campos_vazios.append(["Metodo",metodo_vazio])
campos_vazios.append(["Data de Publicacao",data_pub_vazio])
campos_vazios.append(["Data de Coleta",data_coleta_vazio])
campos_vazios.append(["Fonte",fonte_vazio])
campos_vazios.append(["Responsavel Divulgacao",responsavel_div_vazio])
campos_vazios.append(["Responsavel Coleta",responsavel_coleta_vazio])
campos_vazios.append(["Certificacao",certificacao_vazio])
campos_vazios.append(["Tipo de Agua",tipo_de_agua_vazio])
campos_vazios.append(["Classificacao Subterranea",classificacao_subterranea_vazio])
print("\n\n\n\nColetas:")
print(tabulate(campos_vazios,headers=["Campo", "Quantidade de entradas vazias"]))

failed_entry_count = 0
# Enviar as coletas para o banco de dados
if (InserirColetas):
    # verificar parametros
    mycursor = mydb.cursor()
    sql = "INSERT INTO coletas (parametros_parametro, parametros_unidade, data_publicacao,\
        parametro_semelhante, valor, valor_convertido, erro, responsavel_divulgacao, responsavel_coleta,\
        data_coleta, ano_convertido, mes_convertido, fonte, fonte_ativa, certificado_laboratorio, tipo_agua, classificacao_subterranea\
        , locais_identificacao, locais_latitude, locais_longitude, ponto_referencia, locais_municipio, locais_bacia_hidrografica, usuarios_username, status\
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = []
    i = 1
    for coleta in coletas:
        #if (coleta.local.identificacao == "Rio Tega" and coleta.parametro == "Alumínio total"):
            #print(coleta.data_coleta,coleta.local.latitude,coleta.local.longitude,coleta.local.coord_UTM_E,coleta.local.coord_UTM_N)
        if (coleta.data_coleta != "" and coleta.ano != 0 and coleta.mes != 0 and coleta.local.latitude != 0 and coleta.local.longitude != 0):
            if (False):
                sql = "SELECT * FROM locais WHERE identificacao = '" + coleta.local.identificacao + "'"
                mycursor.execute(sql)
                myresult = mycursor.fetchall()
                for x in myresult:
                    print(x)
                print(f"Where we needed... {coleta.local.identificacao} - {coleta.local.latitude_decimal}  - {coleta.local.longitude_decimal} \n\n")
            val = (coleta.parametro
            ,coleta.unidade
            ,coleta.data_pub
            ,coleta.parametro_semelhante
            ,coleta.valor
            ,(coleta.valor_convertido if (coleta.valor_convertido_valido) else str(-1))
            ,coleta.erro
            ,coleta.responsavel_div
            ,coleta.responsavel_coleta
            ,coleta.data_coleta
            ,coleta.ano
            ,coleta.mes
            ,coleta.fonte
            ,coleta.fonte_ativa
            ,(str(1) if coleta.certificacao else str(0))
            ,coleta.tipo_de_agua
            ,coleta.classificacao_subterranea
            ,coleta.local.identificacao            
            ,coleta.local.latitude_decimal
            ,coleta.local.longitude_decimal
            ,coleta.local.ponto_referencia
            ,coleta.local.municipio
            ,coleta.local.bacia
            ,'admin'
            ,str(1))
            i += 1

            try:
                mycursor.execute(sql, val)
                mydb.commit()
            except:
                import io
                with io.open('errorlog.txt', "w", encoding="utf-8") as f:
                    f.write(mycursor.statement)
                    f.close()
                raise
        else:
            failed_entry_count += 1
    #print(val)
    
    print(mycursor.rowcount, "was inserted.")

    print(f"\n\nFailed {failed_entry_count} out of {coletas_total_count}")