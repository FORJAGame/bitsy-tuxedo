# Como fazer uma porta trancada

*Mecânica inalterada em relação ao Bitsy original.*

Existem muitas variações de uma porta trancada; este guia passa pela versão básica — usar um item pego (por exemplo, uma chave ou cartão de membro) pra desbloquear a passagem por um guarda ou portão.

1. **Coloque suas peças.** Ponha o objeto "porta trancada" (um sprite, tipo um guarda, ou um tile) e o item chave no cômodo.
2. **Crie as saídas.** Em [Saídas & Finais](../tools/exitsandendings.md), adicione um ponto de entrada antes da porta trancada e um ponto de saída depois dela, pra que o jogador tenha que passar pelo ponto travado.
3. **Adicione o cadeado.** Com a saída "antes" selecionada, clique em **+ add lock** — isso gera um script de diálogo inicial que checa uma condição antes de deixar a saída disparar.
4. **Escreva os dois resultados.** No editor de diálogo, preencha o que acontece se o jogador *tem* a chave (deixe ele passar) e o que acontece se ele *não tem* (mantenha ele no lugar, talvez com uma linha de diálogo explicando o motivo). Defina qual item é a chave e quantos são necessários.
5. **Opcional: consumir a chave.** Se você quiser que a chave seja gasta (estilo Zelda), adicione uma ação de item no ramo "tem a chave" que diminui a contagem do item em 1.

O mesmo padrão — travar uma saída ou final atrás de uma checagem de item/variável — funciona pra qualquer condição, não só "tem um item": uma flag de variável de uma conversa anterior, uma quantidade mínima de um item diferente, etc.
