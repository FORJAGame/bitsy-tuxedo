// editor/script/tutorial_steps.js
var TUTORIAL_STEPS = [
  { id: "welcome",   target: null,                         placement: "center", mascot: "center" },
  { id: "room",      target: "#roomPanel",                 placement: "auto",   mascot: "right"  },
  { id: "paint",     target: "#paintPanel",                placement: "auto",   mascot: "left"   },
  { id: "colors",    target: "#colorsPanel",               placement: "auto",   mascot: "right"  },
  { id: "tools_check",   target: "#toolsCheckLabel", ensureVisible: "toolsPanel", placement: "bottom", mascot: "right" },
  { id: "tools_overview", target: "#toolsPanel", placement: "auto", mascot: "right" },
  { id: "dialog",    target: "#dialogPanel",  ensureVisible: "dialogPanel",  placement: "auto",   mascot: "left"   },
  { id: "exits",     target: "#exitsPanel",  ensureVisible: "exitsPanel",  placement: "auto", mascot: "right" },
  { id: "inventory", target: "#inventoryPanel",  ensureVisible: "inventoryPanel",  placement: "auto",   mascot: "left"   },
  { id: "play",      target: "label[for=\"playModeCheck\"]", placement: "bottom", mascot: "right" },
  { id: "download",  target: "#downloadPanel",             placement: "auto",   mascot: "left"   },
  { id: "themes",    target: "#themePanel",  ensureVisible: "themePanel",  placement: "auto", mascot: "right" },
  { id: "done",      target: null,                         placement: "center", mascot: "center" },
];
