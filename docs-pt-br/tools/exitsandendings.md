# Exits & Endings (Saídas & Finais)

*Inalterado em relação ao Bitsy original.*

Saídas e finais são como o jogador se move entre cômodos, e como um jogo se conclui.

## Tipos

- **Exit (saída)** — uma conexão de mão dupla: ficar em cima dela em qualquer um dos cômodos manda o avatar pro local pareado. Saídas podem ligar dois cômodos diferentes, ou dois pontos do mesmo cômodo.
- **One-way exit (saída de mão única)** — se comporta como uma saída, mas só funciona de uma das duas pontas; andar sobre o lado de "destino" não faz nada.
- **Ending (final)** — um local que encerra o jogo quando o avatar chega nele. Finais não têm efeito de transição e não vão pra lugar nenhum — mas você ainda pode travá-los com um cadeado (veja abaixo), o que manda o avatar de volta pra onde ele veio se a condição não for atendida.

## Painel

- **Previous / next / new / duplicate / delete (anterior / próximo / novo / duplicar / deletar)** — os controles usuais de navegação e gerenciamento.
- **Marcadores de localização** — pré-visualizações em miniatura mostrando exatamente onde os pontos de entrada e (pras saídas) de saída ficam em seus cômodos. Você pode arrastar esses diretamente na visualização do cômodo, ou digitar coordenadas exatas da grade.
- **Efeito de transição** — fade ou slide, tocado quando o avatar passa por ali. A música de fundo pausa durante a transição.
- **Dialog (diálogo)** — anexe uma linha (ou diálogo completo) que toca quando a saída é usada, por exemplo uma fala de narrador.
- **Lock (cadeado)** — clicar em **+ add lock** anexa um pequeno template de script de diálogo que trava a saída atrás de uma condição (tipicamente "o jogador tem o item X"). Veja [FAQ: how to make a locked door](../faq/lockedDoor.md) pra um passo a passo completo. Por baixo dos panos, um cadeado é só um diálogo de ação de cômodo anexado à saída — não tem nada específico de saída na lógica de script, então você pode customizar a condição gerada como quiser.
