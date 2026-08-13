# Paint (Pintura)

A ferramenta paint é onde você desenha todo objeto do seu jogo — o avatar, sprites, tiles e itens — pixel por pixel, com quadros de animação opcionais.

## Fundamentos de desenho

Todo desenho é uma grade quadrada de tamanho fixo (o mesmo tamanho pra todo desenho num jogo). Cada célula tem um de três papéis dependendo do tipo de desenho:

- **Tiles** usam a *cor de tile* da paleta como primeiro plano.
- **Avatares, sprites e itens** usam a *cor de sprite* da paleta como primeiro plano.
- Células vazias sempre mostram a *cor de fundo*.

(As cores de primeiro plano/fundo vêm da paleta do cômodo atual — veja [Colors](color.md). Um desenho também pode usar qualquer uma das cores adicionais da paleta além dessas duas, se a paleta tiver mais de três.)

## Ferramentas de desenho (Bitsy Tuxedo)

> **Mudança de comportamento em relação ao Bitsy original:** no Bitsy original, clicar num pixel *alterna* ele — clique num pixel preenchido pra apagá-lo, clique num vazio pra preenchê-lo. O Bitsy Tuxedo substitui esse comportamento único de clicar-pra-alternar por quatro ferramentas explícitas, selecionadas na fileira de botões acima do canvas:

- **Brush (pincel)** — clique ou arraste pra pintar com a cor selecionada atualmente. Essa é a ferramenta padrão.
- **Eraser (borracha)** — clique ou arraste pra limpar pixels de volta pro fundo, independente do que estiver sob o cursor.
- **Fill (preencher, balde)** — clique num pixel pra preencher com a cor selecionada todo pixel contíguo da mesma cor. O preenchimento não atravessa na diagonal e para em qualquer pixel de cor diferente.
- **Color Picker (conta-gotas)** — clique num pixel pra pegar a cor dele como a nova cor do pincel, e então volta automaticamente pra ferramenta pincel. Pegar um pixel de fundo (vazio) não faz nada.

**Undo / Redo (desfazer / refazer)** — botões na mesma fileira, ou os atalhos de teclado **Ctrl+Z** (desfazer) / **Ctrl+Y** (refazer). O histórico é por desenho: trocar pra um desenho diferente limpa sua pilha de desfazer, e o histórico guarda os últimos 50 traços. (Preencher conta como um único passo de desfazer, não importa quantos pixels muda; um arrasto de pincel/borracha também conta como um único passo, desfeito tudo de uma vez.)

Não há atalhos de tecla de letra pra trocar de ferramenta (B/E/F) — só Undo/Redo têm atalho de teclado. Troque de ferramenta clicando nos botões.

## Importando uma imagem (Bitsy Tuxedo)

Em vez de desenhar uma grade de pixels à mão, você pode importar um arquivo de imagem local direto pra um desenho:

1. Clique em **import** ao lado do canvas de pintura.
2. Escolha um arquivo de imagem local (qualquer formato comum que seu navegador consiga decodificar — PNG, JPG, GIF, etc.).
3. Escolha que tipo de desenho criar: tile, sprite, ou item. (Por padrão, usa o tipo que você tem selecionado atualmente na ferramenta de pintura.)
4. Clique em **import**.

Importar sempre **cria um tile/sprite/item totalmente novo** — não sobrescreve o desenho que você tem aberto no momento, mesmo que esse desenho seja do mesmo tipo. O novo desenho é adicionado ao final da sua lista (tile, sprite, ou item) e imediatamente selecionado pra que você veja o resultado.

A imagem é redimensionada (vizinho mais próximo, sem suavização) pra grade de pixels do desenho, e todo pixel opaco é comparado com a paleta atual do cômodo — correspondências exatas de cor reaproveitam um slot de paleta existente, e cores sem correspondência são adicionadas como novas cores da paleta. Pixels com transparência (alpha) abaixo de 50% viram transparentes/fundo.

Paletas têm um limite de 64 cores. Se uma importação precisasse de mais cores distintas do que as que restam, você vai receber um prompt de confirmação: prosseguir mapeia as cores extras pra correspondência de paleta existente mais próxima em vez de adicioná-las (com alguma perda de fidelidade de cor, mas a importação ainda se completa); cancelar aborta a importação pra que você possa simplificar a imagem primeiro.

O resultado importado é sempre um único quadro estático, nunca animado — se você quiser um desenho animado, importe-o como seu primeiro quadro e depois adicione quadros de animação à mão.

Não há corte (crop) ou tratamento de proporção: a imagem inteira é achatada/esticada pra caber na grade quadrada de pixels do desenho. Pra resultados previsíveis, comece com uma imagem de origem que já seja quadrada (ou próxima disso) e de baixa resolução.
