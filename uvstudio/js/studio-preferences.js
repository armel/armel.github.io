/* UV Studio resilient preference storage.
   Keeps the application usable when localStorage is unavailable on file://
   or disabled by the browser. */
;(function () {
    "use strict";

    const memory = new Map();

    function get(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            if (value !== null) return value;
        } catch (error) {
            /* Fall through to the in-memory session store. */
        }
        return memory.has(key) ? memory.get(key) : fallback;
    }

    function set(key, value) {
        const storedValue = String(value);
        memory.set(key, storedValue);
        try {
            localStorage.setItem(key, storedValue);
            return true;
        } catch (error) {
            return false;
        }
    }

    function remove(key) {
        memory.delete(key);
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            return false;
        }
    }

    window.UVStudioPreferences = Object.freeze({ get, set, remove });
})();
