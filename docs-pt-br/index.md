# Docs do Bitsy Tuxedo

Bitsy é um pequeno editor pra criar jogos, mundos ou histórias onde você anda por aí, conversa com pessoas e está em algum lugar.

**Bitsy Tuxedo** é um fork do [Bitsy Color](https://github.com/le-doux/bitsy) com um conjunto de melhorias de qualidade de vida no editor por cima. Se você já conhece o Bitsy ou o Bitsy Color, tudo que você já sabe continua valendo — o Tuxedo não muda o formato do jogo, a engine, ou como os jogos exportados rodam. Ele muda o *editor*: como você desenha, escolhe cores, importa assets e gerencia som.

Esses docs assumem que você tem o editor Tuxedo aberto (`editor/index.html`) num navegador.

## O que realmente é diferente do Bitsy original

Se você vem do Bitsy / Bitsy Color normal, aqui está a lista completa das mudanças de comportamento. Tudo que não está listado aqui funciona exatamente como no Bitsy original.

| Área | O que mudou | Docs |
|---|---|---|
| Ferramenta Paint | Pincel / Borracha / Preencher (balde) / Conta-gotas como ferramentas explícitas, além de Desfazer (`Ctrl+Z`) / Refazer (`Ctrl+Y`) | [Paint](tools/paint.md) |
| Ferramenta Paint | Importe um arquivo de imagem local direto pra um desenho de tile/sprite/item | [Paint](tools/paint.md), [Importando Assets](faq/importingAssets.md) |
| Ferramenta Colors | Paletas agora podem ter um botão "+" / "−" pra adicionar ou remover cores (3–64 cores), em vez de só adicionar | [Colors](tools/color.md) |
| Ferramenta Music | Tune e Blip agora são abas dentro de um painel combinado **Music**, além de uma nova aba **Audio** pra importar arquivos de áudio externos (mp3/wav/ogg/flac/aac/m4a) como música de sala | [Music](tools/music.md) |
| Ferramenta Theme | Painel novo: alternância de modo escuro + cores de destaque customizadas pra edição/jogo, lembradas por navegador | [Theme](tools/theme.md) |
| Idioma | Tradução de Português Brasileiro (`pt-BR`) adicionada, distinta da tradução já existente de Português Europeu (`pt`) | [Game](tools/game.md) |

Tudo mais — Dialog, Room, Exits & Endings, Inventory, Find, Record GIF, o fluxo de jogo/salvamento/exportação, e a [System API](system.md) subjacente — é comportamento de engine inalterado.

## Seções

- [Introduction](introduction/overview.md) — layout do editor, primeiros passos
- **Tools** — uma página por painel do editor: [Paint](tools/paint.md), [Colors](tools/color.md), [Dialog](tools/dialog.md), [Exits & Endings](tools/exitsandendings.md), [Find](tools/find.md), [Game](tools/game.md), [Inventory](tools/inventory.md), [Music](tools/music.md), [Room](tools/room.md), [Theme](tools/theme.md), [Record GIF](tools/recordgif.md)
- [Advanced Topics](advancedTopics/scripting.md) — hacks e scripting
- **FAQ** — [Porta trancada](faq/lockedDoor.md), [Enviando pro itch.io](faq/uploadToItch.md), [Importando assets](faq/importingAssets.md)
- [Glossário](glossary.md)
- [System API](system.md) — referência de baixo nível da engine (inalterada em relação ao original)
- [Créditos](credits.md)

## Desenvolvedores

- Beatriz Loyola ([@beatrizloyola](https://github.com/beatrizloyola))
- Pedro Bedor ([@pedrovcb](https://github.com/pedrovcb))
- Jiji (Suporte Emocional Felino)

Encontrou um bug ou tem uma sugestão? Abra uma issue no repositório.
