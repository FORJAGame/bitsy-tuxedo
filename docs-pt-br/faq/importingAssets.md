# Importando imagens e áudio (Bitsy Tuxedo)

*Novo no Bitsy Tuxedo — o Bitsy original não tem recurso de importação pra nenhum dos dois.*

## Imagens

- Importe uma imagem local pra um tile, sprite ou item **novo** através do botão **import** da ferramenta [Paint](../tools/paint.md). Sempre cria um desenho novo em vez de sobrescrever o que já estiver aberto.
- A imagem é achatada pra caber na grade quadrada de pixels do desenho — sem corte (crop) — então imagens de origem quadradas e de baixa resolução dão o resultado mais previsível.
- As cores são comparadas com a paleta atual do sala; cores novas são adicionadas automaticamente, até o limite de 64 cores da paleta. Depois desse limite, você será perguntado se quer mapear as cores extras pra cor existente mais próxima.
- Você só tem um quadro estático por importação — construa quadros de animação manualmente depois, se precisar.

## Áudio

- Importe arquivos mp3/wav/ogg/flac/aac/m4a da [aba Audio da ferramenta Music](../tools/music.md#audio-bitsy-tuxedo), e atribua um a um sala como música de fundo através da ferramenta [Room](../tools/room.md).
- **Esse é um recurso só de pré-visualização.** O áudio importado toca quando você aperta Play dentro do editor, mas ele *não* é empacotado no arquivo do jogo exportado e *não* é salvo nos dados do seu jogo — exporte/faça upload do jogo e aquele sala vai ficar silencioso. Se você precisa de música que realmente vá pro jogo final, componha ela com a ferramenta [Tune](../tools/music.md#tune) em vez disso.
- Os arquivos importados ficam no armazenamento local do seu navegador, não nos dados salvos do jogo — eles não vão junto com o projeto se você mudar de navegador ou computador.

## Por que não simplesmente sempre sobrescrever / sempre exportar?

Essas são trocas (trade-offs) deliberadas da implementação atual, não configurações que você pode alternar — estamos anotando isso aqui pra que não te surpreenda no meio do projeto em vez de depois que você já construiu um sala em cima delas.
