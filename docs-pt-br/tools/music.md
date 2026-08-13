# Music (Música)

> **Mudança do Bitsy Tuxedo:** o Bitsy original tem dois botões separados na barra de ferramentas, "tune" e "blip". O Tuxedo mescla os dois num único painel **Music** com abas, e adiciona uma terceira aba, **audio**, pra importar seus próprios arquivos de som. Agora tem um único botão "music" na barra de ferramentas; os botões individuais de tune/blip ficam escondidos.

Abra Music e alterne entre suas três abas:

## Tune

Componha música de fundo em loop pra um cômodo, ou um jingle disparado a partir do diálogo.

- **Identificação / navegação de tune** — nomeie uma tune, avance entre as existentes.
- **New / duplicate / delete (novo / duplicar / deletar)** — os controles usuais de gerenciamento.
- **Bars (compassos)** — melodia e harmonia têm cada uma sua própria faixa, até 16 compassos.
- **Piano roll** — clique numa célula vazia pra adicionar uma nota, clique e arraste pra deixá-la mais longa. Quatro oitavas estão disponíveis por nota.
- **Playback (reprodução)** — tocar/parar, com loop por compasso enquanto você compõe.
- **Lista de compassos** — reordene, adicione, duplique ou delete compassos.
- **Menu Compose (compor)** — escolha se uma nota toca um tom simples ou um efeito sonoro [blip](#blip), e escolha um padrão de arpejo de harmonia (dedilhados de acorde ascendentes/descendentes, intervalos, etc.).
- **Menu Instrument (instrumento)** — escolha um tom de onda pulso (P2/P4/P8) independentemente pra melodia e harmonia.
- **Menu Style (estilo)** — tempo (4 presets, 60–160 bpm), clima (maior/menor, que transpõe as notas automaticamente) e tom (de uma escala pentatônica simples até cromática completa).

Uma tune é atribuída a um cômodo como música de fundo através do menu suspenso de música da ferramenta [Room](room.md).

## Blip

Efeitos sonoros curtos — coleta de itens, "cumprimentos" de sprites, blips de interface, ou notas dentro de uma tune.

- **Name / navigate / new / duplicate / delete / find (nome / navegar / novo / duplicar / deletar / buscar)** — controles de gerenciamento padrão.
- **Pré-visualização de forma de onda** — um gráfico da frequência e volume do blip ao longo do tempo; clique nele pra ouvir o som.
- **Botão Play** — ouça o blip atual.
- **Blip-o-matic** — um menu suspenso de 8 geradores de ponto de partida (pick up, greeting, bloop, bleep, magic, meow, random, mutate-from-current), além de um botão de regenerar pra sortear uma nova variação aleatória a partir do gerador escolhido.
- **Pitch / duration / speed (tom / duração / velocidade)** — ajuste fino do som gerado manualmente.

## Audio (Bitsy Tuxedo)

Importe seus próprios arquivos de áudio — mp3, wav, ogg, flac, aac, ou m4a — e use-os como música de fundo de um cômodo, em vez de compor uma chiptune.

- Clique em **import audio**, e escolha um ou mais arquivos de uma vez.
- Cada arquivo importado ganha uma linha: um nome de exibição editável, uma pré-visualização de tocar/parar, e um botão de deletar.
- Atribua um arquivo importado a um cômodo através do menu suspenso de música da ferramenta [Room](room.md) — ele aparece na mesma lista que suas tunes compostas, junto com uma opção "off".

### Limitação importante: só pré-visualização, não exportado

**Áudio importado só toca dentro do próprio botão de Play-test do editor.** Ele fica armazenado no seu navegador (não dentro dos dados de salvamento/exportação do jogo), e o HTML do jogo exportado/baixado não inclui o código de reprodução de áudio nem os arquivos de áudio de forma alguma. Isso significa que:

- Se você exportar seu jogo e abrir ele de forma independente (dando duplo clique no HTML, ou hospedando no itch.io), qualquer cômodo usando áudio importado como sua "música" vai ficar **silencioso** — a configuração de música do cômodo silenciosamente não faz nada pro áudio importado fora do editor.
- Áudio importado e atribuições de música de cômodo ficam no armazenamento local do seu navegador. Limpar dados do site, usar um navegador diferente, ou abrir seu arquivo de projeto num computador diferente vai perder essas atribuições (o arquivo de jogo subjacente em si nunca é tocado — `room.tune` continua `null` pra um cômodo usando áudio importado, então não há nada a "perder" do ponto de vista do arquivo salvo, mas também não há nada a recuperar).

Se você precisa de música no jogo final de fato lançado, componha ela como uma [Tune](#tune) em vez disso — tunes são incorporadas no formato de música nativo da engine do jogo e são exportadas e tocadas corretamente em todo lugar. Trate a aba Audio como uma forma de pré-visualizar uma ideia de faixa contra seu jogo enquanto você trabalha, não como uma forma de lançar uma.
