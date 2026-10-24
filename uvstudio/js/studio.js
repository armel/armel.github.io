/* UV Studio shell: navigation, route persistence, branding, and serial ownership. */
(function () {
    const ROUTE_STORAGE_KEY = "uvstudio.activeSection";
    const items = Array.from(document.querySelectorAll(".nav-item[data-route]"));
    const sectionName = document.getElementById("sectionName");
    const serialStatus = document.getElementById("studioSerialStatus");
    const serialStatusText = document.getElementById("studioSerialText");
    const serialDisconnect = document.getElementById("studioSerialDisconnect");
    const versionLabel = document.getElementById("studioVersion");
    const aboutVersion = document.getElementById("aboutVersion");
    const paneViewer = document.getElementById("pane-viewer");
    const paneTools = document.getElementById("pane-tools");
    const paneAbout = document.getElementById("pane-about");
    const viewLive = document.getElementById("view-live");
    const viewRflog = document.getElementById("view-rflog");
    const hamburgerBtn = document.getElementById("hamburgerMenu");
    const toolViews = Array.from(document.querySelectorAll("#pane-tools .tool-view"));
    const actionTabs = Array.from(document.querySelectorAll("#pane-tools .action-tab"));
    const editionStateView = document.getElementById("edition-state-content");
    const editionStateTitle = document.getElementById("editionStateTitle");
    const editionStateBody = document.getElementById("editionStateBody");
    const stage = document.querySelector(".stage");
    const version = window.UVSTUDIO_VERSION || "dev";
    const serialController = window.UVStudioSerial;
    const preferences = window.UVStudioPreferences;
    const editionSensitiveRoutes = new Set(["apps", "external-flash", "factory-reset"]);
    let currentItem = null;
    let lastSerialSnapshot = serialController
        ? serialController.getSnapshot()
        : { owner: null, state: "disconnected", operation: null };

    const operationTranslationKeys = {
        "flash-firmware": "studio_operation_flash",
        "dump-calibration": "studio_operation_dump_calibration",
        "restore-calibration": "studio_operation_restore_calibration",
        "upload-logo": "studio_operation_upload_logo",
        "dump-logo": "studio_operation_dump_logo",
        "dump-flash": "studio_operation_dump_flash",
        "restore-flash": "studio_operation_restore_flash",
        "factory-reset": "studio_operation_factory_reset",
        "export-rf-log": "studio_operation_export_rf_log"
    };

    const routeAliases = {
        "dump-calib": { route: "calibration", action: "dump" },
        "restore-calib": { route: "calibration", action: "restore" },
        "upload-logo": { route: "boot-logo", action: "upload" },
        "download-logo": { route: "boot-logo", action: "download" },
        "dump-flash": { route: "external-flash", action: "dump" },
        "restore-flash": { route: "external-flash", action: "restore" }
    };

    function translate(key, ...args) {
        return window.uvStudioI18n ? window.uvStudioI18n.t(key, ...args) : key;
    }

    function renderSerialStatus(snapshot) {
        if (!serialStatus || !serialStatusText) return;
        lastSerialSnapshot = snapshot || lastSerialSnapshot;
        const operation = lastSerialSnapshot.operation;
        let key;

        if (operation) {
            key = operationTranslationKeys[operation.name] || "studio_operation_active";
        } else if (lastSerialSnapshot.state === "connected") {
            key = "studio_serial_connected";   /* one label, whichever space owns the port */
        } else {
            key = `studio_serial_${lastSerialSnapshot.state || "disconnected"}`;
        }

        const label = translate(key);
        serialStatus.dataset.state = lastSerialSnapshot.state || "disconnected";
        serialStatus.dataset.operation = String(Boolean(operation));
        serialStatus.dataset.critical = String(Boolean(operation?.critical));
        serialStatusText.textContent = label;
        serialStatus.setAttribute("aria-label", label);
        serialStatus.title = label;

        /* Offer a global disconnect while a port is held, whichever space owns
           it; hidden during an operation, which releaseCurrent() refuses anyway. */
        if (serialDisconnect) {
            const held = lastSerialSnapshot.state === "connected" ||
                lastSerialSnapshot.state === "reconnecting";
            serialDisconnect.hidden = !held || Boolean(operation);
        }
    }

    function applyNavigationDisabledState() {
        const blocked = Boolean(lastSerialSnapshot?.operation);
        const disconnected = lastSerialSnapshot?.state !== "connected";
        items.forEach(item => {
            const unavailable = item.dataset.capabilityDisabled === "true";
            const editionSensitive = editionSensitiveRoutes.has(item.dataset.route);
            const editionKnown = item.dataset.capabilityKnown === "true";
            const editionPending = editionSensitive && (disconnected || !editionKnown);
            item.classList.toggle("is-edition-disconnected", editionPending);
            item.disabled = unavailable || (blocked && item !== currentItem);
            if (item.disabled) item.setAttribute("aria-disabled", "true");
            else item.removeAttribute("aria-disabled");
        });
        renderEditionContentState();
    }

    function applyBranding() {
        document.title = `UV Studio v${version} by F4HWN`;
        if (versionLabel) versionLabel.textContent = `v${version}`;
        if (aboutVersion) aboutVersion.textContent = `v${version}`;
    }

    function readStoredRoute() {
        return preferences.get(ROUTE_STORAGE_KEY, "");
    }

    function readHashRoute() {
        try { return decodeURIComponent(window.location.hash.slice(1)).trim(); } catch (e) { return ""; }
    }

    function resolveRoute(route) {
        if (!route) return null;
        const alias = routeAliases[route];
        const canonicalRoute = alias ? alias.route : route;
        const item = items.find(candidate => candidate.dataset.route === canonicalRoute);
        return item ? { item, action: alias?.action || null, requestedRoute: route } : null;
    }

    function readLegacyModeRoute() {
        const routes = {
            flash: "flash",
            dump: "dump-calib",
            restore: "restore-calib",
            "rf-log": "export-rf-log",
            "logo-upload": "upload-logo",
            "logo-dump": "download-logo"
        };
        try {
            return routes[new URLSearchParams(window.location.search).get("mode")] || "";
        } catch (error) {
            return "";
        }
    }

    function rememberRoute(route) {
        preferences.set(ROUTE_STORAGE_KEY, route);
    }

    function replaceHash(route) {
        if (!route || readHashRoute() === route) return;
        try {
            history.replaceState(null, "", `#${encodeURIComponent(route)}`);
        } catch (e) {
            window.location.hash = route;
        }
    }

    function activateToolAction(toolView, action) {
        if (!toolView?.classList.contains("action-tool")) return;
        const tabs = Array.from(toolView.querySelectorAll(".action-tab"));
        const panels = Array.from(toolView.querySelectorAll(".action-view"));
        const selected = tabs.find(tab => tab.dataset.action === action)
            || tabs.find(tab => tab.classList.contains("active"))
            || tabs[0];
        if (!selected) return;

        tabs.forEach(tab => {
            const active = tab === selected;
            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", String(active));
            tab.tabIndex = active ? 0 : -1;
        });
        panels.forEach(panel => {
            const active = panel.dataset.actionPanel === selected.dataset.action;
            panel.classList.toggle("active", active);
            panel.hidden = !active;
        });
    }

    function showToolView(toolView, action) {
        toolViews.forEach(panel => {
            const active = panel.id === `${toolView}-content`;
            panel.classList.toggle("active", active);
            panel.hidden = !active;
            if (active) activateToolAction(panel, action);
        });
    }

    function renderEditionContentState() {
        if (!paneTools || !editionStateView) return;

        const sensitive = currentItem?.dataset.app === "tools" &&
            editionSensitiveRoutes.has(currentItem.dataset.route);
        const disconnected = lastSerialSnapshot?.state !== "connected";
        const editionKnown = currentItem?.dataset.capabilityKnown === "true";
        const unavailable = currentItem?.dataset.capabilityDisabled === "true";
        const state = sensitive
            ? ((disconnected || !editionKnown) ? "disconnected" : (unavailable ? "unavailable" : ""))
            : "";

        paneTools.classList.toggle("showing-edition-state", Boolean(state));
        editionStateView.dataset.state = state;

        if (!state) {
            if (sensitive) showToolView(currentItem.dataset.toolView);
            else {
                editionStateView.classList.remove("active");
                editionStateView.hidden = true;
            }
            return;
        }

        showToolView("edition-state");
        if (state === "disconnected") {
            if (editionStateTitle) editionStateTitle.textContent = translate("studio_serial_disconnected");
            if (editionStateBody) editionStateBody.textContent = translate("appManagerConnectHint");
        } else {
            if (editionStateTitle) editionStateTitle.textContent = translate("studio_nav_unavailable_edition");
            if (editionStateBody) editionStateBody.textContent = translate("studio_edition_unavailable_body");
        }
    }

    async function ensureRuntimeSerial(owner) {
        const detail = { owner, promise: null };
        window.dispatchEvent(new CustomEvent("uvstudio:serialrequired", { detail }));
        if (detail.promise && typeof detail.promise.then === "function") {
            try {
                await detail.promise;
            } catch {
                return false;
            }
        }
        const snapshot = serialController?.getSnapshot();
        return snapshot?.owner === owner && snapshot.state === "connected";
    }

    async function activate(item, options) {
        if (!item) return;
        if (item.dataset.capabilityDisabled === "true") {
            if (currentItem) replaceHash(currentItem.dataset.route);
            return;
        }
        const settings = Object.assign({ updateHash: true, ensureSerial: false }, options);
        const app = item.dataset.app;
        const toolView = item.dataset.toolView;
        const view = item.dataset.view;
        const serialOwner = app === "viewer" || app === "tools" ? app : null;
        const isFirmwareFlash = app === "tools" && toolView === "flash";
        const requiresRuntimeSerial = Boolean(serialOwner) && !isFirmwareFlash;

        applyBranding();
        if (item !== currentItem && serialController?.isNavigationBlocked()) {
            if (currentItem) replaceHash(currentItem.dataset.route);
            return;
        }
        if (serialController) {
            try {
                if (isFirmwareFlash) {
                    await serialController.releaseFor(null);
                } else if (requiresRuntimeSerial) {
                    await serialController.releaseFor(serialOwner);
                }
            } catch (error) {
                console.warn("Serial release failed during navigation:", error);
                if (currentItem) replaceHash(currentItem.dataset.route);
                return;
            }
        }
        if (settings.ensureSerial && requiresRuntimeSerial) {
            const connected = await ensureRuntimeSerial(serialOwner);
            if (!connected || item.dataset.capabilityDisabled === "true") {
                if (currentItem) replaceHash(currentItem.dataset.route);
                return;
            }
        }
        items.forEach(candidate => {
            const active = candidate === item;
            candidate.classList.toggle("active", active);
            if (active) candidate.setAttribute("aria-current", "page");
            else candidate.removeAttribute("aria-current");
        });
        paneViewer.classList.toggle("active", app === "viewer");
        paneTools.classList.toggle("active", app === "tools");
        paneAbout.classList.toggle("active", app === "about");

        if (app === "viewer") {
            const viewerMode = view || "live";
            paneViewer.dataset.viewerMode = viewerMode;
            viewLive.classList.toggle("active", viewerMode === "live");
            viewRflog.classList.toggle("active", viewerMode === "rflog");
        } else if (app === "tools" && toolView) {
            showToolView(toolView, settings.action || item.dataset.defaultAction);
        }

        if (app === "tools" && toolView) {
            window.dispatchEvent(new CustomEvent("uvstudio:toolviewchange", {
                detail: { view: toolView }
            }));
        }

        if (sectionName) {
            const sectionKey = item.dataset.sectionI18n;
            if (sectionKey) sectionName.setAttribute("data-i18n", sectionKey);
            const label = item.querySelector(".nav-item-label");
            sectionName.textContent = label ? label.textContent.trim() : (item.dataset.name || "UV Studio");
        }
        if (stage) stage.scrollTop = 0;

        const route = settings.route || item.dataset.route;
        currentItem = item;
        renderEditionContentState();
        rememberRoute(route);
        if (settings.updateHash) replaceHash(route);
    }

    items.forEach(item => item.addEventListener("click", () => {
        void activate(item, { ensureSerial: true });
    }));

    actionTabs.forEach(tab => tab.addEventListener("click", async () => {
        if (serialController?.isNavigationBlocked()) return;
        await ensureRuntimeSerial("tools");
        const toolView = tab.closest(".tool-view");
        activateToolAction(toolView, tab.dataset.action);
        const route = tab.dataset.route;
        if (route) {
            rememberRoute(route);
            replaceHash(route);
        }
    }));

    actionTabs.forEach(tab => tab.addEventListener("keydown", event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        const tabs = Array.from(tab.closest(".action-tabs").querySelectorAll(".action-tab:not(:disabled)"));
        const index = tabs.indexOf(tab);
        if (index < 0 || tabs.length < 2) return;
        event.preventDefault();
        const next = event.key === "Home"
            ? tabs[0]
            : event.key === "End"
                ? tabs[tabs.length - 1]
                : tabs[(index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        next.click();
        next.focus();
    }));

    window.addEventListener("uvstudio:serialstatechange", event => {
        renderSerialStatus(event.detail);
        applyNavigationDisabledState();
        const blocked = Boolean(event.detail?.operation);
        actionTabs.forEach(tab => {
            tab.disabled = blocked && !tab.classList.contains("active");
            if (tab.disabled) tab.setAttribute("aria-disabled", "true");
            else tab.removeAttribute("aria-disabled");
        });
    });

    window.addEventListener("uvstudio:navigationcapabilitieschange", () => {
        applyNavigationDisabledState();
    });

    window.addEventListener("uvstudio:languagechange", () => {
        renderSerialStatus(lastSerialSnapshot);
        renderEditionContentState();
    });

    if (serialDisconnect && serialController) {
        serialDisconnect.addEventListener("click", async () => {
            serialDisconnect.disabled = true;
            try {
                await serialController.releaseCurrent("user");
            } catch (error) {
                console.warn("Serial disconnect failed:", error);
            } finally {
                serialDisconnect.disabled = false;
            }
        });
    }

    window.addEventListener("hashchange", () => {
        const target = resolveRoute(readHashRoute());
        if (target) void activate(target.item, {
            updateHash: false,
            action: target.action,
            route: target.requestedRoute
        });
    });

    hamburgerBtn.addEventListener("click", () => {
        const collapsed = document.body.classList.toggle("sidebar-collapsed");
        hamburgerBtn.setAttribute("aria-expanded", String(!collapsed));
    });

    const initial = resolveRoute(readHashRoute())
        || resolveRoute(readLegacyModeRoute())
        || resolveRoute(readStoredRoute())
        || {
            item: items.find(item => item.classList.contains("active")) || items[0],
            action: null,
            requestedRoute: null
        };

    applyBranding();
    renderSerialStatus(lastSerialSnapshot);
    applyNavigationDisabledState();
    void activate(initial.item, { action: initial.action, route: initial.requestedRoute });

    /* Hidden developer switch: the Konami code (up up down down left right
       left right B A) toggles the catalogs between main and the development
       branch, then reloads. A badge stays on screen while it is on, so a
       development catalog is never mistaken for the published one. */
    (function () {
        if (!preferences || typeof preferences.devCatalog !== "function") return;
        const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
            "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let position = 0;
        const toggle = () => {
            preferences.setDevCatalog(!preferences.devCatalog());
            window.location.reload();
        };
        document.addEventListener("keydown", event => {
            const target = event.target;
            if (target && (target.isContentEditable ||
                /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName || ""))) {
                position = 0;
                return;
            }
            const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
            position = key === sequence[position] ? position + 1
                : (key === sequence[0] ? 1 : 0);
            if (position === sequence.length) toggle();
        });
        if (!preferences.devCatalog()) return;
        const badge = document.createElement("button");
        badge.type = "button";
        badge.textContent = "DEV catalog \u00b7 " + preferences.catalogBranch();
        badge.title = "Catalogs are read from the development branch. Click to go back to main.";
        badge.style.cssText = "position:fixed;right:12px;bottom:12px;z-index:9999;" +
            "padding:6px 10px;border:0;border-radius:6px;background:#c77700;color:#fff;" +
            "font:600 12px/1.2 system-ui,sans-serif;cursor:pointer;";
        badge.addEventListener("click", toggle);
        document.body.appendChild(badge);
    })();
})();
