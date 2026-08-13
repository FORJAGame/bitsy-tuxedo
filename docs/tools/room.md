# Room

*Unchanged from stock Bitsy, aside from the music dropdown now also listing imported audio files — see below.*

A room is where the action happens: a 16×16 grid of tiles that the avatar walks around in, talks to sprites in, and exits from into other rooms.

## Room panel

- **Name** — an internal label (shown in the [Find](find.md) tool and room-picker dropdowns), not shown to players.
- **Previous / next** — move between existing rooms.
- **Add room** — creates a new, empty room and switches the editor to it.
- **Duplicate** — copies the current room's tile layout, palette, and exits into a new room. Placed sprites, items, and the avatar are *not* copied — you'll need to place those manually in the duplicate.
- **Delete** — removes the current room, with a confirmation prompt (this can't be undone).
- **Find** — jump into the [Find](find.md) tool, pre-filtered to rooms.
- **Edit / settings switch** — toggles the panel between the tile-placement editing view and the room's settings view (palette, avatar, and music, described below).

## Room settings

Switching to the settings view gives you three groups:

- **Edit** — place tiles, sprites, items, and exits into the grid.
- **Colors** — which [palette](color.md) this room uses.
- **Avatar** — override the default avatar drawing for just this room, if you want a different look while the player is here.

### Music (Bitsy Tuxedo)

The room's music dropdown (icon: note) now lists three kinds of options together: **off**, any [tune](music.md#tune) you've composed, or any file you've imported in the [Music tool's Audio tab](music.md#audio-bitsy-tuxedo). Picking an imported audio file sets it to loop as that room's background music during play — see the Music page for the important caveat that imported audio only plays in the in-editor Play preview and is **not** included when you export the game.
