# Inventory

*Unchanged from stock Bitsy.*

The inventory tool tracks the two kinds of state your game can carry across dialog checks: **items** and **variables**.

## Items

Items are created in the [Paint](paint.md) tool and show up here automatically. During play, walking into an item increases its count by 1. That count is exactly what dialog conditions, exit locks, and endings check against — e.g. "the door only opens once the player has picked up the key."

Item counts always reset to their starting value (default `0`, but you can set a different default per item) the moment play mode ends.

## Variables

Variables hold anything you want to track that isn't an item count — a flag, a number, a piece of text, a counter that only goes up in dialog, etc. Create as many as you like, and give each a name.

Avoid spaces in variable names (`var1`, not `var 1`) — spaces make the name harder to reference correctly from dialog script.

Variables (and items) can be read or modified from dialog either through the visual dialog editor's item/variable actions, or directly in the dialog code view.

## Panel

- **Items / Variables tabs** — switch which list you're viewing.
- **Item list** — every item created so far, with its default starting count.
- **Variable list** — name/value pairs, with buttons to add a new variable or delete an existing one.
