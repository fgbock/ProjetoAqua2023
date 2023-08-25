Exemplo de backlog:
+ Tarefa (estimativa Story Points) 
+ 
🔥Story Points🔥
+ **0.1 
+ **0.5 
+ **1 
+ **3 
+ **5 
+ **8

## Done or WIP
+ ~~Colocar "busca avançada" no menu principal 🔥**0.1 
+ ~~Trocar título para "Qualidade das águas do Rio Grande do Sul" 🔥**0.1
+ Remover a ferramenta “Contato” e colocar as informações de contato juntamente com as informações contidas na aba “Sobre”. 🔥**0.1
+ Arrumar páginas de contato e sobre (quebradas) 🔥**0.1
+ Melhorias gerais de código 🔥**5
	+ Arrumando mecanismo de buscas
	+ Arrumando HTML de páginas

## Front End
+ Zoom ao clicar em ponto no mapa 🔥**0.5
+ Remover bordas dos componentes de UI, usar cores diferentes e sombra pra separar 🔥**0.5
+ Remover a informação: “Responsável pela Coleta” 🔥**0.1
+ Remover a frase “Dados de Coletas:” que aparece no cabeçalho do quadro 🔥**0.1
+ Deixar a Latitude e Longitude como está na [[task_1.png|imagem anexada]] (em negrito e centralizado), inclusive para aqueles pontos que possuem nome do corpo hídrico. Esta situação não estava acontecendo quando havia nome do corpo hídrico. Quando houver nome do corpo hídrico, esta informação pode aparecer junto aos demais dados, após o cabeçalho. 🔥**0.1
+ Colocar as informações na seguinte ordem:  🔥**0.1
	`Identificação do corpo hídrico:.... 
	`Bacia:.... 
	`Município:.... 
	`Ponto de Referência:....
	`Parâmetro: Fósforo
	`Valor observado: 1,6 mg/L…
+ Valor e unidade deveriam aparecer juntos 🔥**0.1
+ Ao lado do “valor observado”, como exemplificado abaixo, deverá aparecer uma  caixinha com “Valores de Referência” 🔥**0.1
+ Ao lado do “parâmetro” deverá aparecer 3 caixinhas com “informações”, “efeito à saúde” e “efeito ao meio ambiente”, devendo ser símbolos de ponto de interrogação, um coração e uma árvore; Na caixinha “Informações” mencionada no item anterior, filtrar para mostrar as informações de “Definição”, “Efeito ao meio ambiente” e “Efeito à saúde” do parâmetro correspondente, semelhante ao que já é feito para as legislações. Estas informações estão sendo compiladas na seguinte planilha: [https://docs.google.com/spreadsheets/d/1uvepl2L-WsriGjjkjIYNqS_BnaxSMfVwDV2y8yzpzbE/edit#gid=0](https://docs.google.com/spreadsheets/d/1uvepl2L-WsriGjjkjIYNqS_BnaxSMfVwDV2y8yzpzbE/edit#gid=0) Não é necessário aparecer para o usuário a fonte. 🔥0.5
+ Melhoria de UI da página de formulário 🔥0.5
+ Na caixinha “Valores de Referência”, que mostra os valores das legislações, filtrar os valores de acordo com o tipo de água que está sendo considerado na busca, se superficial, subterrânea ou consumo humano. Atualmente está mostrando para todos os tipos de água, o que pode confundir o usuário.  I.e. Janela de valores de referência não precisa de informações vazias, criar janela móvel🔥**1
+ Ao digitar algo na busca e o mapa ser centralizado para o local, mostrar os alfinetes nas cores: marrom para subterrânea, verde para superficial e azul para consumo humano. 🔥**0.5

## Back End / Misto
+ Trocar as expressões “Painel do Usuário” para “Pesquisador” e  “Principal” para “Início”. 🔥**0.1
+ Remover a ferramenta “Buscar” e permitir que a busca seja feita após digitar e clicar “enter” no PC - colocar lupa para indicar que é um buscador. 🔥**0.1
+ Trocar a frase dentro da barra de busca por “corpo hídrico, município, parâmetro...” 🔥**0.1
+ Na informação “Fonte de Coleta”, habilitar para o usuário clicar e ser redirecionado ao website do link em uma nova guia, pois antes precisava copiar e colar.  🔥**0.1
+ Ainda, alterar o nome de “Fonte de Coleta” para “Fonte dos Dados”. 🔥**0.1
+ Colocar a informação “Tipo de Água” no cabeçalho do quadro, e deixar o campo com a opção para seleção (assim como está a data e a fonte) pois há alguns dados de mesmo local, mesma data e mesma autoria, mas com tipos de água diferentes. Desta forma, o usuário poderá selecionar o tipo de água que deseja: consumo humano, subterrânea ou superficial. 🔥**0.5
+ Permitir que todas as informações (valores de referência, contatos/sobre, usuários, textos de informação, efeito a saúde e efeito ao meio ambiente) possam ser atualizadas pela equipe do projeto com uma determinada frequência. 🔥**3
+ Inserir uma contagem de acessos à página e um link para a pessoa que quiser, dar uma classificação e sugestões de melhoria ao website. 🔥**0.5
+ Permitir que, no momento da inserção, o pesquisador consiga inserir um grande volume de dados ao mesmo tempo. Por exemplo, em alguns casos teremos mais de 1 milhão de dados em uma planilha do Excel, que desejamos inserir no website, de uma só vez. 🔥5
+ Ao fazer uma busca por uma água subterrânea em uma determinada localização, o website deve procurar em sua base de dados, se este poço está cadastrado e se sim, mostrar a situação e o uso do poço. E, com base na informação obtida sobre o uso do poço, o website deve buscar na sua planilha sobre legislação de águas subterrâneas, quais os limites para cada parâmetro. 🔥**3
+ Ao mostrar o valor de referência, colocar ao lado um sinal de atenção "⚠️", caso esteja acima do valor ou um sinal de “check” ✅ caso esteja dentro do valor. PARA ESTA FUNÇÃO ANALISAR SE PRECISA NÓS FAZER UMA CONVERSÃO DE UNIDADES ; ANALISAR QUAIS PARÂMETROS QUE VAI SER POSSÍVEL FAZER A COMPARAÇÃO NUMÉRICA;; 🔥**3
