import mysql.connector
import csv
import sys
import parsesheet as p
from tabulate import tabulate

mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="admin",
    database="QualidadeDasAguas3"
)

print ('Number of arguments:', len(sys.argv), 'arguments.')
print ('Argument List:', str(sys.argv))

InserirAbastecimento = False
InserirSuperficiais = False
InserirSubterranea = False

if (len(sys.argv)  == 2):
    if (sys.argv[1] == "-a"):
        InserirAbastecimento = True
        filename = "Param_Abastecimento.csv"
        myHeaders = ["Uso da água","Parâmetro","Valor máximo permitido","Unidade,Notas da portaria"]
    elif (sys.argv[1] == "-s"):
        InserirSuperficiais = True
        filename = "Param_Superficiais.csv"
        myHeaders = ["Classe da água","Classificação da salinidade","Parâmetro","Valor máximo permitido","Unidade","Notas da portaria","Comentário adicional","Condição"]
    elif (sys.argv[1] == "-u"):
        InserirSubterranea = True
        filename = "Param_Subterranea.csv"
        myHeaders = ["Uso da água","Parâmetro","Valor máximo permitido","Unidade","Notas da portaria","Comentário adicional"]
else:
    exit()

parametros = []
i = 0
parametro_vazio = 0

with open('../Sheets/'+filename, newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        # Encontra header, salva info para atribuir as coletas
        parametros.append(row)
        #print(parametros)
#print(tabulate(parametros,headers=myHeaders))


sql = "INSERT INTO valores_referencia \
    (parametros_parametro, unidade, tipo_agua, use_ou_classe_agua,\
    classe_superficial, valor_maximo, notas_portaria, comentarios_adicionais, condicao) \
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"

# # # # # # # # # # # # # # # # # # # # # # # # # # #
#                    Subterranea                    #
# # # # # # # # # # # # # # # # # # # # # # # # # # #
# Enviar os parametros para o banco de dados 
failed_entry_count  = 0
if (InserirSubterranea):
    # verificar parametros
    mycursor = mydb.cursor()
    val = []
    i = 1
    for row in parametros:
        val = (row[1]
        ,row[3]
        ,"Subterrânea"
        ,row[0]
        ,""
        ,row[2]
        ,row[4]
        ,row[5]
        ,"")
        #print(row)
        i += 1
    #print(val)
        try:
            mycursor.execute(sql, val)
            mydb.commit()
        except:
            import io
            with io.open('errorlog.txt', "w", encoding="utf-8") as f:
                f.write(mycursor.statement)
                f.close()
            failed_entry_count += 1      

    mydb.commit()
    print(f"Inserted {i - failed_entry_count} entries out of {i}")

# # # # # # # # # # # # # # # # # # # # # # # # # # #
#                    Superficial                    #
# # # # # # # # # # # # # # # # # # # # # # # # # # #
# Enviar os parametros para o banco de dados 
failed_entry_count  = 0
if (InserirSuperficiais):
    # verificar parametros
    mycursor = mydb.cursor()
    val = []
    i = 1
    for row in parametros:
        val = (row[2]
        ,row[4]
        ,"Superficial"
        ,row[0]
        ,row[1]
        ,row[3]
        ,row[5]
        ,row[6]
        ,row[7])
        #print(row)
        i += 1
    #print(val)
        try:
            mycursor.execute(sql, val)
            mydb.commit()
        except:
            import io
            with io.open('errorlog.txt', "w", encoding="utf-8") as f:
                f.write(mycursor.statement)
                f.close()
            failed_entry_count += 1      

    mydb.commit()
    print(f"Inserted {i - failed_entry_count} entries out of {i}")