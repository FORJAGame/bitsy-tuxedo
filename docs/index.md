# Bitsy Tuxedo Docs

Bitsy is a little editor for making games, worlds, or stories where you walk around, talk to people, and be somewhere.

**Bitsy Tuxedo** is a fork of [Bitsy Color](https://github.com/le-doux/bitsy) with a set of editor-quality-of-life features layered on top. If you already know Bitsy or Bitsy Color, everything you know still applies — Tuxedo doesn't change the game format, the engine, or how exported games run. It changes the *editor*: how you draw, pick colors, import assets, and manage sound.

These docs assume you have the Tuxedo editor open (`editor/index.html`) in a browser.

## What's actually different from stock Bitsy

If you're coming from regular Bitsy / Bitsy Color, here's the complete list of behavior changes. Everything not listed here works exactly like upstream Bitsy.

| Area | What changed | Docs |
|---|---|---|
| Paint tool | Brush / Eraser / Fill (bucket) / Color Picker (eyedropper) as explicit tools, plus Undo (`Ctrl+Z`) / Redo (`Ctrl+Y`) | [Paint](tools/paint.md) |
| Paint tool | Import a local image file directly into a tile/sprite/item drawing | [Paint](tools/paint.md), [Importing Assets](faq/importingAssets.md) |
| Colors tool | Palettes can now have a "+" / "−" button to add or remove colors (3–64 colors), instead of add-only | [Colors](tools/color.md) |
| Music tool | Tune and Blip are now tabs inside one combined **Music** panel, plus a new **Audio** tab to import external audio files (mp3/wav/ogg/flac/aac/m4a) as room music | [Music](tools/music.md) |
| Theme tool | New panel: dark mode toggle + custom editing/playing tint colors, remembered per-browser | [Theme](tools/theme.md) |
| Language | Brazilian Portuguese (`pt-BR`) translation added, distinct from the existing European Portuguese (`pt`) | [Game](tools/game.md) |

Everything else — Dialog, Room, Exits & Endings, Inventory, Find, Record GIF, the game/save/export flow, and the underlying [System API](system.md) — is unmodified engine behavior.

## Sections

- [Introduction](introduction/overview.md) — editor layout, first steps
- **Tools** — one page per editor panel: [Paint](tools/paint.md), [Colors](tools/color.md), [Dialog](tools/dialog.md), [Exits & Endings](tools/exitsandendings.md), [Find](tools/find.md), [Game](tools/game.md), [Inventory](tools/inventory.md), [Music](tools/music.md), [Room](tools/room.md), [Theme](tools/theme.md), [Record GIF](tools/recordgif.md)
- [Advanced Topics](advancedTopics/scripting.md) — hacks & scripting
- **FAQ** — [Locked door](faq/lockedDoor.md), [Uploading to itch.io](faq/uploadToItch.md), [Importing assets](faq/importingAssets.md)
- [Glossary](glossary.md)
- [System API](system.md) — low-level engine reference (unchanged from upstream)
- [Credits](credits.md)

## Developers

- Beatriz Loyola ([@beatrizloyola](https://github.com/beatrizloyola))
- Pedro Bedor ([@pedrovcb](https://github.com/pedrovcb))
- Jiji (Emotional Support Cat)

Found a bug or have a suggestion? Open an issue on the repo.
