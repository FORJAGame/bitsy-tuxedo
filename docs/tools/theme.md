# Theme

*New in Bitsy Tuxedo — stock Bitsy has no editor theming.*

The Theme panel controls how the *editor itself* looks. It has no effect on your game, its palettes, or anything you export — it's purely a personal preference, remembered per-browser (`localStorage`), not saved into your game file.

- **Dark mode** — toggles the whole editor UI (panels, buttons, backgrounds) between light and dark. The toggle's label switches to "light mode" once dark mode is on, so you can tell which way it'll flip next.
- **Editing tint** — the accent color used throughout the editor UI while you're in edit mode.
- **Playing tint** — a separate accent color used while you're in play-test mode, so it's visually obvious at a glance whether you're editing or testing.

Both tints work by picking a hue from whatever color you choose and applying it across the UI's existing light/dark accent shades — so you're recoloring the accent, not setting an exact hex value for every element.
