# Visão Geral

O Bitsy apresenta suas ferramentas como um conjunto de painéis ("cards") num espaço de trabalho, com uma barra de ferramentas no topo pra mostrar ou esconder cada um. Os jogos são feitos de **salas** interconectados — grades fixas de 16×16 tiles — pelos quais seu **avatar** anda, conversando com **sprites**, pegando **itens** e passando por **saídas** pra outros salas.

Você pode testar seu jogo a qualquer momento e entregar o resultado como um único arquivo HTML autocontido que roda em qualquer navegador — sem precisar de servidor ou instalação.

## Interface

- **Título do jogo** — o campo de texto no topo; isso é o que aparece na tela de título/início do jogo.
- **Botão Tools** — mostra ou esconde toda a barra de ferramentas.
- **Botão Play** — troca pro modo de jogo pra testar o jogo como um jogador experimentaria. Aperte de novo pra voltar a editar. Jogar **não** modifica os dados do seu jogo — quaisquer variáveis/itens de diálogo são resetados no momento em que você sai do modo de jogo.
- **Barra de ferramentas** — um botão de alternância por ferramenta. Um botão fica azul escuro quando seu painel está aberto. Desativá-lo só esconde o painel; não descarta nada.
- **Espaço de trabalho** — onde os painéis abertos ficam. Arraste um painel pela barra de título pra reposicioná-lo, ou clique no botão de fechar (✕) pra escondê-lo — o mesmo que desativá-lo na barra de ferramentas.

### Barra de ferramentas, edição Bitsy Tuxedo

A barra de ferramentas do Bitsy original tem um botão por ferramenta (paint, colors, dialog, room, tune, blip, exits, inventory, find, game, settings). A barra de ferramentas do Tuxedo é diferente de duas formas:

1. **Tune e Blip são mesclados** num único botão **Music**. Abri-lo te dá três abas — tune, blip e o novo importador de áudio — em vez de dois painéis separados. Veja [Music](../tools/music.md).
2. **Um novo botão Theme** abre um pequeno painel pro modo escuro e cores de destaque customizadas. Isso é puramente uma preferência pessoal do editor (armazenada no seu navegador) e não tem efeito no jogo exportado. Veja [Theme](../tools/theme.md).

Dentro do painel Paint especificamente, o Tuxedo também adiciona uma fileira explícita de botões de ferramentas de desenho (pincel / borracha / preencher / conta-gotas / desfazer / refazer) e um botão "import" pra trazer imagens externas — ambos cobertos em [Paint](../tools/paint.md).

## Vocabulário essencial

- **Avatar** — o objeto que o jogador controla. Todo jogo tem exatamente um desenho de avatar, embora um sala possa trocar por um sprite diferente como o "jogador" se você quiser.
- **Sprite** — um objeto que o avatar pode esbarrar pra disparar diálogo. Cada sprite colocado no mundo é uma instância distinta, mesmo que dois sprites compartilhem o mesmo desenho.
- **Tile** — cenário não interativo. Tiles podem opcionalmente ser marcados como "parede", o que bloqueia o avatar de andar sobre eles.
- **Item** — um colecionável; esbarrar em um adiciona ele ao inventário e pode disparar diálogo.
- **Exit (saída)** — uma passagem entre dois pontos, possivelmente em salas diferentes (veja [Saídas & Finais](../tools/exitsandendings.md)).

Veja o [Glossário](../glossary.md) pras definições resumidas.
