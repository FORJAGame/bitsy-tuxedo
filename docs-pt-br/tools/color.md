# Colors (Cores)

Todo cômodo tem uma **paleta**: uma pequena lista de cores de onde toda a arte daquele cômodo é feita. Cômodos podem compartilhar uma paleta ou cada um usar a sua própria.

Toda paleta tem (no mínimo) três papéis embutidos, sempre nos índices 0–2:

1. **Background (fundo)** — a cor por trás de tudo; também a cor "desligada" pros desenhos de tile e sprite.
2. **Tile color (cor do tile)** — a cor de primeiro plano pra todos os tiles.
3. **Sprite color (cor do sprite)** — a cor de primeiro plano pro avatar, sprites e itens.

Paletas podem ter mais do que essas três cores — veja abaixo — mas os índices 0/1/2 sempre mantêm seu significado especial de fundo/tile/sprite.

## Editando uma cor

Selecione qual dos três papéis (ou cor extra) você está editando com seu botão, e então:

- Arraste dentro da roda de cores pra definir matiz e saturação, e use o slider pra definir claridade/escuridão, ou
- Digite um código hex diretamente no campo de texto.

## Gerenciamento de paletas

Paletas podem ser renomeadas (o nome aparece na ferramenta [Find](find.md) e nas configurações do cômodo), e você pode criar, duplicar, navegar entre, ou deletar paletas com os controles do painel.

## Adicionando e removendo cores (Bitsy Tuxedo)

Uma paleta não fica travada em exatamente três cores:

- **Adicionar cor (+)** adiciona um novo slot de cor (gerada aleatoriamente) à paleta atual, até um máximo de **64 cores**. O botão "+" desaparece quando você atinge esse limite.
- **Remover cor (−)** só aparece quando você tem uma cor não essencial selecionada (índice 3 ou maior) *e* a paleta tem mais do que as três cores obrigatórias — você nunca pode deletar fundo/tile/sprite. Remover uma cor é seguro mesmo que ela já esteja pintada em algum lugar: todo tile, sprite e item do jogo é remapeado automaticamente — pixels usando a cor removida viram fundo, e pixels usando qualquer cor de índice maior descem uma posição — então nada acaba apontando pra uma cor que não existe mais.

Isso é útil pra desenhos que querem mais do que um visual simples de dois tons (por exemplo, um sprite com uma cor de destaque, ou um cômodo com um gradiente de fundo mais rico) sem precisar reaproveitar os papéis de tile/sprite pra tudo.
