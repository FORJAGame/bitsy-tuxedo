# Fazendo upload de um jogo Bitsy Tuxedo pro itch.io

*Inalterado em relação ao Bitsy original — o Tuxedo exporta o mesmo jogo em HTML de arquivo único.*

## Antes de começar, tenha em mãos

- Uma conta no itch.io.
- Seu jogo exportado: através do painel [Game](../tools/game.md), Save > Export, baixado como um arquivo HTML. Se você renomear ele, renomeie pra `index.html` antes de zipar (o itch.io procura especificamente por esse nome de arquivo como ponto de entrada).
- Uma imagem de capa — o preset paisagem (726×576) da ferramenta [Record GIF](../tools/recordgif.md) tem exatamente esse tamanho.
- Uma ou duas capturas de tela da jogabilidade.

## Passos

1. Faça login no itch.io e vá pro seu painel.
2. Crie um novo projeto.
3. Preencha os campos do jogo e faça upload: do arquivo HTML zipado, da imagem de capa e das suas capturas de tela. Jogos Bitsy rodam direto no navegador — marque "This file will be played in the browser" — mas você também pode marcar como disponível pra download se quiser.
4. Ajuste o viewport de embed — 512×512px combina com o tamanho padrão do canvas de jogo do Bitsy na maioria dos projetos (ajuste se você exportou com um tamanho fixo diferente, ou está usando a opção de exportação que preenche a janela).
5. Salve como rascunho e visualize a página. O editor de tema do itch (ou edição de HTML puro, pelo painel do projeto) permite customizar a página ao redor.
6. Quando estiver satisfeito com tudo no painel, mude a visibilidade de rascunho pra público.

Lembrete da página de [Music](../tools/music.md): se algum cômodo usa um arquivo de áudio importado em vez de uma música composta, essa música **não** vai tocar no jogo enviado — só músicas compostas são incluídas na exportação.
