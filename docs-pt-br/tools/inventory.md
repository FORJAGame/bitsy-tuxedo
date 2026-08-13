# Inventory (Inventário)

*Inalterado em relação ao Bitsy original.*

A ferramenta de inventário rastreia os dois tipos de estado que seu jogo pode carregar entre checagens de diálogo: **items (itens)** e **variables (variáveis)**.

## Items (Itens)

Itens são criados na ferramenta [Paint](paint.md) e aparecem aqui automaticamente. Durante o jogo, esbarrar num item aumenta sua contagem em 1. Essa contagem é exatamente o que condições de diálogo, cadeados de saída e finais checam — por exemplo, "a porta só abre quando o jogador pegou a chave".

Contagens de item sempre voltam pro seu valor inicial (padrão `0`, mas você pode definir um padrão diferente por item) no momento em que o modo de jogo termina.

## Variables (Variáveis)

Variáveis guardam qualquer coisa que você queira rastrear que não seja uma contagem de item — uma flag, um número, um pedaço de texto, um contador que só sobe no diálogo, etc. Crie quantas quiser, e dê um nome a cada uma.

Evite espaços em nomes de variáveis (`var1`, não `var 1`) — espaços tornam o nome mais difícil de referenciar corretamente a partir do script de diálogo.

Variáveis (e itens) podem ser lidas ou modificadas a partir do diálogo tanto pelas ações de item/variável do editor visual de diálogo, quanto diretamente na visualização de código do diálogo.

## Painel

- **Abas Items / Variables** — troque qual lista você está vendo.
- **Lista de itens** — todo item criado até agora, com sua contagem inicial padrão.
- **Lista de variáveis** — pares nome/valor, com botões pra adicionar uma variável nova ou deletar uma existente.
