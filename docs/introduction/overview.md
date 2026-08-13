# Overview

Bitsy presents its tools as a set of panels ("cards") in a workspace, with a toolbar along the top to show or hide each one. Games are made of interconnected **rooms** — fixed 16×16 grids of tiles — that your **avatar** walks around in, talking to **sprites**, picking up **items**, and passing through **exits** to other rooms.

You can test your game at any time and hand off the result as a single, self-contained HTML file that runs in any browser — no server or install required.

## Interface

- **Game title** — the text field at the top; this is what's displayed on the game's title/start screen.
- **Tools button** — shows or hides the whole toolbar.
- **Play button** — switches into play mode to test the game as a player would experience it. Press it again to go back to editing. Playing does **not** modify your game data — any dialog variables/items reset the moment you leave play mode.
- **Toolbar** — one toggle per tool. A toggle turns dark blue when its panel is open. Toggling it off just hides the panel; it doesn't discard anything.
- **Workspace** — where open panels live. Drag a panel by its title bar to reposition it, or click its close (✕) button to hide it — same as toggling it off in the toolbar.

### Toolbar, Bitsy Tuxedo edition

Stock Bitsy's toolbar has one toggle per tool (paint, colors, dialog, room, tune, blip, exits, inventory, find, game, settings). Tuxedo's toolbar differs in two ways:

1. **Tune and Blip are merged** into a single **Music** toggle. Opening it gives you three tabs — tune, blip, and the new audio importer — instead of two separate panels. See [Music](../tools/music.md).
2. **A new Theme toggle** opens a small panel for dark mode and custom accent-color tinting. This is purely a personal editor preference (stored in your browser) and has no effect on the exported game. See [Theme](../tools/theme.md).

Inside the Paint panel specifically, Tuxedo also adds an explicit row of drawing-tool buttons (brush / eraser / fill / color picker / undo / redo) and an "import" button for bringing in outside images — both covered in [Paint](../tools/paint.md).

## Core vocabulary

- **Avatar** — the object the player controls. Every game has exactly one avatar drawing, though a room can swap in a different sprite as the "player" if you want.
- **Sprite** — an object the avatar can walk into to trigger dialog. Each sprite placed in the world is a distinct instance, even if two sprites share the same drawing.
- **Tile** — non-interactive scenery. Tiles can optionally be marked as a "wall," which blocks the avatar from walking onto them.
- **Item** — a collectible; walking into one adds it to the inventory and can trigger dialog.
- **Exit** — a doorway between two points, possibly in different rooms (see [Exits & Endings](../tools/exitsandendings.md)).

See the [Glossary](../glossary.md) for the short-form definitions.
