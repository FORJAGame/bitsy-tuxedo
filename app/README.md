# Bitsy Tuxedo App

Versão offline do editor, em Electron. Abre na mesma versão do site, funciona
sem internet e recebe o conteúdo do editor por OTA quando o site é publicado de
novo.

## Como funciona

```
app/
  src/main.js       janela, protocolo bitsy://app/, ciclo de vida, OTA
  src/bundle.js     bundles de conteúdo: seed, verificação, download, ativação
  src/preload.js    popup de update (shadow DOM) + ponte IPC
  src/config.js     configuração (URL do manifesto, intervalos)
  scripts/prepare-seed.js   monta app/seed/ a partir de editor/
  scripts/make-icon.js      gera build/icon.png (512x512)
  seed/             cópia do site embutida no pacote (gerada, não versionada)
```

### Conteúdo servido por `bitsy://app/`

O app não abre `file://`: registra um protocolo próprio (`standard` + `secure`)
e serve o bundle ativo. A origin fica sempre `bitsy://app`, então o
`localStorage` do editor, onde ficam os jogos salvos, tema e idioma, sobrevive
a qualquer atualização. Com `file://` cada versão teria outro caminho e o
trabalho do usuário se perderia.

Bundles possíveis, em ordem de preferência:

1. `bundles/<id>` em `userData` (conteúdo baixado via OTA)
2. `resources/seed` (embutido no pacote; também o fallback se o bundle baixado
   estiver corrompido ou incompleto)

### OTA de conteúdo

O deploy do site gera `ota-manifest.json` (`dev/ota_manifest.js`) e o publica
junto com o site. O manifesto tem a versão do engine, um id de conteúdo
(sha256 de todos os arquivos) e o sha256/tamanho de cada arquivo.

1. Depois que o editor carrega, o app busca o manifesto (`net.fetch`, timeout de
   8s, cache desligado). Qualquer erro é ignorado: offline o app só abre normal.
2. Se o `id` remoto for diferente do local e o manifesto remoto for mais novo
   (`createdAt`), aparece o popup no canto inferior direito.
3. Ao aceitar, o app baixa **apenas os arquivos com sha256 diferente**; os
   demais são copiados do bundle atual. Cada arquivo é validado por sha256 e
   tamanho (2 tentativas).
4. O bundle é montado num diretório de staging e publicado com `rename`
   atômico; o manifesto é gravado por último, como marcador de "bundle
   completo".
5. A janela recarrega e passa a servir a versão nova, mesma origin, mesmo
   `localStorage`.
6. Bundles antigos são removidos na abertura seguinte.

Um manifesto com hash que não bate (deploy pela metade, CDN com cache velho,
arquivo adulterado) aborta a instalação sem afetar o bundle em uso.

### OTA do binário

`electron-updater` (provider GitHub), ativo apenas com `app.isPackaged`. Quando
o download termina, o mesmo popup oferece "Reiniciar agora". No Linux o
electron-updater só atualiza AppImage, nas demais distribuições o aviso é
ignorado e o app continua funcionando.

O `publish.releaseType` precisa continuar `"release"`: o electron-updater ignora
releases em rascunho, e o botão de download do site também (a URL
`/releases/latest/` não enxerga rascunho).

Limitações conhecidas:

- **macOS**: o auto-update do binário exige assinatura de código
  (Squirrel.Mac). Sem certificado, o Mac recebe só o OTA de conteúdo, mas
  o conteúdo do editor continua atualizando normalmente.
- **Windows**: build sem assinatura mostra o aviso do SmartScreen no primeiro
  uso; o auto-update funciona.

## Botão de download no site

`editor/script/download_app.js` mostra o botão "baixar app" na barra superior
**somente no site publicado em https**, dentro do app a página é servida por
`bitsy://`, então o botão nunca aparece lá, e em desenvolvimento local (http)
também não. O sistema do visitante é detectado pelo user agent: celulares,
tablets e Chromebooks não recebem o botão.

O botão aponta para `releases/latest/download/<arquivo>`, com os nomes fixos
definidos em `artifactName` no `package.json`:

| sistema | arquivo | `artifactName` |
| --- | --- | --- |
| Windows | `Bitsy-Tuxedo-Setup.exe` | `Bitsy-Tuxedo-Setup.${ext}` |
| macOS | `Bitsy-Tuxedo-mac.dmg` | `Bitsy-Tuxedo-mac.${ext}` |
| Linux | `Bitsy-Tuxedo.AppImage` | `Bitsy-Tuxedo.${ext}` |

Ao renomear um artefato, atualize os três lugares: `package.json`,
`download_app.js` e esta tabela. Enquanto não existir uma release `v*`
publicada, os links dão 404.

O rótulo é traduzido pela planilha do editor: a linha `download_app` em
`dev/resources/localization.tsv` (en/pt/es) vira o texto do botão depois de
rodar `node dev/resource_packager`.

## Desenvolvimento

```bash
cd app
npm install
npm run prepare-seed   # monta app/seed/ (copia editor/ + manifesto + ícone)
npm start
```

Variáveis de ambiente úteis (permitem testar o OTA sem publicar nada):

| variável | efeito |
| --- | --- |
| `BITSY_OTA_URL` | URL do manifesto (padrão: `https://tuxedo.forjagame.com/ota-manifest.json`) |
| `BITSY_OTA_INTERVAL_MS` | intervalo entre verificações (padrão: 1h) |
| `BITSY_OTA_FIRST_DELAY_MS` | atraso da primeira verificação (padrão: 4s) |
| `BITSY_SHELL_UPDATES=0` | desliga o update do binário |
| `BITSY_DEVTOOLS=1` | abre o DevTools |

Teste de OTA local:

```bash
# 1. publique uma cópia do site com manifesto novo
cp -r editor /tmp/ota-site
# edite algo em /tmp/ota-site e gere um manifesto mais recente
OTA_CREATED_AT="$(date -u -d '+1 hour' +%Y-%m-%dT%H:%M:%SZ)" \
  node dev/ota_manifest.js /tmp/ota-site
python3 -m http.server 8123 --directory /tmp/ota-site

# 2. abra o app apontando para ele
cd app && BITSY_OTA_URL=http://127.0.0.1:8123/ota-manifest.json npm start
```

## Build

```bash
cd app
npm run dist     # empacota para o SO atual, sem publicar
npm run release  # empacota e publica no GitHub (precisa de GH_TOKEN)
```

O workflow `.github/workflows/app-release.yml` publica nas três plataformas
quando uma tag `v*` é enviada. A tag deve ser igual à `version` do
`app/package.json`.
