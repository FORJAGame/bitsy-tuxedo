# Bitsy System API v0.1 #

## Sobre ##
Essas APIs são a base sobre a qual a engine do Bitsy é construída. Elas são atualmente experimentais e provavelmente vão mudar significativamente de versão pra versão — pelo menos até eu chegar na v1.0. A implementação web dessas APIs é encontrada em [`editor/script/engine/system.js`](https://github.com/le-doux/bitsy/blob/main/editor/script/engine/system.js).

### IO (Entrada / Saída) ###

`bitsyLog(message, category)`

Escreve `message` no console de debug. A `category` opcional é usada pra filtrar mensagens de debug vindas de diferentes fontes, como o sistema, a engine e o editor.

`bitsyGetButton(buttonCode)`

Retorna `true` se o botão referido por `buttonCode` está pressionado.

Os códigos de botão são:
* `0 // UP`: Seta pra cima ou W no teclado, deslizar pra cima na tela sensível ao toque, d-pad pra cima no controle
* `1 // DOWN`: Seta pra baixo ou S no teclado, deslizar pra baixo na tela sensível ao toque, d-pad pra baixo no controle
* `2 // LEFT`: Seta pra esquerda ou A no teclado, deslizar pra esquerda na tela sensível ao toque, d-pad pra esquerda no controle
* `3 // RIGHT`: Seta pra direita ou D no teclado, deslizar pra direita na tela sensível ao toque, d-pad pra direita no controle
* `4 // OK`: (Avança o diálogo) "Qualquer tecla" no teclado, toque na tela sensível ao toque, botões de ação no controle
* `5 // MENU / RESTART`: (Reinicia o jogo) Ctrl+R no teclado, ainda sem controle por toque, botão start no controle

### Gráficos ###

`bitsySetGraphicsMode(mode)`

Define o modo gráfico atual. Existem dois: modo `0` é o modo pixel (onde você pode definir pixels individuais na tela), modo `1` é o modo tile (onde você define tiles no mapa de tiles).

`bitsySetColor(paletteIndex, r, g, b)`

Define uma cor na paleta do sistema (compartilhada tanto pela renderização de texto quanto de tiles).

`bitsyResetColors()`

Esvazia a paleta do sistema de todas as cores.

`bitsyDrawBegin(bufferId)`

Seleciona um buffer de desenho sobre o qual as funções de desenho seguintes vão atuar. O buffer `0` é sempre o buffer da tela, o buffer `1` é o buffer da caixa de texto, e `2` em diante são tiles. (Nota: não tenho certeza sobre o nome "buffer", mas eu estava tentando pensar em algo genérico que pudesse abranger a tela, a caixa de texto e os tiles, e foi o que eu cheguei por enquanto — pode mudar depois.)

`bitsyDrawEnd()`

Desmarca a seleção do buffer de desenho atual, se houver algum. Quaisquer funções de desenho adicionais vão falhar. Isso dá ao sistema hospedeiro a chance de fazer qualquer limpeza ou ações de commit que precise fazer com o buffer antes de renderizar.

`bitsyDrawPixel(paletteIndex, x, y)`

Define o pixel em `x` e `y` (dentro do buffer de desenho atual) pra cor da paleta em `paletteIndex`. O buffer da tela (`0`) só pode usar isso no modo pixel (`0`).

`bitsySetPixelAtIndex(paletteIndex, pixelIndex)`

Define o pixel em `pixelIndex` (dentro do buffer de desenho atual) pra cor da paleta em `paletteIndex`. Isso trata o buffer como um array unidimensional de pixels, então a indexação começa no canto superior esquerdo do buffer e se move ao longo do eixo x, dando a volta na largura do buffer. (Nota: ter duas funções de desenho de pixel é meio redundante.)

`bitsyDrawTile(tileId, x, y)`

Coloca o tile `tileId` no mapa de tiles do buffer atual em `x` e `y`. Só válido pro buffer da tela (`0`) no modo tile (modo `1`).

`bitsyDrawTextbox(x, y)`

Desenha a caixa de texto no buffer atual em `x` e `y`. Só válido pro buffer da tela (`0`) no modo tile (modo `1`).

`bitsyClear(paletteIndex)`

Limpa o buffer atual com a cor em `paletteIndex`.

`bitsyAddTile()`

Adiciona um novo tile e retorna seu número de id se houver espaço, caso contrário retorna `null`.

`bitsyResetTiles()`

Esvazia todos os tiles e reseta os números de id.

`bitsySetTextboxSize(w, h)`

Define a largura `w` e a altura `h` do buffer da caixa de texto.

### Eventos ###

`bitsyOnLoad(fn)`

Uma função a ser chamada quando o sistema carrega um jogo. Deve aceitar `gameData` e `defaultFontData` como entrada.

`bitsyOnQuit(fn)`

Uma função a ser chamada quando o sistema é encerrado.

`bitsyOnUpdate(fn)`

Uma função a ser chamada em cada ciclo de atualização. Ela vai tentar rodar a 60fps.
