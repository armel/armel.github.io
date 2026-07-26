/* UV Studio shell: navigation, route persistence, branding, and serial ownership. */
(function () {
    const ROUTE_STORAGE_KEY = "uvstudio.activeSection";
    const items = Array.from(document.querySelectorAll(".nav-item[data-route]"));
    const sectionName = document.getElementById("sectionName");
    const serialStatus = document.getElementById("studioSerialStatus");
    const serialStatusText = document.getElementById("studioSerialText");
    const versionLabel = document.getElementById("studioVersion");
    const aboutVersion = document.getElementById("aboutVersion");
    const paneViewer = document.getElementById("pane-viewer");
    const paneTools = document.getElementById("pane-tools");
    const paneAbout = document.getElementById("pane-about");
    const viewLive = document.getElementById("view-live");
    const viewRflog = document.getElementById("view-rflog");
    const toolViews = Array.from(document.querySelectorAll("#pane-tools .tool-view"));
    const stage = document.querySelector(".stage");
    const version = window.UVSTUDIO_VERSION || "dev";
    const serialController = window.UVStudioSerial;
    const preferences = window.UVStudioPreferences;
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
        "export-rf-log": "studio_operation_export_rf_log"
    };

    function translate(key) {
        return window.uvStudioI18n ? window.uvStudioI18n.t(key) : key;
    }

    function renderSerialStatus(snapshot) {
        if (!serialStatus || !serialStatusText) return;
        lastSerialSnapshot = snapshot || lastSerialSnapshot;
        const operation = lastSerialSnapshot.operation;
        let key;

        if (operation) {
            key = operationTranslationKeys[operation.name] || "studio_operation_active";
        } else if (lastSerialSnapshot.state === "connected") {
            key = lastSerialSnapshot.owner === "viewer"
                ? "studio_serial_connected_viewer"
                : lastSerialSnapshot.owner === "tools"
                    ? "studio_serial_connected_tools"
                    : "studio_serial_connected";
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

    function findRoute(route) {
        return route ? items.find(item => item.dataset.route === route) : null;
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

    async function activate(item, options) {
        if (!item) return;
        const settings = Object.assign({ updateHash: true }, options);
        const app = item.dataset.app;
        const toolView = item.dataset.toolView;
        const view = item.dataset.view;

        applyBranding();
        if (item !== currentItem && serialController?.isNavigationBlocked()) {
            if (currentItem) replaceHash(currentItem.dataset.route);
            return;
        }
        if (serialController) {
            const nextOwner = app === "viewer" || app === "tools" ? app : null;
            try {
                await serialController.releaseFor(nextOwner);
            } catch (error) {
                console.warn("Serial release failed during navigation:", error);
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
            viewLive.classList.toggle("active", viewerMode === "live");
            viewRflog.classList.toggle("active", viewerMode === "rflog");
        } else if (app === "tools" && toolView) {
            toolViews.forEach(panel => {
                const active = panel.id === `${toolView}-content`;
                panel.classList.toggle("active", active);
                panel.hidden = !active;
            });
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

        const route = item.dataset.route;
        currentItem = item;
        rememberRoute(route);
        if (settings.updateHash) replaceHash(route);
    }

    items.forEach(item => item.addEventListener("click", () => { void activate(item); }));

    window.addEventListener("uvstudio:serialstatechange", event => {
        renderSerialStatus(event.detail);
        const blocked = Boolean(event.detail?.operation);
        items.forEach(item => {
            item.disabled = blocked && item !== currentItem;
            if (item.disabled) item.setAttribute("aria-disabled", "true");
            else item.removeAttribute("aria-disabled");
        });
    });

    window.addEventListener("uvstudio:languagechange", () => {
        renderSerialStatus(lastSerialSnapshot);
    });

    window.addEventListener("hashchange", () => {
        const item = findRoute(readHashRoute());
        if (item) void activate(item, { updateHash: false });
    });

    const initial = findRoute(readHashRoute())
        || findRoute(readLegacyModeRoute())
        || findRoute(readStoredRoute())
        || items.find(item => item.classList.contains("active"))
        || items[0];

    applyBranding();
    renderSerialStatus(lastSerialSnapshot);
    void activate(initial);
})();
