# Exits & Endings

*Unchanged from stock Bitsy.*

Exits and endings are how the player moves between rooms, and how a game concludes.

## Types

- **Exit** — a two-way connection: standing on it in either room sends the avatar to the paired location. Exits can link two different rooms, or two spots in the same room.
- **One-way exit** — behaves like an exit, but only functions from one of its two ends; walking onto the "destination" side does nothing.
- **Ending** — a location that ends the game when the avatar reaches it. Endings have no transition effect and go nowhere — but you can still gate one with a lock (see below), which sends the avatar back to where they came from if the condition isn't met.

## Panel

- **Previous / next / new / duplicate / delete** — the usual navigation and management controls.
- **Location markers** — thumbnail previews showing exactly where the entrance and (for exits) exit points sit in their rooms. You can drag these directly on the room view, or type exact grid coordinates.
- **Transition effect** — fade or slide, played when the avatar passes through. Background music pauses for the duration of the transition.
- **Dialog** — attach a line (or full dialog) that plays when the exit is used, e.g. a narrator line.
- **Lock** — clicking **+ add lock** attaches a small dialog-script template that gates the exit behind a condition (typically "does the player have item X"). See [FAQ: how to make a locked door](../faq/lockedDoor.md) for a full walkthrough. Under the hood, a lock is just a room-action dialog attached to the exit — nothing exit-specific about the scripting, so you can customize the generated condition however you like.
