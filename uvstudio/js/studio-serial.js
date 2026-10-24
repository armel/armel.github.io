/* UV Studio serial ownership controller.
   Coordinates access without taking protocol-specific readers or writers
   away from K5Viewer and UVTools2. */
;(function () {
    "use strict";

    const VALID_STATES = new Set([
        "disconnected",
        "connecting",
        "connected",
        "reconnecting",
        "disconnecting"
    ]);
    const clients = new Map();
    let owner = null;
    let state = "disconnected";
    let operation = null;
    let reusablePort = null;
    let operationSequence = 0;
    let queue = Promise.resolve();

    function snapshot() {
        const activeOperation = operation
            ? Object.freeze({
                owner: operation.owner,
                name: operation.name,
                critical: operation.critical
            })
            : null;
        return Object.freeze({ owner, state, operation: activeOperation });
    }

    function publish(meta) {
        const detail = Object.assign({}, snapshot(), meta);
        if (typeof document !== "undefined" && document.documentElement) {
            document.documentElement.dataset.serialOwner = owner || "none";
            document.documentElement.dataset.serialState = state;
        }
        window.dispatchEvent(new CustomEvent("uvstudio:serialstatechange", { detail }));
    }

    function setState(nextState, meta) {
        if (!VALID_STATES.has(nextState)) {
            throw new Error(`Invalid serial state: ${nextState}`);
        }
        state = nextState;
        publish(meta);
    }

    function enqueue(task) {
        const result = queue.then(task, task);
        queue = result.catch(() => undefined);
        return result;
    }

    async function closeResources(resources) {
        let closeError = null;
        const handles = resources || {};
        if (handles.reader) {
            try { await handles.reader.cancel(); } catch (error) { closeError ||= error; }
            try { handles.reader.releaseLock(); } catch (error) { closeError ||= error; }
        }
        if (handles.writer) {
            try { await handles.writer.close(); } catch (error) { closeError ||= error; }
            try { handles.writer.releaseLock(); } catch (error) { closeError ||= error; }
        }
        if (handles.port) {
            try { await handles.port.close(); } catch (error) { closeError ||= error; }
        }
        return closeError;
    }

    function portMatchesInfo(port, expectedInfo) {
        if (!port || !expectedInfo || typeof port.getInfo !== "function") return false;
        const info = port.getInfo();
        return info.usbVendorId === expectedInfo.usbVendorId &&
            info.usbProductId === expectedInfo.usbProductId;
    }

    function createReconnectManager(options) {
        const settings = options || {};
        const retryDelayMs = Math.max(0, Number(settings.retryDelayMs) || 500);
        let active = false;
        let attempting = false;
        let timer = null;
        let expectedInfo = null;
        let generation = 0;

        function notifyStateChange() {
            if (typeof settings.onStateChange === "function") settings.onStateChange();
        }

        function matches(port) {
            return portMatchesInfo(port, expectedInfo);
        }

        function schedule() {
            if (!active || timer || typeof navigator === "undefined" || !navigator.serial) return;
            timer = setTimeout(async () => {
                timer = null;
                if (!active) return;
                try {
                    const ports = await navigator.serial.getPorts();
                    for (const candidate of ports.filter(matches)) {
                        if (await tryPort(candidate)) break;
                    }
                } catch (error) {
                    if (typeof settings.onError === "function") settings.onError(error);
                }
                if (active) schedule();
            }, retryDelayMs);
        }

        async function tryPort(candidate) {
            if (!active || attempting || !matches(candidate)) return false;
            const attemptGeneration = generation;
            attempting = true;
            notifyStateChange();
            try {
                await new Promise(resolve => setTimeout(resolve, retryDelayMs));
                if (!active || generation !== attemptGeneration || !matches(candidate) ||
                    (typeof settings.canAttempt === "function" && !settings.canAttempt())) {
                    return false;
                }
                if (typeof settings.reconnect !== "function" ||
                    await settings.reconnect(candidate) !== true) return false;
                active = false;
                clearTimeout(timer);
                timer = null;
                return true;
            } catch (error) {
                if (typeof settings.onError === "function") settings.onError(error);
                return false;
            } finally {
                attempting = false;
                notifyStateChange();
            }
        }

        function start(portInfo) {
            if (!portInfo) return false;
            expectedInfo = Object.assign({}, portInfo);
            generation++;
            active = true;
            notifyStateChange();
            schedule();
            return true;
        }

        function stop(stopOptions) {
            active = false;
            generation++;
            clearTimeout(timer);
            timer = null;
            if (stopOptions && stopOptions.forgetPortInfo) expectedInfo = null;
            notifyStateChange();
        }

        if (typeof navigator !== "undefined" && navigator.serial) {
            navigator.serial.addEventListener("connect", event => {
                void tryPort(event.target);
            });
        }

        return Object.freeze({
            start,
            stop,
            tryPort,
            matches,
            isActive() { return active; },
            isAttempting() { return attempting; }
        });
    }

    async function disconnectOwner(reason, transition) {
        if (!owner) return snapshot();

        const previousOwner = owner;
        const client = clients.get(previousOwner);
        const context = Object.assign({}, transition, { reason, previousOwner });
        if (reason === "user") reusablePort = null;
        setState("disconnecting", context);
        try {
            if (client && typeof client.disconnect === "function") {
                await client.disconnect(context);
            }
        } finally {
            if (owner === previousOwner) owner = null;
            setState("disconnected", context);
        }
        return snapshot();
    }

    function register(id, handlers) {
        if (!id || typeof id !== "string") {
            throw new Error("A serial client id is required.");
        }
        if (clients.has(id)) {
            throw new Error(`Serial client already registered: ${id}`);
        }
        clients.set(id, handlers || {});

        return Object.freeze({
            acquire(meta) {
                return enqueue(async () => {
                    if (operation && operation.owner !== id) return snapshot();
                    if (owner === id) return snapshot();
                    if (owner) await disconnectOwner("handoff", { nextOwner: id });
                    owner = id;
                    setState("connecting", Object.assign({ reason: "acquire" }, meta));
                    return snapshot();
                });
            },

            release(reason) {
                return enqueue(async () => {
                    if (owner !== id) return snapshot();
                    return disconnectOwner(reason || "release");
                });
            },

            setState(nextState, meta) {
                if (owner !== id || state === "disconnecting") return false;
                setState(nextState, meta);
                return true;
            },

            isOwner() {
                return owner === id && state !== "disconnecting";
            },

            getSnapshot: snapshot,

            rememberPort(port) {
                if (owner !== id || !port) return false;
                reusablePort = port;
                return true;
            },

            getReusablePort() {
                return reusablePort;
            },

            forgetPort(port) {
                if (!port || reusablePort === port) reusablePort = null;
            },

            beginOperation(name, options) {
                if (operation) return null;
                const token = Object.freeze({
                    id: ++operationSequence,
                    owner: id
                });
                operation = {
                    token,
                    owner: id,
                    name: name || "serial-operation",
                    critical: Boolean(options && options.critical)
                };
                publish({ reason: "operation-started" });
                return token;
            },

            endOperation(token) {
                if (!operation || operation.token !== token) return false;
                operation = null;
                publish({ reason: "operation-ended" });
                return true;
            }
        });
    }

    const controller = Object.freeze({
        register,
        closeResources,
        createReconnectManager,
        portMatchesInfo,

        releaseFor(nextOwner) {
            return enqueue(async () => {
                if (operation) return snapshot();
                if (!owner || owner === nextOwner) return snapshot();
                return disconnectOwner("navigation", { nextOwner: nextOwner || null });
            });
        },

        releaseCurrent(reason) {
            return enqueue(() => operation
                ? snapshot()
                : disconnectOwner(reason || "release"));
        },

        getSnapshot: snapshot,

        isNavigationBlocked() {
            return Boolean(operation);
        }
    });

    window.UVStudioSerial = controller;
    publish({ reason: "init" });
})();
