# Importing images and audio (Bitsy Tuxedo)

*New in Bitsy Tuxedo — stock Bitsy has no import feature for either.*

## Images

- Import a local image into a **new** tile, sprite, or item from the [Paint](../tools/paint.md) tool's **import** button. It always creates a new drawing rather than overwriting whatever's currently open.
- The image is squashed to fit the drawing's square pixel grid — no cropping — so square, low-resolution source images give the most predictable result.
- Colors are matched against the room's current palette; new colors get added automatically, up to the 64-color palette cap. Past that cap, you'll be asked whether to map extras to the nearest existing color instead.
- You only get one still frame per import — build animation frames by hand afterward if you need them.

## Audio

- Import mp3/wav/ogg/flac/aac/m4a files from the [Music tool's Audio tab](../tools/music.md#audio-bitsy-tuxedo), and assign one to a room as background music from the [Room](../tools/room.md) tool.
- **This is a preview-only feature.** Imported audio plays when you press Play inside the editor, but it is *not* bundled into the exported game file and *not* saved into your game's data — export/upload the game and that room will be silent. If you need music that actually ships, compose it with the [Tune](../tools/music.md#tune) tool instead.
- Imported files live in your browser's local storage, not your game's save data — they won't travel with the project if you move to a different browser or computer.

## Why not just always overwrite / always export?

These are deliberate trade-offs of the current implementation, not settings you can flip — noting them here so they don't surprise you mid-project rather than after you've built a room around them.
