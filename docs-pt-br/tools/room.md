# Room (Cômodo)

*Inalterado em relação ao Bitsy original, além do menu suspenso de música agora também listar arquivos de áudio importados — veja abaixo.*

Um cômodo é onde a ação acontece: uma grade de 16×16 tiles pela qual o avatar anda, conversa com sprites, e sai pra outros cômodos.

## Painel de cômodo

- **Name (nome)** — um rótulo interno (mostrado na ferramenta [Find](find.md) e nos menus suspensos de seleção de cômodo), não mostrado aos jogadores.
- **Previous / next (anterior / próximo)** — mova-se entre cômodos existentes.
- **Add room (adicionar cômodo)** — cria um cômodo novo e vazio e muda o editor pra ele.
- **Duplicate (duplicar)** — copia o layout de tiles, paleta e saídas do cômodo atual pra um cômodo novo. Sprites colocados, itens, e o avatar *não* são copiados — você vai precisar colocá-los manualmente na duplicata.
- **Delete (deletar)** — remove o cômodo atual, com um prompt de confirmação (isso não pode ser desfeito).
- **Find (buscar)** — pule pra ferramenta [Find](find.md), já pré-filtrada pra cômodos.
- **Alternância de edição/configurações** — alterna o painel entre a visualização de edição de colocação de tiles e a visualização de configurações do cômodo (paleta, avatar e música, descritas abaixo).

## Configurações do cômodo

Trocar pra visualização de configurações te dá três grupos:

- **Edit (editar)** — coloque tiles, sprites, itens e saídas na grade.
- **Colors (cores)** — qual [paleta](color.md) esse cômodo usa.
- **Avatar** — sobrescreva o desenho de avatar padrão só pra esse cômodo, se você quiser uma aparência diferente enquanto o jogador está aqui.

### Music (Música) (Bitsy Tuxedo)

O menu suspenso de música do cômodo (ícone: nota musical) agora lista três tipos de opções juntas: **off**, qualquer [tune](music.md#tune) que você tenha composto, ou qualquer arquivo que você tenha importado na [aba Audio da ferramenta Music](music.md#audio-bitsy-tuxedo). Escolher um arquivo de áudio importado faz ele tocar em loop como a música de fundo daquele cômodo durante o jogo — veja a página de Music pra a ressalva importante de que áudio importado só toca na pré-visualização de Play dentro do editor e **não** é incluído quando você exporta o jogo.
