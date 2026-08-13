# Music

> **Bitsy Tuxedo change:** stock Bitsy has two separate toolbar toggles, "tune" and "blip". Tuxedo merges both into one **Music** panel with tabs, and adds a third tab, **audio**, for importing your own sound files. There's a single "music" toggle in the toolbar now; the individual tune/blip toggles are hidden.

Open Music and switch between its three tabs:

## Tune

Compose looping background music for a room, or a jingle triggered from dialog.

- **Tune identification / navigation** — name a tune, step between existing ones.
- **New / duplicate / delete** — the usual management controls.
- **Bars** — melody and harmony each get their own track, up to 16 bars.
- **Piano roll** — click an empty cell to add a note, click-and-drag to make it longer. Four octaves are available per note.
- **Playback** — play/stop, with per-bar looping while you compose.
- **Bar list** — reorder, add, duplicate, or delete bars.
- **Compose menu** — choose whether a note plays a plain tone or a [blip](#blip) sound effect, and pick a harmony arpeggiation pattern (ascending/descending chord strums, intervals, etc.).
- **Instrument menu** — pick a pulse-wave tone (P2/P4/P8) independently for melody and harmony.
- **Style menu** — tempo (4 presets, 60–160 bpm), mood (major/minor, which auto-transposes notes), and key (from a simple pentatonic scale up to full chromatic).

A tune is assigned to a room as background music from the [Room](room.md) tool's music dropdown.

## Blip

Short sound effects — item pickups, sprite "greetings," UI blips, or notes inside a tune.

- **Name / navigate / new / duplicate / delete / find** — standard management controls.
- **Waveform preview** — a graph of the blip's frequency and volume over time; click it to audition the sound.
- **Play button** — audition the current blip.
- **Blip-o-matic** — a dropdown of 8 starting-point generators (pick up, greeting, bloop, bleep, magic, meow, random, mutate-from-current), plus a regenerate button to roll a new random variation from the chosen generator.
- **Pitch / duration / speed** — fine-tune the generated sound by hand.

## Audio (Bitsy Tuxedo)

Import your own audio files — mp3, wav, ogg, flac, aac, or m4a — and use them as a room's background music, instead of composing a chiptune.

- Click **import audio**, and pick one or more files at once.
- Each imported file gets a row: an editable display name, a play/stop preview, and a delete button.
- Assign an imported file to a room from the [Room](room.md) tool's music dropdown — it appears in the same list as your composed tunes, alongside an "off" option.

### Important limitation: preview-only, not exported

**Imported audio only plays inside the editor's own Play-test button.** It is stored in your browser (not inside the game's save/export data), and the exported/downloaded game HTML does not include the audio-playback code or the audio files at all. This means:

- If you export your game and open it standalone (double-click the HTML, or host it on itch.io), any room using imported audio as its "music" will be **silent** — the room-music setting quietly does nothing for imported audio outside the editor.
- Imported audio and room-music assignments live in your browser's local storage. Clearing site data, using a different browser, or opening your project file on a different computer will lose these assignments (the underlying game file itself is never touched — `room.tune` stays `null` for a room using imported audio, so there's nothing to "lose" from the save file's point of view, but there's also nothing to recover).

If you need music in the actual shipped game, compose it as a [Tune](#tune) instead — tunes are baked into the game's engine-native music format and do get exported and played correctly everywhere. Treat the Audio tab as a way to preview a track idea against your game while you work, not as a way to ship one.
