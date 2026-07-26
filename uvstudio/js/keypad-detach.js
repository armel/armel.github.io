/* UV Studio — detach the Live Viewer keypad into a floating window.

   Uses the Document Picture-in-Picture API to move the #k1Keyboard node into a
   real, always-on-top OS window. Because it stays in the same JavaScript
   context, every key keeps its existing handlers and still calls sendKey() on
   the serial port owned by the main window — no cross-window messaging needed.

   Chromium only (Chrome/Edge/Opera 116+, the same browsers UV Studio already
   needs for Web Serial). Where the API is absent (e.g. Firefox) the Detach
   button is simply hidden. */
(function () {
  "use strict";

  const detachBtn = document.getElementById("keyboardDetachBtn");
  const toggleBtn = document.getElementById("keyboardToggleBtn");
  const keyboard = document.getElementById("k1Keyboard");
  if (!detachBtn || !keyboard) return;

  // Feature detection — option B: no support ⇒ keep the button hidden.
  if (!("documentPictureInPicture" in window)) return;
  detachBtn.hidden = false;

  const i18n = window.uvStudioI18n;
  function t(key) {
    return i18n && i18n.t ? i18n.t(key) : key;
  }

  let pipWindow = null;
  let anchor = null;          // sibling the keyboard sat before, for restore
  let parent = null;          // keyboard's original parent
  let wasHidden = false;      // keyboard's collapsed state before detaching
  let themeObserver = null;

  // Copy every same-origin stylesheet into the PiP document so the keypad
  // looks identical. Falls back to a <link> for anything we can't read.
  function copyStyles(win) {
    // IMPORTANT: create every <style>/<link> with the PiP window's OWN document.
    // Nodes created by the main document do not apply their styles once adopted
    // into another document — that is what left the detached keypad unstyled.
    for (const sheet of Array.from(document.styleSheets)) {
      let cssText = null;
      try {
        if (sheet.cssRules) cssText = Array.from(sheet.cssRules).map(r => r.cssText).join("");
      } catch (e) {
        cssText = null; // unreadable (e.g. cross-origin) — fall back to a <link>
      }
      if (cssText !== null) {
        const style = win.document.createElement("style");
        style.textContent = cssText;
        if (sheet.media && sheet.media.mediaText) style.media = sheet.media.mediaText;
        win.document.head.appendChild(style);
      } else if (sheet.href) {
        const link = win.document.createElement("link");
        link.rel = "stylesheet";
        link.href = sheet.href; // absolute URL — resolves regardless of base
        if (sheet.media && sheet.media.mediaText) link.media = sheet.media.mediaText;
        win.document.head.appendChild(link);
      }
    }
    // Minimal layout so the keypad is centered on its own in the small window.
    const own = win.document.createElement("style");
    own.textContent =
      "html,body{margin:0;height:100%;}" +
      "body{display:flex;align-items:center;justify-content:center;" +
      "padding:14px;box-sizing:border-box;background:var(--bg);}" +
      ".k1-keyboard{margin:0;}.k1-keyboard.hidden{display:block;}";
    win.document.head.appendChild(own);
  }

  // Mirror the current theme, and keep it in sync if it changes while detached.
  function syncTheme(win) {
    const apply = () => {
      const theme = document.body.getAttribute("data-theme") || "light";
      win.document.documentElement.setAttribute("data-theme", theme);
      win.document.body.setAttribute("data-theme", theme);
    };
    apply();
    themeObserver = new MutationObserver(apply);
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
  }

  // Forward physical key presses from the PiP window to the main document so
  // keyboard shortcuts keep working while the floating window has focus.
  function forwardKey(event) {
    try {
      document.body.dispatchEvent(new KeyboardEvent(event.type, {
        key: event.key, code: event.code,
        keyCode: event.keyCode, which: event.which,
        shiftKey: event.shiftKey, ctrlKey: event.ctrlKey,
        altKey: event.altKey, metaKey: event.metaKey,
        repeat: event.repeat, bubbles: true, cancelable: true
      }));
    } catch (e) { /* ignore */ }
  }

  function setButtonState(detached) {
    detachBtn.setAttribute("data-i18n", detached ? "reattach_keyboard_short" : "detach_keyboard_short");
    detachBtn.textContent = t(detached ? "reattach_keyboard_short" : "detach_keyboard_short");
    detachBtn.title = t("detach_keyboard");
    detachBtn.setAttribute("aria-pressed", String(detached));
    if (toggleBtn) toggleBtn.disabled = detached; // hide/show toggle is moot while detached
  }

  async function detach() {
    if (pipWindow) return;
    const rect = keyboard.getBoundingClientRect();
    try {
      pipWindow = await window.documentPictureInPicture.requestWindow({
        width: Math.round(rect.width) + 32,
        height: Math.round(rect.height) + 32
      });
    } catch (e) {
      pipWindow = null;
      return; // user dismissed, or blocked
    }

    copyStyles(pipWindow);
    syncTheme(pipWindow);

    // Remember where the keypad lived so we can restore it exactly.
    parent = keyboard.parentNode;
    anchor = keyboard.nextSibling;
    wasHidden = keyboard.classList.contains("hidden");
    keyboard.classList.remove("hidden");

    // The keypad's CSS is scoped under "#pane-viewer"; recreate that ancestor
    // in the PiP window so the grid layout and device styling still apply.
    const pane = pipWindow.document.createElement("div");
    pane.id = "pane-viewer";
    pane.appendChild(keyboard);
    pipWindow.document.body.append(pane);
    pipWindow.addEventListener("keydown", forwardKey);
    pipWindow.addEventListener("keyup", forwardKey);
    // Native close (X) of the floating window ⇒ bring the keypad home.
    pipWindow.addEventListener("pagehide", reattach, { once: true });

    setButtonState(true);
  }

  function reattach() {
    if (!pipWindow) return;
    // Put the keypad back exactly where it was.
    if (parent) parent.insertBefore(keyboard, anchor);
    if (wasHidden) keyboard.classList.add("hidden");
    if (themeObserver) { themeObserver.disconnect(); themeObserver = null; }

    const win = pipWindow;
    pipWindow = null;
    setButtonState(false);
    try { win.close(); } catch (e) { /* already closing */ }
  }

  detachBtn.addEventListener("click", () => {
    if (pipWindow) reattach(); else void detach();
  });

  // Keep the button label correct after a language switch.
  window.addEventListener("uvstudio:languagechange", () => setButtonState(!!pipWindow));
})();
