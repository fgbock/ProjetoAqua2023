from pyproj import Proj
from pandas import DataFrame
import numpy as np

myProj = Proj('EPSG:32724')
convert_enabled = True 

def ParseData(data):
    data_array = data.replace("/"," ").replace("de","").lower().split()
    mes = 0
    ano = int(data_array[1])
    if (data_array[0] == "dezembro" or data_array[0] == "verão"):
        mes = 12
    elif (data_array[0] == "novembro"):
        mes = 11
    elif (data_array[0] == "outubro"):
        mes = 10
    elif (data_array[0] == "setembro" or data_array[0] == "primavera"):
        mes = 9
    elif (data_array[0] == "agosto"):
        mes = 8
    elif (data_array[0] == "julho"):
        mes = 7
    elif (data_array[0] == "junho" or data_array[0] == "inverno"):
        mes = 6
    elif (data_array[0] == "maio"):
        mes = 5
    elif (data_array[0] == "abril"):
        mes = 4
    elif (data_array[0] == "março" or data_array[0] == "outono"):
        mes = 3
    elif (data_array[0] == "fevereiro"):
        mes = 2
    elif (data_array[0] == "janeiro"): 
        mes = 1
    print(f"Verificando parse data: {data} ==> {mes}/{ano}")
    return (ano, mes)

class Local:
    identificacao = ""
    bacia = ""
    municipio = ""
    latitude_decimal = 0.0
    longitude_decimal = 0.0
    latitude = ""
    longitude = ""
    latitude_fake = False
    longitude_fake = False
    coord_UTM_E = 0
    coord_UTM_N = 0
    altitude = 0
    ponto_referencia = ""
    
    def __init__(self, coluna):
        if (not coluna):
            self.identificacao = "placeholder"
        else:
            self.identificacao = coluna[0]
            self.bacia = coluna[1].replace('\n',' ').strip()
            self.municipio = coluna[2].replace('\n',' ').strip()
            if (coluna[3] != '' and coluna[4] != ''):      
                coluna[3] = (coluna[3].replace('º',' ').replace('°',' ').replace('\'',' ').
                    replace('"',' ').replace('.',' ').replace(',',' ').replace('’',' ').
                    replace('”','').replace('S','').replace('-',''))
                self.latitude = coluna[3]
                coord = coluna[3].split()
                i = 1
                for subval in coord:
                    self.latitude_decimal += (float(subval)/i)
                    i *= 60
                self.latitude_decimal = self.latitude_decimal * -1
                coluna[4] = (coluna[4].replace('º',' ').replace('°',' ').replace('\'',' ').
                    replace('"',' ').replace('.',' ').replace(',',' ').replace('’',' ').
                    replace('”','').replace('W','').replace('-',''))
                self.longitude = coluna[4]    
                coord = coluna[4].split()
                i = 1
                for subval in coord:
                    self.longitude_decimal += (float(subval)/i)
                    i *= 60
                self.longitude_decimal = self.longitude_decimal * -1
            elif (coluna[5] != '' and coluna[6] != ''):
                self.coord_UTM_E = int(coluna[5])
                self.coord_UTM_N = int(coluna[6])
                if (convert_enabled == True):
                    self.longitude_decimal, self.latitude_decimal = myProj(int(self.coord_UTM_E), int(self.coord_UTM_N), inverse=True)             
                    self.latitude_fake = True
                    self.longitude_fake = True
                    #print(f"{self.identificacao} = {self.longitude}, {self.latitude}")
            else:
                self.latitude = 0.0
                self.longitude = 0.0
                self.coord_UTM_E = 0.0
                self.coord_UTM_N = 0.0
            if (coluna[7] != ''):        
                self.altitude = int(coluna[7].replace("'",""))
            self.ponto_referencia = coluna[8]

# parsing de coleta para carregar no banco de dados
class Coleta:
    local = Local([])
    parametro = ""
    parametro_semelhante = ""
    valor = ""
    valor_convertido = 0.0
    valor_convertido_valido = False
    erro = ""
    unidade = ""
    metodo = ""
    data_pub = ""
    data_coleta = ""
    ano = 0
    mes = 0
    fonte = ""
    fonte_ativa = 0
    responsavel_div = ""
    responsavel_coleta = ""
    certificacao = False
    tipo_de_agua = ""
    classificacao_subterranea = ""

    def __init__(self, coluna):
        self.local = Local(coluna[0:9])
        self.parametro = coluna[9].strip().replace("\n","")
        self.parametro_semelhante = coluna[10]
        self.valor = coluna[11]
        try:
            self.valor_convertido = float(self.valor.replace(",","."))
            self.valor_convertido_valido = True
        except ValueError:
            self.valor_convertido = 0
        self.erro = coluna[12]
        self.unidade = coluna[13].strip().replace("\n","")
        self.metodo = coluna[14]
        self.data_pub = coluna[15]
        self.data_coleta = coluna[16]
        self.ano, self.mes = (ParseData(self.data_coleta) if (self.data_coleta != "") else (0,0))
        self.fonte = coluna[17]
        self.fonte_ativa = (1 if (coluna[18] == "sim") else 0)
        self.responsavel_div = coluna[19]
        self.responsavel_coleta = coluna[20]
        self.certificacao = coluna[21]
        self.tipo_de_agua = coluna[22]
        self.classificacao_subterranea = coluna[23]      