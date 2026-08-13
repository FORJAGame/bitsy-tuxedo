# Scripting

*Stub in upstream Bitsy's docs too; expanded slightly here with what's verifiable from the engine source, since Bitsy Tuxedo doesn't change any of it.*

Beyond plain text, dialog can contain a small expression/function language, entered through the Dialog tool's code view. A few examples straight from the engine (`editor/script/dialog_editor.js`, `editor/script/engine/script.js`):

```
{item "0"} + 1
```
reads how many of item `0` the player is holding, as part of a larger expression.

```
a = 5
a = a + 1
```
assigns and updates a variable named `a` — the same variables you see listed in the [Inventory](../tools/inventory.md) tool's Variables tab.

Function-style nodes (like `{br}` for a line break) are the building blocks the visual dialog editor's buttons generate for you — the code view just lets you write or tweak them directly instead of clicking through menus.

This page intentionally stays conservative rather than guessing at syntax we haven't verified. For the full function list, the most reliable reference is the engine source itself: `editor/script/engine/script.js` (the interpreter) and `editor/script/dialog_editor.js` (which lists every function the visual editor exposes, in `functionDescriptionMap`).

See also: [System API](../system.md) for the lower-level host/engine interface.
