# How to make a locked door

*Unchanged mechanic from stock Bitsy.*

There are many variations on a locked door; this walks through the basic version — using a picked-up item (e.g. a key or membership card) to unlock passage past a guard or gate.

1. **Place your pieces.** Put the "locked door" object (a sprite, like a guard, or a tile) and the key item in the room.
2. **Create the exits.** In [Exits & Endings](../tools/exitsandendings.md), add an entry point before the locked door and an exit point after it, so the player has to pass through the gated spot.
3. **Add the lock.** With the "before" exit selected, click **+ add lock** — this generates a starter dialog script that checks a condition before letting the exit fire.
4. **Write the two outcomes.** In the dialog editor, fill in what happens if the player *has* the key (let them through) and what happens if they *don't* (keep them in place, maybe with a line of dialog explaining why). Set which item is the key and how many are required.
5. **Optional: consume the key.** If you want the key used up (Zelda-style), add an item action in the "has the key" branch that decrements the item count by 1.

The same pattern — gate an exit or ending behind an item/variable check — works for any condition, not just "has an item": a variable flag from an earlier conversation, a minimum number of a different item, etc.
