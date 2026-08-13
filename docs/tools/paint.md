# Paint

The paint tool is where you draw every object in your game — the avatar, sprites, tiles, and items — pixel by pixel, with optional animation frames.

## Drawing basics

Every drawing is a fixed-size square grid (the same size for every drawing in a game). Each cell holds one of three roles depending on the drawing type:

- **Tiles** use the palette's *tile color* as foreground.
- **Avatars, sprites, and items** use the palette's *sprite color* as foreground.
- Empty cells always show the *background color*.

(Foreground/background colors come from the current room's palette — see [Colors](color.md). A drawing can also use any of the palette's additional colors beyond those two, if the palette has more than three.)

## Drawing tools (Bitsy Tuxedo)

> **Behavior change from stock Bitsy:** in upstream Bitsy, clicking a pixel *toggles* it — click a filled pixel to erase it, click an empty one to fill it. Bitsy Tuxedo replaces the single click-to-toggle behavior with four explicit tools, selected from the button row above the canvas:

- **Brush** — click or drag to paint with the currently selected color. This is the default tool.
- **Eraser** — click or drag to clear pixels back to background, regardless of what's under the cursor.
- **Fill (bucket)** — click one pixel to flood-fill every contiguous pixel of the same color with the selected color. Fill does not cross diagonally and stops at any different-colored pixel.
- **Color Picker (eyedropper)** — click a pixel to pick up its color as the new brush color, then automatically switches back to the brush tool. Picking a background (empty) pixel does nothing.

**Undo / Redo** — buttons in the same row, or the keyboard shortcuts **Ctrl+Z** (undo) / **Ctrl+Y** (redo). History is per-drawing: switching to a different drawing clears its undo stack, and history holds the last 50 strokes. (Fill counts as one undo step, no matter how many pixels it changes; a brush/eraser drag also counts as a single step, undone all at once.)

There are no letter-key shortcuts for switching tools (B/E/F) — only Undo/Redo are bound to the keyboard. Switch tools by clicking their buttons.

## Importing an image (Bitsy Tuxedo)

Instead of hand-drawing a pixel grid, you can import a local image file directly into a drawing:

1. Click **import** next to the paint canvas.
2. Choose a local image file (any common format your browser can decode — PNG, JPG, GIF, etc.).
3. Pick which kind of drawing to create: tile, sprite, or item. (This defaults to whatever type you currently have selected in the paint tool.)
4. Click **import**.

Importing always **creates a brand-new tile/sprite/item** — it does not overwrite the drawing you currently have open, even if that drawing is the same type. The new drawing is appended to the end of its list (tile, sprite, or item) and immediately selected so you can see the result.

The image is resized (nearest-neighbor, no smoothing) to the drawing's pixel grid, and every opaque pixel is matched against the room's current palette — exact color matches reuse an existing palette slot, and unmatched colors are appended as new palette colors. Pixels with alpha below 50% become transparent/background.

Palettes cap out at 64 colors. If an import would need more distinct colors than are left, you'll get a confirmation prompt: proceeding maps the extra colors to their nearest existing palette match instead of adding them (some color fidelity loss, but the import still completes); canceling aborts the import so you can simplify the image first.

The imported result is always a single still frame, never animated — if you want an animated drawing, import it as your first frame and then add animation frames by hand afterward.

There's no cropping or aspect-ratio handling: the whole image is squashed/stretched to fit the drawing's square pixel grid. For predictable results, start from a source image that's already square (or close to it) and low-resolution.
