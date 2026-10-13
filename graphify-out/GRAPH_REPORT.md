# Graph Report - bitsy-tuxedo  (2026-10-13)

## Corpus Check
- 6 files · ~1,156,801 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1428 nodes · 2568 edges · 96 communities (75 shown, 21 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 88 edges (avg confidence: 0.85)
- Token cost: 46,607 input · 0 output

## Community Hubs (Navigation)
- Editor UI Core
- Engine Core (bitsy.js)
- Classic Engine Build
- Engine Bootstrap System
- Paint Tool
- Project Credits & Fork Lineage
- Dialog Script Functions
- World Data Model
- Build & Icon Tooling
- Sound Pitch Utilities
- GIF Export
- Tune/Music Editor
- PT-BR Color & Find Docs
- Dialog Engine
- Asset Creation (Drawing/Item/Sprite)
- Input System
- Thumbnail Rendering
- Core Utilities
- Color Picker
- Dialog Tool Widgets
- Palette Tool
- FAQ & Glossary Docs
- Animation & Export
- Room Marker Tool
- Graphics System
- Dialog Management
- Drawing Edit UI
- Import & Localization Settings
- Localization System
- Tint & Input Hacks
- Code Block Parsing
- Dialog Comparison Editor
- Tile Renderer
- Dialog Editor Blocks
- Dialog Plaintext Widget
- Language & Browser Detection
- UI Menu Elements
- Color Role System
- Font Rendering & Arabic Support
- Exit/Ending Creation
- Font Manager
- Card Navigation
- Panel Preferences
- Dialog Expression Evaluation
- Exit Marker Dragging
- Find Tool
- Room Marker Dragging
- Music Audio Tab
- Dialog Code View & Locks
- Font Color Functions
- Event Listener System
- Inventory UI
- Room Marker Base
- Blip Tile Tool
- Room Tool
- Expression Input Builders
- Marker Position Helpers
- CI/Publish Config
- Dialog & Find Tool Docs
- Export/Import & Engine Docs
- Dialog Action Builder
- Dialog Block Editor
- Image Importer
- Sound Chip Synthesis
- Audio Import & Music Docs
- Dialog Child Editors
- Dialog Sequence Parsing
- Game Exporter
- Mouse Interface
- Game Export Download
- Icon Utilities
- Theme & Localization Panels
- Expression Operator Editor
- Dialog Condition Nodes
- Marker Placement
- Scripting Docs & Dialog Tool
- Cat Mascot Icon Variants
- Panel Drag Helpers
- Room Transition Effects
- Classic Editor Bootstrap
- Contributors Credits
- Fork Lineage Docs
- itch.io Cover Art
- Timer Utility
- Paint Canvas Drawing
- Inventory Item Removal
- Changelog
- Down Arrow Icon
- Tuxedo Cat Sprite
- Generated Resources

## God Nodes (most connected - your core abstractions)
1. `Script()` - 79 edges
2. `RoomMarkerTool()` - 44 edges
3. `PaintTool()` - 40 edges
4. `BitsySystem()` - 36 edges
5. `DialogTool()` - 34 edges
6. `gif()` - 29 edges
7. `refreshGameData()` - 27 edges
8. `makeTuneTool()` - 26 edges
9. `InputSystem()` - 24 edges
10. `SoundPlayer()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `Room Tool (pt-BR)` --semantically_similar_to--> `Overview`  [INFERRED] [semantically similar]
  docs-pt-br/tools/room.md → docs/introduction/overview.md
- `Inventory Tool (pt-BR)` --semantically_similar_to--> `Glossary`  [INFERRED] [semantically similar]
  docs-pt-br/tools/inventory.md → docs/glossary.md
- `Paint Script (paint.js)` --implements--> `Paint Tool`  [INFERRED]
  editor/index.html → docs/tools/paint.md
- `Palette Script (palette.js)` --implements--> `Palette`  [INFERRED]
  editor/index.html → docs/tools/color.md
- `Font Rendering Module (font.js)` --shares_data_with--> `Game Panel`  [INFERRED]
  editor/index.html → docs/tools/game.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Custom Font-to-Bitsyfont Conversion Pipeline** — experiments_font_ttf_bitsy_with_arabic_source_font, experiments_font_arabic2_bitsy_ttx_to_bitsyfont_script, experiments_font_arabic2_bitsy_bitsyfont_format, experiments_font_arabic2_bitsy_fonttools_dependency [EXTRACTED 0.90]
- **Room Background Music Assignment Pipeline** — docs_tools_room_music_dropdown, docs_tools_music_tune, docs_tools_music_audio_import, docs_tools_room_room_settings [EXTRACTED 0.90]
- **Locked Exit/Ending Scripted Condition Flow** — docs_tools_exitsandendings_lock, docs_tools_exitsandendings_exit, docs_tools_exitsandendings_ending, docs_tools_dialog_code_view, docs_tools_inventory_items [EXTRACTED 0.95]
- **Core game entities defined in Glossary** — docs_glossary_avatar, docs_glossary_sprite, docs_glossary_tile, docs_glossary_item, docs_glossary_drawing, docs_glossary_room [EXTRACTED 1.00]
- **Bitsy Fork Lineage** — bitsy_project, bitsy_color_project, bitsy_tuxedo_project [EXTRACTED 1.00]
- **Bitsy Tuxedo editor QoL features over Bitsy Color** — docs_index_bitsy_tuxedo, docs_pt_br_tools_color_add_remove_colors, docs_pt_br_tools_music_tune_blip_merge, docs_pt_br_tools_theme_theme_panel, docs_faq_importingassets_importing_assets [INFERRED 0.85]
- **Game Export Pipeline (Editor to Standalone HTML)** — classic_index_html_exportgame, classic_index_html_webexporttemplate, dev_resources_export_exporttemplate_html, itch_io_upload_flow [INFERRED 0.85]
- **Tuxedo Music Panel Merge & Import Audio Trade-off** — feature_music_panel, feature_import_audio, itch_io_upload_flow, concept_imported_audio [INFERRED 0.85]
- **System API drawing/rendering pipeline** — docs_system_bitsysetgraphicsmode, docs_system_bitsydrawbegin, docs_system_bitsydrawpixel, docs_system_bitsydrawtile, docs_system_bitsydrawend [INFERRED 0.85]
- **UCS Fixed BDF font family (shared grid convention, increasing sizes)** — experiments_font_bdf_ucs_fixed_6x9_font_font, experiments_font_bdf_ucs_fixed_8x13_font_font, experiments_font_bdf_ucs_fixed_9x18_font, experiments_font_bdf_ucs_fixed_18x18ja_font [INFERRED 0.85]

## Communities (96 total, 21 thin omitted)

### Community 0 - "Editor UI Core"
Cohesion: 0.03
Nodes (17): closeImportModal(), deleteDrawing(), doPixelImport(), duplicateDrawing(), finishRecordingGif(), flipDrawing(), getContrastingColor(), isColorDark() (+9 more)

### Community 1 - "Engine Core (bitsy.js)"
Cohesion: 0.07
Nodes (63): clearGameData(), clearRoom(), curDefaultPal(), drawItem(), drawRoom(), drawRoomBackground(), drawRoomForeground(), drawRoomForegroundTile() (+55 more)

### Community 2 - "Classic Engine Build"
Cohesion: 0.09
Nodes (49): clearDialogBox(), continueDialog(), curPal(), drawDialogBox(), drawDialogChar(), drawNextDialogArrow(), drawNextDialogChar(), drawSet() (+41 more)

### Community 3 - "Engine Bootstrap System"
Cohesion: 0.10
Nodes (12): addProcess(), attachCanvas(), bitsyLog(), BitsySystem(), updateGraphics(), updateInput(), updateSound(), updateTextScale() (+4 more)

### Community 4 - "Paint Tool"
Cohesion: 0.11
Nodes (22): drawGrid(), PaintTool(), applySnapshot(), commitStroke(), curDrawingAltFrameData(), curDrawingData(), floodFill(), newItem() (+14 more)

### Community 5 - "Project Credits & Fork Lineage"
Cohesion: 0.08
Nodes (30): Adam Le Doux, Beatriz Loyola, Bitsy Color (Fork Base), Bitsy (Original Editor), Bitsy Tuxedo (Project), Avatar (Concept), Blip (Sound Effect, Concept), Exit/Ending (Concept) (+22 more)

### Community 6 - "Dialog Script Functions"
Cohesion: 0.06
Nodes (11): Script(), drawFunc(), drawItemFunc(), drawSpriteFunc(), drawTileFunc(), IsConditionalBlock(), isInlineCode(), isMultilineListBlock() (+3 more)

### Community 7 - "World Data Model"
Cohesion: 0.15
Nodes (37): createBlipData(), createDefaultFlags(), createDialogData(), createDrawingData(), createNameMapsForWorld(), createRoomData(), createTuneBarData(), createTuneData() (+29 more)

### Community 8 - "Build & Icon Tooling"
Cohesion: 0.08
Nodes (11): cross(), isPointInPoly(), rayIntersectsLine(), sub(), bitmapToSvg(), charToSvg(), exportFont(), cross() (+3 more)

### Community 9 - "Sound Pitch Utilities"
Cohesion: 0.12
Nodes (17): adjustPitch(), isMaxPitch(), isMinPitch(), pitchDistance(), pitchToSteps(), SoundPlayer(), arpeggiateBar(), createSfxState() (+9 more)

### Community 10 - "GIF Export"
Cohesion: 0.13
Nodes (24): gif(), animationApplicationExtension(), animationGraphicsControlExtension(), applicationExtensionId(), colorTableSizeThatFitsPalette(), extensionLabel(), flipBit(), getBit() (+16 more)

### Community 11 - "Tune/Music Editor"
Cohesion: 0.16
Nodes (26): makeTuneTool(), closestNoteInKey(), convertToChromatic(), convertToKey(), copyBar(), copyKey(), draw(), drawArpeggio() (+18 more)

### Community 12 - "PT-BR Color & Find Docs"
Cohesion: 0.08
Nodes (21): Hacks, Colors Tool (pt-BR), Paleta (Palette), Find Tool (pt-BR), Bitsy System API v0.1, bitsyClear(paletteIndex), bitsyDrawBegin(bufferId), bitsyDrawPixel(paletteIndex, x, y) (+13 more)

### Community 13 - "Dialog Engine"
Cohesion: 0.10
Nodes (12): Dialog(), AddWordToCharArray(), ContainsArabicCharacters(), DialogFontChar(), getTextScale(), IsArabicCharacter(), IsDisconnectedCharacter(), RainbowEffect() (+4 more)

### Community 14 - "Asset Creation (Drawing/Item/Sprite)"
Cohesion: 0.10
Nodes (25): getNewDrawingSize(), makeDrawing(), makeItem(), makeSprite(), makeTile(), next(), nextItem(), nextItemId() (+17 more)

### Community 15 - "Input System"
Cohesion: 0.10
Nodes (6): InputSystem(), eventIsModifier(), isModifierKeyDown(), isRestartCombo(), resetAll(), stopWindowScrolling()

### Community 16 - "Thumbnail Rendering"
Cohesion: 0.14
Nodes (15): createBlipThumbnailRenderer(), createDrawingThumbnailRenderer(), createItemThumbnailRenderer(), createPaletteThumbnailRenderer(), createRoomThumbnailRenderer(), onRender(), createSpriteThumbnailRenderer(), createTileThumbnailRenderer() (+7 more)

### Community 17 - "Core Utilities"
Cohesion: 0.13
Nodes (15): componentToHex(), deleteUnreferencedDialog(), dialogReferenceCount(), getDrawingDescription(), getDrawingFrameData(), getDrawingImageSource(), getDrawingNameOrDescription(), hexColorDistance() (+7 more)

### Community 18 - "Color Picker"
Cohesion: 0.22
Nodes (18): ColorPicker(), changeHexCode(), drawColorPickerSelect(), drawColorPickerWheel(), initColorWheel(), pickColor(), pickColorEnd(), pickColorStart() (+10 more)

### Community 19 - "Dialog Tool Widgets"
Cohesion: 0.20
Nodes (17): DialogTool(), CreateDefaultArgNode(), GetBlipNameFromId(), GetItemNameFromId(), GetPaletteNameFromId(), GetRoomNameFromId(), GetSpriteNameFromId(), GetTuneNameFromId() (+9 more)

### Community 20 - "Palette Tool"
Cohesion: 0.22
Nodes (12): PaletteTool(), addButtons(), changeColorPickerIndex(), GetSelectedId(), refreshColorButtons(), removeButton(), SelectPrev(), updateAddColorButton() (+4 more)

### Community 21 - "FAQ & Glossary Docs"
Cohesion: 0.13
Nodes (19): Importing Images and Audio (Bitsy Tuxedo), How to Make a Locked Door, Uploading a Bitsy Tuxedo Game to itch.io, Avatar, Drawing, Glossary, Item, Room (+11 more)

### Community 22 - "Animation & Export"
Cohesion: 0.17
Nodes (20): addDrawingAnimation(), addItemAnimation(), addSpriteAnimation(), addTileAnimation(), cacheDrawingAnimation(), exportGame(), exportGameData(), filenameFromGameTitle() (+12 more)

### Community 23 - "Room Marker Tool"
Cohesion: 0.14
Nodes (7): RoomMarkerTool(), FindMarkerAtLocation(), GetPosString(), UpdateAllExitOptions(), UpdateExitOptions(), UpdateMarkerOptions(), UpdatePlacementButtons()

### Community 24 - "Graphics System"
Cohesion: 0.13
Nodes (3): GraphicsSystem(), hexToRgb(), makeFillStyle()

### Community 25 - "Dialog Management"
Cohesion: 0.13
Nodes (19): addNewDialog(), deleteDialog(), duplicateDialog(), getCurDialogId(), nextAvailableDialogId(), nextDialog(), nextObjectId(), nextPaletteId() (+11 more)

### Community 26 - "Drawing Edit UI"
Cohesion: 0.13
Nodes (19): CreateDefaultName(), editDrawingAtCoordinate(), getCurPaintModeStr(), on_drawing_name_change(), on_paint_avatar(), on_paint_avatar_ui_update(), on_paint_item(), on_paint_item_ui_update() (+11 more)

### Community 27 - "Import & Localization Settings"
Cohesion: 0.15
Nodes (18): importFontFromFile(), importGameDataFromFile(), importGameFromFile(), newGameDialog(), on_change_font(), on_change_language(), on_change_text_direction(), on_game_data_change() (+10 more)

### Community 28 - "Localization System"
Cohesion: 0.22
Nodes (7): Localization(), exportEnglishStringsDictionary(), getEditorLanguage(), getLocaleString(), getLocalizationId(), localizationContains(), saveEditorLanguage()

### Community 29 - "Tint & Input Hacks"
Cohesion: 0.19
Nodes (17): applyGamepadHack(), applyTint(), hexToHue(), initTints(), on_edit_mode(), on_play_mode(), onEditTintChange(), onPlayTintChange() (+9 more)

### Community 30 - "Code Block Parsing"
Cohesion: 0.18
Nodes (15): CodeBlockNode(), CreateExpression(), ExpNode(), IsExpression(), IsLiteral(), IsSequence(), IsValidVariableName(), LiteralNode() (+7 more)

### Community 31 - "Dialog Comparison Editor"
Cohesion: 0.21
Nodes (14): ConvertNumberStringToArabic(), AddSelectionBehavior(), ConditionalComparisonEditor(), CreateComparisonControls(), ConditionalEditor(), CreateOptionEditors(), RefreshOptionsUI(), UpdateNodeOptions() (+6 more)

### Community 32 - "Tile Renderer"
Cohesion: 0.20
Nodes (9): TileRenderer(), createRenderCacheId(), deleteRenders(), getDrawingFrameTileId(), getOrRenderDrawingFrame(), getRenderedDrawingFrames(), isDrawingRendered(), renderDrawing() (+1 more)

### Community 33 - "Dialog Editor Blocks"
Cohesion: 0.15
Nodes (6): createOnTextSelectionChange(), addText(), DialogTextEditor(), CreateAddEffectHandler(), wrapTextSelection(), functionDescriptionMap

### Community 34 - "Dialog Plaintext Widget"
Cohesion: 0.20
Nodes (10): DialogWidget(), ChangeSelectedDialog(), ChangeSettingsVisibility(), CheckForComplexCodeInDialog(), UpdateEditorContent(), FindCodeVisitor(), PlaintextDialogScriptEditor(), DoesDialogExist() (+2 more)

### Community 35 - "Language & Browser Detection"
Cohesion: 0.13
Nodes (15): changeColorPickerIndex(), changeLnaguageStyle(), detectBrowserFeatures(), hackyUpdatePlaceholderText(), hasUnsupportedFeatures(), initDarkMode(), initLanguageOptions(), isPortraitOrientation() (+7 more)

### Community 36 - "UI Menu Elements"
Cohesion: 0.20
Nodes (8): createButtonElement(), createIconElement(), createLabelElement(), createOptionsForFindCategory(), createRadioElement(), createToggleElement(), MenuInterface(), wrapEventHandler()

### Community 37 - "Color Role System"
Cohesion: 0.17
Nodes (10): Background Color Role, Palette, Sprite Color Role, Tile Color Role, Paint Tool, Undo/Redo (Per-Drawing History), Record GIF Tool, GIF Capture Script (gif.js) (+2 more)

### Community 38 - "Font Rendering & Arabic Support"
Cohesion: 0.15
Nodes (12): Font Rendering Module (font.js), Arabic Font Support (Bitsy), bitsyfont File Format, fonttools / ttx (external tool), ttx_to_bitsyfont.js Conversion Script, BDF-style Bitmap Font Format, Bitsy ASCII Font Data, Bitsy Default Font Data (+4 more)

### Community 39 - "Exit/Ending Creation"
Cohesion: 0.26
Nodes (5): newEnding(), newExit(), GatherMarkerList(), ResetMarkerList(), SelectMarker()

### Community 40 - "Font Manager"
Cohesion: 0.22
Nodes (7): FontManager(), Create(), Font(), createCharData(), parseFont(), updateInvalidCharData(), GetData()

### Community 41 - "Card Navigation"
Cohesion: 0.26
Nodes (10): createNavControls(), selectAtIndex(), selectById(), makeToolCard(), onMouseDown(), onMouseMove(), onMouseUp(), onTouchEnd() (+2 more)

### Community 42 - "Panel Preferences"
Cohesion: 0.17
Nodes (12): getPanelPrefs(), getPanelSetting(), hidePanel(), panel_onMouseUp(), setPanelSetting(), togglePaintGrid(), togglePanel(), togglePanelAnimated() (+4 more)

### Community 43 - "Dialog Expression Evaluation"
Cohesion: 0.21
Nodes (10): evalChildren(), AddResult(), DialogBlockNode(), evalChildren(), ElseNode(), FuncNode(), evalArgs(), ParseConditional() (+2 more)

### Community 45 - "Find Tool"
Cohesion: 0.21
Nodes (10): .bitsyfont output format, CommandsRun.bat, README: How to Use Scripts to Create Arabic Bitsyfont, ttx / fonttools (ttx-to-ttf), ttx_to_bitsyfont.js script, Fixed-size bitmap glyph grid convention (CHAR + row bitstrings), ucs_fixed_18x18ja BDF font (18x18, Japanese-oriented), ucs_fixed_6x9 BDF font (6x9) (+2 more)

### Community 46 - "Room Marker Dragging"
Cohesion: 0.31
Nodes (7): FindTool(), GenerateItems(), createOnClick(), selectCategory(), selectCategoryAndUpdateUI(), UpdateSelectedItems(), UpdateVisibleItems()

### Community 48 - "Dialog Code View & Locks"
Cohesion: 0.33
Nodes (8): buildAudioTab(), handleAudioImport(), loadAudioData(), makeMusicTool(), refreshAudioList(), saveAudioData(), startRoomAudio(), stopRoomAudio()

### Community 49 - "Font Color Functions"
Cohesion: 0.20
Nodes (10): Dialog Code View / Script, Ending, Exit, Exit/Ending Lock, One-way Exit, Items, Variables, Dialog Engine Module (dialog.js) (+2 more)

### Community 50 - "Event Listener System"
Cohesion: 0.20
Nodes (10): color1Func(), color2Func(), color3Func(), printFontFunc(), rainbowFunc(), sayFunc(), shakyFunc(), toggleTextEffect() (+2 more)

### Community 51 - "Inventory UI"
Cohesion: 0.24
Nodes (3): EventListener(), Unlisten(), EventManager()

### Community 52 - "Room Marker Base"
Cohesion: 0.33
Nodes (8): updateInventoryItemUI(), updateInventoryUI(), updateInventoryVariableUI(), addVariableRegister(), createAddButton(), createOnVariableDelete(), createOnVariableNameChange(), createOnVariableValueChange()

### Community 54 - "Room Tool"
Cohesion: 0.27
Nodes (5): makeBlipTile(), makeBlipTool(), clampBlipParam(), generate(), randInt()

### Community 55 - "Expression Input Builders"
Cohesion: 0.24
Nodes (4): makeRoomTool(), draw(), drawExitMarker(), drawExitTile()

### Community 56 - "Marker Position Helpers"
Cohesion: 0.36
Nodes (8): ExpressionBuilder(), CreateBoolInputHandler(), CreateOperatorInputHandler(), GetLeftmostNode(), GetRightmostNode(), ResetExpressionDiv(), TryAddCurrentNumberToExpression(), GetColorClassForParameterType()

### Community 57 - "CI/Publish Config"
Cohesion: 0.28
Nodes (4): drawLocation(), RenderMarkerSelection(), UpdateExitDirectionUI(), UpdateMarkerNames()

### Community 58 - "Dialog & Find Tool Docs"
Cohesion: 0.29
Nodes (6): editor/script/engine/bitsy.js version fields, Dependabot Config, Branch CI Workflow, Release CI Workflow, dev/icon_generator/makeicons script, dev/resource_packager script

### Community 59 - "Export/Import & Engine Docs"
Cohesion: 0.25
Nodes (8): Dialog Tool, Embedding Drawings in Dialog Text, Dialog Text Effects, Find Tool, Room, Dialog Editor Script (dialog_editor.js), Find Script (find.js), Room Tool Script (tools/room.js)

### Community 60 - "Dialog Action Builder"
Cohesion: 0.29
Nodes (8): Export/Import Game, Bitsy Engine (bitsy.js), Bitsy Tuxedo Editor (index.html), Color Picker Script (color_picker.js), Exporter Script (exporter.js), Importer Script (importer.js), Blip Tool Script (tools/blip.js), Tune Tool Script (tools/tune.js)

### Community 61 - "Dialog Block Editor"
Cohesion: 0.25
Nodes (4): ActionBuilder(), FunctionEditor(), CreateFunctionDescription(), createAddParameterHandler()

### Community 62 - "Image Importer"
Cohesion: 0.25
Nodes (5): BlockEditor(), DialogScriptEditor(), OnUpdate(), RefreshEditorUI(), OnTextChangeHandler()

### Community 63 - "Sound Chip Synthesis"
Cohesion: 0.46
Nodes (7): buildDrawingData(), countNewColors(), doImport(), findOrAddPaletteColor(), getCurrentPaletteId(), getTargetSize(), squaredColorDistance()

### Community 65 - "Dialog Child Editors"
Cohesion: 0.29
Nodes (5): Blip, Tune, Room Music Dropdown (Bitsy Tuxedo), Room Settings (Colors/Avatar/Music), Music Tool Script (tools/music.js)

### Community 66 - "Dialog Sequence Parsing"
Cohesion: 0.67
Nodes (7): CreateChildEditors(), isChildType(), isCodeBlock(), isDescribedFunction(), isExpression(), isIf(), isSeq()

### Community 67 - "Game Exporter"
Cohesion: 0.29
Nodes (5): CycleNode(), ParseSequence(), trimLeadingWhitespace(), SequenceNode(), ShuffleNode()

### Community 68 - "Mouse Interface"
Cohesion: 0.38
Nodes (3): Exporter(), replaceTemplateMarker(), unescapeSpecialCharacters()

### Community 70 - "Icon Utilities"
Cohesion: 0.33
Nodes (4): exportGame(), webExportTemplate string template, exportedGameData script tag, bitsyFontData script tag

### Community 71 - "Theme & Localization Panels"
Cohesion: 0.53
Nodes (3): IconUtils(), GetIconSource(), LoadIcon()

### Community 72 - "Expression Operator Editor"
Cohesion: 0.40
Nodes (3): Game Data View (Raw Save Data), Game Panel, Localization Script (localization.js)

### Community 73 - "Dialog Condition Nodes"
Cohesion: 0.50
Nodes (4): ExpressionEditor(), AddOperatorControlRecursive(), CreateExpressionControls(), ExpressionOperatorEditor()

### Community 74 - "Marker Placement"
Cohesion: 0.50
Nodes (5): ConditionPairNode(), IfNode(), TestCondition(), leadingWhitespace(), SequenceBase()

### Community 77 - "Panel Drag Helpers"
Cohesion: 0.50
Nodes (4): Cat Mascot Icon (Variant 2), Cat Icon Variant 5, Cat Sprite Icon (Pixel Art), Cat SVG Icon

### Community 78 - "Room Transition Effects"
Cohesion: 0.67
Nodes (4): getElementPosition(), getElementSize(), grabCard(), panel_onMouseMove()

### Community 81 - "Fork Lineage Docs"
Cohesion: 0.67
Nodes (3): Beatriz Loyola, Credits, Pedro Bedor

### Community 82 - "itch.io Cover Art"
Cohesion: 0.67
Nodes (3): Bitsy Color, Bitsy Tuxedo, Bitsy Tuxedo Docs (Index)

### Community 83 - "Timer Utility"
Cohesion: 0.67
Nodes (3): Bitsy Tuxedo itch.io Cover Art, Pink/Red Pixel-Art Cat-like Creature, itch.io Game Listing (Bitsy Tuxedo)

## Ambiguous Edges - Review These
- `Importing Assets (Docs PT-BR)` → `System API v0.1 (Docs PT-BR)`  [AMBIGUOUS]
  docs-pt-br/faq/importingAssets.md · relation: conceptually_related_to

## Knowledge Gaps
- **73 isolated node(s):** `bitsyClear(paletteIndex)`, `bitsyDrawBegin(bufferId)`, `bitsyDrawPixel(paletteIndex, x, y)`, `bitsyDrawTextbox(x, y)`, `bitsyDrawTile(tileId, x, y)` (+68 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 408 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Script()` connect `Dialog Script Functions` to `Game Exporter`, `Marker Placement`, `Dialog Expression Evaluation`, `Cat Mascot Icon Variants`, `Event Listener System`, `Code Block Parsing`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `PaintTool()` (e.g. with `changePaintColor()` and `onMouseDown()`) actually correct?**
  _`PaintTool()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `bitsyClear(paletteIndex)`, `bitsyDrawBegin(bufferId)`, `bitsyDrawPixel(paletteIndex, x, y)` to the rest of the system?**
  _73 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Editor UI Core` be split into smaller, more focused modules?**
  _Cohesion score 0.027263875365141188 - nodes in this community are weakly interconnected._
- **Why does `Scripting (Dialog expression language)` connect `Cat Mascot Icon Variants` to `Dialog Editor Blocks`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Should `Engine Core (bitsy.js)` be split into smaller, more focused modules?**
  _Cohesion score 0.06720321931589537 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Importing Assets (Docs PT-BR)` and `System API v0.1 (Docs PT-BR)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._