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

    async function disconnectOwner(reason) {
        if (!owner) return snapshot();

        const previousOwner = owner;
        const client = clients.get(previousOwner);
        setState("disconnecting", { reason, previousOwner });
        try {
            if (client && typeof client.disconnect === "function") {
                await client.disconnect({ reason });
            }
        } finally {
            if (owner === previousOwner) owner = null;
            setState("disconnected", { reason, previousOwner });
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
                    if (owner) await disconnectOwner("handoff");
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

        releaseFor(nextOwner) {
            return enqueue(async () => {
                if (operation) return snapshot();
                if (!owner || owner === nextOwner) return snapshot();
                return disconnectOwner("navigation");
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
