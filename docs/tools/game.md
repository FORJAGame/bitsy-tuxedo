# Game

*Mostly unchanged from stock Bitsy — the editor-theme controls that used to live under Settings now have their own [Theme](theme.md) panel instead.*

The Game panel is project control central: saving/loading, project-wide settings, and raw data access.

## Save

- **Export** — download your game as a single, self-contained, playable HTML file.
- **Import** — load a previously-exported/saved game file back into the editor to keep working on it.
- **New project** — start over from a blank game.

## Settings

- **Editor preferences** — editor-only conveniences (e.g. grid visibility in the paint tool).
- **Engine settings** — game-wide behavior options.
- **Export/HTML settings** — the exported file's page color and sizing (fixed pixel size vs. fill the browser window).
- **Language** — switch the editor's own UI language. Bitsy Tuxedo adds **Brazilian Portuguese (`pt-BR`)** as its own entry, distinct from the pre-existing European Portuguese (`pt`) translation — pick whichever matches your dialect.
- **Font** — choose/import the font your game's dialog text renders with.

## Data

Shows the game's underlying save data as plain text — the same format you'd get from Export, minus the HTML wrapper. Useful for copy-pasting a project between machines without downloading a file, batch-editing with find-and-replace, or just seeing exactly what a change did under the hood.
