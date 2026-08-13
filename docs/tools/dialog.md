# Dialog

*Unchanged from stock Bitsy — Bitsy Tuxedo doesn't modify dialog behavior, only some editor-string localization under the hood.*

The dialog tool is where you write everything a sprite, item, exit, or ending says, plus the game's default title-screen text. Dialogs range from a single line of text to branching, conditional conversations.

## Dialog panel

- **Name field** — an internal label for this dialog (not shown to players), useful for finding it again later.
- **Previous / next** — step through every dialog in the game.
- **New / duplicate / delete** — create a fresh dialog, copy the current one, or remove it (with confirmation).
- **Find** — jump into the [Find](find.md) tool, pre-filtered to dialogs.
- **Text editor** — the actual writing surface. You can split a dialog into multiple sections (reorderable, deletable) — sections are commonly used for branching logic.
- **Code view toggle** — switch between the friendly text editor and the raw dialog script, for anything the visual editor doesn't expose a button for.
- Editing a sprite/item's dialog keeps its paint-tool drawing preview in sync automatically, so you can see what you're writing dialog for.

## Text effects

Selecting text and applying an effect wraps it in a tag pair that the engine renders specially:

| Effect | Tag |
|---|---|
| Wavy | `{wvy}...{/wvy}` |
| Shaky | `{shk}...{/shk}` |
| Rainbow | `{rbw}...{/rbw}` |
| Recolor | `{clr N}...{/clr}` where `N` is a palette color index (e.g. `{clr 0}` for the background color) |

## Embedding drawings in text

You can drop a live rendering of any drawing into the middle of a dialog line:

- `{drws "name or id"}` — a sprite or the avatar
- `{drwt "name or id"}` — a tile
- `{drwi "name or id"}` — an item

Either the drawing's internal name or its numeric id works.

## Beyond text

Dialog script also covers conditional logic, and actions that change rooms, play sounds, or modify items/variables — these are written directly in the code view. See [Advanced Topics: Scripting](../advancedTopics/scripting.md) for pointers, and [FAQ: locked door](../faq/lockedDoor.md) for a worked example that combines a condition with an exit lock.
