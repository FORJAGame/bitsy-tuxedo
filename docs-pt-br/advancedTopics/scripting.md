# Scripting

*Também é um esboço nos docs originais do Bitsy; expandido um pouco aqui com o que dá pra verificar direto no código-fonte da engine, já que o Bitsy Tuxedo não muda nada disso.*

Além de texto puro, o diálogo pode conter uma pequena linguagem de expressões/funções, digitada através da visualização de código da ferramenta de Diálogo. Alguns exemplos direto da engine (`editor/script/dialog_editor.js`, `editor/script/engine/script.js`):

```
{item "0"} + 1
```
lê quantas unidades do item `0` o jogador está carregando, como parte de uma expressão maior.

```
a = 5
a = a + 1
```
atribui e atualiza uma variável chamada `a` — as mesmas variáveis que aparecem listadas na aba Variáveis da ferramenta [Inventário](../tools/inventory.md).

Nós no estilo de função (como `{br}` pra quebra de linha) são os blocos de construção que os botões do editor visual de diálogo geram pra você — a visualização de código só permite escrever ou ajustar eles diretamente em vez de clicar em menus.

Esta página propositalmente se mantém conservadora em vez de chutar sintaxe que não verificamos. Pra lista completa de funções, a referência mais confiável é o próprio código-fonte da engine: `editor/script/engine/script.js` (o interpretador) e `editor/script/dialog_editor.js` (que lista toda função que o editor visual expõe, em `functionDescriptionMap`).

Veja também: [System API](../system.md) pra interface de host/engine de nível mais baixo.
