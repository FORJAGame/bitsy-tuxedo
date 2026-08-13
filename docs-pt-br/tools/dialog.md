# Dialog (Diálogo)

*Inalterado em relação ao Bitsy original — o Bitsy Tuxedo não modifica o comportamento de diálogo, só alguma localização de strings do editor por baixo dos panos.*

A ferramenta de diálogo é onde você escreve tudo que um sprite, item, saída ou final fala, além do texto padrão da tela de título do jogo. Diálogos vão de uma única linha de texto até conversas ramificadas e condicionais.

## Painel de diálogo

- **Campo Name (nome)** — um rótulo interno pra esse diálogo (não mostrado aos jogadores), útil pra encontrá-lo de novo depois.
- **Previous / next (anterior / próximo)** — percorra todo diálogo do jogo.
- **New / duplicate / delete (novo / duplicar / deletar)** — crie um diálogo novo, copie o atual, ou remova-o (com confirmação).
- **Find (buscar)** — pule pra ferramenta [Find](find.md), já pré-filtrada pra diálogos.
- **Editor de texto** — a superfície de escrita de fato. Você pode dividir um diálogo em várias seções (reordenáveis, deletáveis) — seções são comumente usadas pra lógica de ramificação.
- **Alternância de visualização de código** — troque entre o editor de texto amigável e o script de diálogo bruto, pra qualquer coisa que o editor visual não exponha um botão pra fazer.
- Editar o diálogo de um sprite/item mantém a pré-visualização do desenho da ferramenta de pintura sincronizada automaticamente, então você pode ver pra quê está escrevendo o diálogo.

## Efeitos de texto

Selecionar texto e aplicar um efeito envolve ele num par de tags que a engine renderiza de forma especial:

| Efeito | Tag |
|---|---|
| Ondulado (Wavy) | `{wvy}...{/wvy}` |
| Tremido (Shaky) | `{shk}...{/shk}` |
| Arco-íris (Rainbow) | `{rbw}...{/rbw}` |
| Recolorir (Recolor) | `{clr N}...{/clr}` onde `N` é um índice de cor da paleta (ex.: `{clr 0}` pra cor de fundo) |

## Incorporando desenhos no texto

Você pode inserir uma renderização ao vivo de qualquer desenho no meio de uma linha de diálogo:

- `{drws "nome ou id"}` — um sprite ou o avatar
- `{drwt "nome ou id"}` — um tile
- `{drwi "nome ou id"}` — um item

Tanto o nome interno do desenho quanto seu id numérico funcionam.

## Além do texto

O script de diálogo também cobre lógica condicional e ações que mudam de cômodo, tocam sons, ou modificam itens/variáveis — essas são escritas diretamente na visualização de código. Veja [Advanced Topics: Scripting](../advancedTopics/scripting.md) pra algumas dicas, e [FAQ: locked door](../faq/lockedDoor.md) pra um exemplo prático que combina uma condição com um cadeado de saída.
