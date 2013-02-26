/*jslint browser: true, indent: 4 */
/* The Konami code, by Patric Nordmark */
var Konamicode = (function () {
    'use strict';

    var keys = [
            38, // Up
            38, // Up
            40, // Down
            40, // Down
            37, // Left
            39, // Right
            37, // Left
            39, // Right
            66, // B
            65  // A
        ],
        success,
        options = {},
        state = {
            current: 0,
            timeoutId: 0
        },
        timeout = function(callback, state) {
            callback.call(this, state);
            state.current = 0;
        },
        listener = function (event) {
            window.clearTimeout(state.timeoutId);

            if (event.keyCode === keys[state.current]) {
                // If a callback for correct key presses is defined, call it.
                if (options.correct) {
                    options.correct.call(this, state);
                }

                // If the last state has been completed
                if (state.current === keys.length - 1) {
                    success.call(this, state);
                } else {
                    state.current += 1;
                }

                if (options.timeout) {
                    state.timeoutId = window.setTimeout(timeout, options.timelimit, options.timeout, state);
                }
            } else if (event.keyCode === keys[1] && state.current === 2) {
                // If for example U U U is pressed it should be treated as U U (which is correct).
                return;
            } else {
                // If a callback for incorrect key presses is defined, call it.
                if (options.incorrect) {
                    options.incorrect.call(this, state);
                }

                state.current = 0;
            }
        },
        initialize = function (callback, opts) {
            success = callback;
            opts = opts || {};
            options = {
                timelimit: opts.timelimit || 1000,
                correct: opts.correct || null,
                incorrect: opts.incorrect || null,
                timeout: opts.timeout || null
            };

            if (window.addEventListener) {
                window.addEventListener("keyup", listener);
            } else if (window.attachEvent) {
                window.attachEvent("onkeyup", listener);
            }

            return {
                remove: function () {
                    if (window.removeEventListener) {
                        window.removeEventListener("keyup", listener);
                    } else if (window.detachEvent) {
                        window.detachEvent("onkeyup", listener);
                    }
                }
            };

        };

    return initialize;
}());
