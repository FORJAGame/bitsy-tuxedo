# Colors

Every room has a **palette**: a small list of colors that all the artwork in that room draws from. Rooms can share a palette or each use their own.

Every palette has (at minimum) three built-in roles, always at indices 0–2:

1. **Background** — the color behind everything; also the "off" color for tile and sprite drawings.
2. **Tile color** — the foreground color for all tiles.
3. **Sprite color** — the foreground color for the avatar, sprites, and items.

Palettes can hold more than these three colors — see below — but index 0/1/2 always keep their special background/tile/sprite meaning.

## Editing a color

Select which of the three roles (or extra color) you're editing with its button, then either:

- Drag inside the color wheel to set hue and saturation, and use the slider to set lightness/darkness, or
- Type a hex code directly into the text field.

## Palette management

Palettes can be renamed (the name shows up in the [Find](find.md) tool and in room settings), and you can create, duplicate, navigate between, or delete palettes with the panel's controls.

## Adding and removing colors (Bitsy Tuxedo)

A palette isn't locked to exactly three colors:

- **Add color (+)** appends a new (randomly-generated) color slot to the current palette, up to a maximum of **64 colors**. The "+" button disappears once you hit that cap.
- **Remove color (−)** appears only when you have a non-core color selected (index 3 or higher) *and* the palette has more than the three required colors — you can never delete background/tile/sprite. Removing a color is safe to use even if it's already painted somewhere: every tile, sprite, and item in the game is automatically remapped — pixels using the removed color become background, and pixels using any higher-indexed color shift down by one — so nothing ends up pointing at a color that no longer exists.

This is useful for drawings that want more than a simple two-tone look (e.g. a sprite with a highlight color, or a room with a richer background gradient) without having to reuse the tile/sprite roles for everything.
