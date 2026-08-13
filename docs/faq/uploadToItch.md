# Uploading a Bitsy Tuxedo game to itch.io

*Unchanged from stock Bitsy — Tuxedo exports the same single-file HTML game.*

## Before you start, have ready

- An itch.io account.
- Your exported game: from the [Game](../tools/game.md) panel's Save > Export, downloaded as an HTML file. If you rename it, rename it to `index.html` before zipping (itch.io looks for that specific filename as the entry point).
- A cover image — the [Record GIF](../tools/recordgif.md) tool's landscape (726×576) preset is sized exactly for this.
- A screenshot or two of gameplay.

## Steps

1. Sign in to itch.io and go to your dashboard.
2. Create a new project.
3. Fill in the game's fields, and upload: the zipped HTML file, the cover image, and your screenshots. Bitsy games run directly in the browser — check "This file will be played in the browser" — but you can also mark it downloadable if you want.
4. Set the embed's viewport — 512×512px matches the default Bitsy game canvas for most projects (adjust if you exported at a different fixed size, or are using the fill-window export option).
5. Save as draft and preview the page. Itch's theme editor (or raw HTML editing, from the project dashboard) lets you customize the surrounding page.
6. Once you're happy with everything in the dashboard, flip visibility from draft to public.

Reminder from the [Music](../tools/music.md) page: if any room uses an imported audio file rather than a composed tune for its music, that music will **not** play in the uploaded game — only composed tunes are included in the export.
