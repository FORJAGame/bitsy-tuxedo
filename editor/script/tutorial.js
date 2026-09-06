// editor/script/tutorial.js
// Motor do tour interativo. Não alterar; edite tutorial_steps.js para mudar conteúdo.
var TutorialTour = (function () {
	// ── constantes ──
	var STORAGE_KEY       = "tutorial_completed";
	var URL_FORCE_PARAM   = "tutorial";
	var Z_INDEX           = 10000;
	var SPOTLIGHT_PADDING = 8;
	var CARD_GAP          = 12;
	var VIEWPORT_MARGIN   = 8;
	var PANEL_ANIM_MS     = 450;
	var SCROLL_SETTLE_MS  = 350;
	var MOBILE_MEDIA      = "(max-aspect-ratio: 3/4)";

	// ── estado interno ──
	var active        = false;
	var currentIndex  = -1;
	var goToToken     = 0;       // reentrancy guard
	var rafId         = null;
	var timerIds      = [];      // pending setTimeout ids
	var openedPanels  = [];      // panels the tour opened
	var overlay       = null;    // #tutorialOverlay
	var currentEl     = null;    // target element of current step

	// cached DOM refs (filled in start)
	var spotlight, card, arrow, mascot, titleEl, bodyEl, progressEl, backBtn, quitBtn, nextBtn;

	// handler refs (so we can remove exactly these)
	var onResize       = null;
	var onWindowScroll = null;
	var onEditorScroll = null;
	var onKeydown      = null;

	// fallback strings
	var fallbacks = {
		tutorial_replay:               "tutorial",
		tutorial_start:                "Start",
		tutorial_skip:                 "No thanks",
		tutorial_back:                 "Back",
		tutorial_next:                 "Next",
		tutorial_quit:                 "Quit",
		tutorial_finish:               "Finish",
		tutorial_step_welcome_title:   "Welcome to Bitsy Tuxedo!",
		tutorial_step_welcome_body:    "Hi, I'm Jiji! Want a quick tour of the editor? It takes about a minute.",
		tutorial_step_room_title:      "The room",
		tutorial_step_room_body:       "This grid is your world. Pick something in the Paint tool, then click a cell here to place it.",
		tutorial_step_paint_title:     "Paint tool",
		tutorial_step_paint_body:      "Draw tiles, sprites, items and your avatar. Tuxedo adds a color picker, a paint bucket and undo/redo (Ctrl+Z / Ctrl+Y).",
		tutorial_step_colors_title:    "Colors",
		tutorial_step_colors_body:     "Every room uses a 3-color palette. Edit colors here with the Tuxedo color picker.",
		tutorial_step_dialog_title:    "Dialog",
		tutorial_step_dialog_body:     "Give sprites something to say. Select a sprite and write its lines in this editor.",
		tutorial_step_exits_title:     "Exits & endings",
		tutorial_step_exits_body:      "Connect rooms with exits so the player can move between them, and place endings to finish the game.",
		tutorial_step_inventory_title: "Inventory",
		tutorial_step_inventory_body:  "Track collectible items and game variables the player picks up or changes during play.",
		tutorial_step_play_title:      "Play",
		tutorial_step_play_body:       "Press Play any time to test your game. Press it again to go back to editing.",
		tutorial_step_download_title:  "Download",
		tutorial_step_download_body:   "Export your finished game as a single .html file you can share or upload anywhere.",
		tutorial_step_themes_title:    "Themes & language",
		tutorial_step_themes_body:     "Switch to dark mode, pick a custom theme, or change the editor language here.",
		tutorial_step_done_title:      "You're set!",
		tutorial_step_done_body:       "That's the tour. Reopen it any time from the \"tutorial\" button in the top bar. Have fun making things!"
	};

	function loc(id) {
		if (typeof localization !== "undefined" && localization.GetStringOrFallback) {
			return localization.GetStringOrFallback(id, fallbacks[id] || id);
		}
		return fallbacks[id] || id;
	}

	// some helpers
	function clearTimers() {
		for (var i = 0; i < timerIds.length; i++) clearTimeout(timerIds[i]);
		timerIds = [];
	}

	function scheduleReposition() {
		if (rafId) return;
		rafId = requestAnimationFrame(function () {
			rafId = null;
			if (!active) return;
			renderSpotlightAndCard();
		});
	}

	function isMobile() {
		return window.matchMedia(MOBILE_MEDIA).matches;
	}

	function getLocTarget(step) {
		if (!step.target) return null;
		var el = document.querySelector(step.target);
		if (!el) {
			console.warn("[tutorial] target not found: " + step.target);
			return null;
		}
		// invisible check
		if (el.offsetParent === null) {
			var cs = window.getComputedStyle(el);
			if (cs.position !== "fixed") {
				console.warn("[tutorial] target not visible: " + step.target);
				return null;
			}
		}
		return el;
	}

	function shouldAutoStart(opts) {
		if (typeof urlParameters !== "undefined" && urlParameters[URL_FORCE_PARAM] === "1") return true;
		if (active) return false;
		if (typeof isPlayMode !== "undefined" && isPlayMode) return false;
		if (!opts || opts.isFreshGame !== true) return false;
		if (typeof Store !== "undefined" && Store.get(STORAGE_KEY) === true) return false;
		if (isMobile()) return false;
		return true;
	}

	// build DOM overlay
	function buildOverlay() {
		overlay = document.createElement("div");
		overlay.id = "tutorialOverlay";

		spotlight = document.createElement("div");
		spotlight.id = "tutorialSpotlight";

		card = document.createElement("div");
		card.id = "tutorialCard";
		card.setAttribute("role", "dialog");
		card.setAttribute("aria-modal", "false");
		card.setAttribute("aria-labelledby", "tutorialCardTitle");
		card.setAttribute("aria-describedby", "tutorialCardBody");

		mascot = document.createElement("img");
		mascot.id = "tutorialMascot";
		mascot.alt = "";
		mascot.src = "image/cat.png";

		arrow = document.createElement("div");
		arrow.id = "tutorialCardArrow";

		titleEl = document.createElement("h2");
		titleEl.id = "tutorialCardTitle";

		bodyEl = document.createElement("p");
		bodyEl.id = "tutorialCardBody";

		var footer = document.createElement("div");
		footer.id = "tutorialCardFooter";

		progressEl = document.createElement("span");
		progressEl.id = "tutorialProgress";

		backBtn = document.createElement("button");
		backBtn.id = "tutorialBackBtn";
		backBtn.type = "button";
		backBtn.addEventListener("click", function () { prev(); });

		quitBtn = document.createElement("button");
		quitBtn.id = "tutorialQuitBtn";
		quitBtn.type = "button";
		quitBtn.addEventListener("click", function () { stop({ completed: true }); });

		nextBtn = document.createElement("button");
		nextBtn.id = "tutorialNextBtn";
		nextBtn.type = "button";
		nextBtn.addEventListener("click", function () { next(); });

		footer.appendChild(progressEl);
		footer.appendChild(backBtn);
		footer.appendChild(quitBtn);
		footer.appendChild(nextBtn);

		card.appendChild(mascot);
		card.appendChild(arrow);
		card.appendChild(titleEl);
		card.appendChild(bodyEl);
		card.appendChild(footer);

		overlay.appendChild(spotlight);
		overlay.appendChild(card);
		document.body.appendChild(overlay);
	}

	// render step content + layout
	function renderStep(step, el) {
		// text
		titleEl.textContent = loc("tutorial_step_" + step.id + "_title");
		bodyEl.textContent  = loc("tutorial_step_" + step.id + "_body");

		// progress
		progressEl.textContent = (currentIndex + 1) + " / " + TUTORIAL_STEPS.length;

		// back button
		if (currentIndex === 0) {
			backBtn.hidden = true;
		} else {
			backBtn.hidden = false;
			backBtn.textContent = loc("tutorial_back");
		}

		// quit button label
		quitBtn.textContent = (currentIndex === 0) ? loc("tutorial_skip") : loc("tutorial_quit");

		// next button label
		if (currentIndex === TUTORIAL_STEPS.length - 1) {
			nextBtn.textContent = loc("tutorial_finish");
		} else {
			nextBtn.textContent = loc("tutorial_next");
		}

		// mascot pose (vai funcionar pro mazela tbm?)
		mascot.hidden = false;
		mascot.className = "";
		if (step.mascot === "center")      mascot.className = "pose-center";
		else if (step.mascot === "left")   mascot.className = "pose-left";
		else if (step.mascot === "right")  mascot.className = "pose-right";
		else if (step.mascot === "none")   mascot.hidden = true;

		// drop animation on card
		card.style.animation = "none";
		// force reflow to restart animation
		void card.offsetWidth;
		card.style.animation = "dropAnim 0.3s";

		// position spotlight + card
		renderSpotlightAndCard();
	}

	function renderSpotlightAndCard() {
		var step = TUTORIAL_STEPS[currentIndex];
		if (!step) return;

		var el = currentEl;
		var mobile = isMobile();
		var hasTarget = !!el;
		var centerMode = !hasTarget || step.placement === "center" || mobile;

		// spotlight
		if (hasTarget && !centerMode) {
			spotlight.style.display = "block";
			var r = el.getBoundingClientRect();
			spotlight.style.left   = (r.left - SPOTLIGHT_PADDING) + "px";
			spotlight.style.top    = (r.top - SPOTLIGHT_PADDING) + "px";
			spotlight.style.width  = (r.width + 2 * SPOTLIGHT_PADDING) + "px";
			spotlight.style.height = (r.height + 2 * SPOTLIGHT_PADDING) + "px";
		} else {
			spotlight.style.display = "none";
		}

		// card
		if (centerMode) {
			arrow.hidden = true;
			card.style.left = "50%";
			card.style.top = "50%";
			card.style.transform = "translate(-50%, -50%)";
			card.style.right = "";
			card.style.bottom = "";
			return;
		}

		// measure card
		var cw = card.offsetWidth;
		var ch = card.offsetHeight;
		var vw = window.innerWidth;
		var vh = window.innerHeight;
		var r = el.getBoundingClientRect();

		// spotlight rect
		var sl = r.left - SPOTLIGHT_PADDING;
		var st = r.top - SPOTLIGHT_PADDING;
		var sw = r.width + 2 * SPOTLIGHT_PADDING;
		var sh = r.height + 2 * SPOTLIGHT_PADDING;
		var sr = sl + sw;
		var sb = st + sh;

		// sides to try
		var sides;
		if (step.placement === "auto") {
			sides = ["bottom", "top", "right", "left"];
		} else {
			sides = [step.placement];
			var rest = ["bottom", "top", "right", "left"];
			for (var i = 0; i < rest.length; i++) {
				if (rest[i] !== step.placement) sides.push(rest[i]);
			}
		}

		var bestSide = null;
		var bestX = 0, bestY = 0;
		var foundFit = false;

		for (var s = 0; s < sides.length; s++) {
			var side = sides[s];
			var x, y;
			var fits = true;

			if (side === "bottom") {
				y = sb + CARD_GAP;
				x = sl + sw / 2 - cw / 2;
				if (y + ch > vh - VIEWPORT_MARGIN) fits = false;
			} else if (side === "top") {
				y = st - CARD_GAP - ch;
				x = sl + sw / 2 - cw / 2;
				if (y < VIEWPORT_MARGIN) fits = false;
			} else if (side === "right") {
				x = sr + CARD_GAP;
				y = st + sh / 2 - ch / 2;
				if (x + cw > vw - VIEWPORT_MARGIN) fits = false;
			} else if (side === "left") {
				x = sl - CARD_GAP - cw;
				y = st + sh / 2 - ch / 2;
				if (x < VIEWPORT_MARGIN) fits = false;
			}

			// clamp to viewport
			if (x < VIEWPORT_MARGIN) x = VIEWPORT_MARGIN;
			if (x + cw > vw - VIEWPORT_MARGIN) x = vw - VIEWPORT_MARGIN - cw;
			if (y < VIEWPORT_MARGIN) y = VIEWPORT_MARGIN;
			if (y + ch > vh - VIEWPORT_MARGIN) y = vh - VIEWPORT_MARGIN - ch;

			if (fits) {
				bestSide = side;
				bestX = x;
				bestY = y;
				foundFit = true;
				break;
			}
			// remember best fallback (clamped coords); side overridden below if nothing fits
			bestSide = side;
			bestX = x;
			bestY = y;
		}

		// If no side fit, fall back to "bottom" (still clamped to viewport)
		if (!foundFit) {
			bestSide = "bottom";
			bestX = sl + sw / 2 - cw / 2;
			bestY = sb + CARD_GAP;
			if (bestX < VIEWPORT_MARGIN) bestX = VIEWPORT_MARGIN;
			if (bestX + cw > vw - VIEWPORT_MARGIN) bestX = vw - VIEWPORT_MARGIN - cw;
			if (bestY < VIEWPORT_MARGIN) bestY = VIEWPORT_MARGIN;
			if (bestY + ch > vh - VIEWPORT_MARGIN) bestY = vh - VIEWPORT_MARGIN - ch;
		}

		arrow.hidden = false;
		card.style.transform = "none";
		card.style.left = bestX + "px";
		card.style.top = bestY + "px";
		card.style.right = "";
		card.style.bottom = "";

		// arrow
		arrow.className = "";
		var targetCenterX = sl + sw / 2;
		var targetCenterY = st + sh / 2;

		if (bestSide === "bottom") {
			arrow.className = "arrow-top";
			var ax = Math.max(16, Math.min(cw - 16, targetCenterX - bestX));
			arrow.style.left = ax + "px";
			arrow.style.top = "";
			arrow.style.right = "";
			arrow.style.bottom = "";
		} else if (bestSide === "top") {
			arrow.className = "arrow-bottom";
			var ax = Math.max(16, Math.min(cw - 16, targetCenterX - bestX));
			arrow.style.left = ax + "px";
			arrow.style.top = "";
			arrow.style.right = "";
			arrow.style.bottom = "";
		} else if (bestSide === "right") {
			arrow.className = "arrow-left";
			var ay = Math.max(16, Math.min(ch - 16, targetCenterY - bestY));
			arrow.style.top = ay + "px";
			arrow.style.left = "";
			arrow.style.right = "";
			arrow.style.bottom = "";
		} else if (bestSide === "left") {
			arrow.className = "arrow-right";
			var ay = Math.max(16, Math.min(ch - 16, targetCenterY - bestY));
			arrow.style.top = ay + "px";
			arrow.style.left = "";
			arrow.style.right = "";
			arrow.style.bottom = "";
		}
	}

	// goTo (reentrant-safe)
	function goTo(index) {
		if (!active) return;
		if (index < 0) index = 0;
		if (index > TUTORIAL_STEPS.length - 1) index = TUTORIAL_STEPS.length - 1;

		// cancel pending timeouts from previous goTo
		goToToken++;
		var token = goToToken;
		clearTimers();

		currentIndex = index;
		var step = TUTORIAL_STEPS[index];

		// cleanup old scroll handlers before re-attaching
		removeRepositionHandlers();

		// ensureVisible
		if (step.ensureVisible) {
			var panel = document.getElementById(step.ensureVisible);
			if (panel && panel.style.display === "none") {
				showPanel(step.ensureVisible);
				openedPanels.push(step.ensureVisible);
				var tid = setTimeout(function () {
					if (goToToken !== token) return;
					resolveAndRender(step, token);
				}, PANEL_ANIM_MS);
				timerIds.push(tid);
				return;
			}
		}

		resolveAndRender(step, token);
	}

	function resolveAndRender(step, token) {
		// resolve target
		currentEl = getLocTarget(step);

		if (currentEl && step.placement !== "center" && !isMobile()) {
			currentEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
			var tid = setTimeout(function () {
				if (goToToken !== token) return;
				renderStep(step, currentEl);
				installRepositionHandlers();
			}, SCROLL_SETTLE_MS);
			timerIds.push(tid);
		} else {
			renderStep(step, currentEl);
			installRepositionHandlers();
		}
	}

	// reposition handlers
	function installRepositionHandlers() {
		onResize = function () { scheduleReposition(); };
		onWindowScroll = function () { scheduleReposition(); };
		onEditorScroll = function () { scheduleReposition(); };
		window.addEventListener("resize", onResize);
		window.addEventListener("scroll", onWindowScroll, true);
		var editorWin = document.getElementById("editorWindow");
		if (editorWin) editorWin.addEventListener("scroll", onEditorScroll);
	}

	function removeRepositionHandlers() {
		if (onResize)       { window.removeEventListener("resize", onResize); onResize = null; }
		if (onWindowScroll) { window.removeEventListener("scroll", onWindowScroll, true); onWindowScroll = null; }
		if (onEditorScroll) {
			var editorWin = document.getElementById("editorWindow");
			if (editorWin) editorWin.removeEventListener("scroll", onEditorScroll);
			onEditorScroll = null;
		}
	}

	// keyboard control
	function handleKeydown(e) {
		if (!active) return;
		var tag = document.activeElement ? document.activeElement.tagName : "";
		var isEditable = document.activeElement && document.activeElement.isContentEditable;
		var isInput = (tag === "INPUT" || tag === "TEXTAREA" || isEditable);

		if (e.key === "Escape") {
			e.preventDefault();
			stop({ completed: true });
			return;
		}

		if (isInput) return;

		// Don't double-fire when a tour button has focus (Enter synthesizes a click)
		var ae = document.activeElement;
		var isTourBtn = ae && (ae === backBtn || ae === quitBtn || ae === nextBtn);
		if (isTourBtn) return;

		if (e.key === "ArrowRight" || e.key === "Enter") {
			e.preventDefault();
			next();
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			prev();
		}
	}

	// API
	function init(opts) {
		// idempotent: only wire button once
		var btn = document.getElementById("tutorialReplayButton");
		if (btn && !btn._tutorialWired) {
			btn._tutorialWired = true;
			btn.addEventListener("click", function () { start(0); });
		}

		// play mode listener (permanent, once)
		var playCheck = document.getElementById("playModeCheck");
		if (playCheck && !playCheck._tutorialWired) {
			playCheck._tutorialWired = true;
			playCheck.addEventListener("click", function () {
				if (active) stop({ completed: true });
			});
		}

		if (shouldAutoStart(opts)) {
			start(0);
		}
	}

	function start(fromIndex) {
		if (active) return;
		if (typeof fromIndex === "undefined") fromIndex = 0;

		active = true;
		openedPanels = [];
		buildOverlay();

		// keyboard handler
		onKeydown = function (e) { handleKeydown(e); };
		document.addEventListener("keydown", onKeydown, true);

		goTo(fromIndex);
	}

	function stop(opts) {
		if (!active) return;
		if (typeof opts === "undefined") opts = {};

		active = false;
		goToToken++;
		clearTimers();

		if (rafId) { cancelAnimationFrame(rafId); rafId = null; }

		removeRepositionHandlers();

		if (onKeydown) { document.removeEventListener("keydown", onKeydown, true); onKeydown = null; }

		// close panels the tour opened
		for (var i = 0; i < openedPanels.length; i++) {
			var pid = openedPanels[i];
			var p = document.getElementById(pid);
			if (p && p.style.display !== "none") {
				hidePanel(pid);
			}
		}

		// remove overlay
		if (overlay && overlay.parentNode) {
			overlay.remove();
		}
		overlay = null;
		spotlight = null;
		card = null;
		arrow = null;
		mascot = null;

		if (opts.completed !== false) {
			if (typeof Store !== "undefined") Store.set(STORAGE_KEY, true);
		}

		currentIndex = -1;
		currentEl = null;
		openedPanels = [];
	}

	function next() {
		if (!active) return;
		if (currentIndex === TUTORIAL_STEPS.length - 1) {
			stop({ completed: true });
		} else {
			goTo(currentIndex + 1);
		}
	}

	function prev() {
		if (!active) return;
		if (currentIndex > 0) goTo(currentIndex - 1);
	}

	function isActive() {
		return active;
	}

	return {
		init:    init,
		start:   start,
		stop:    stop,
		next:    next,
		prev:    prev,
		goTo:    goTo,
		isActive: isActive
	};
})();
