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
        step = 0,
        lastTime = 0,
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
                window.addEventListener("keyup", keyHandler);
            } else if (window.attachEvent) {
                window.attachEvent("onkeyup", keyHandler);
            }
        },
        keyHandler = function (event) {
            var keyTime = new Date().getTime();
            // If time was to far ago reset step and count 
            // this as an attempt on step 0
            if (keyTime - lastTime > options.timelimit) {
                if (options.timeout) {
                    options.timeout.call(this, step);
                }
                step = lastTime = 0;
            }

            if (event.keyCode === keys[step]) {
                // If a callback for correct key presses is defined, call it.
                if (options.correct) {
                    options.correct.call(this, step);
                }

                // If the last step has been completed
                if (step === keys.length - 1) {
                    success.call(this, step);
                } else {
                    step += 1;
                    lastTime = keyTime;
                }
            } else {
                // If a callback for incorrect key presses is defined, call it.
                if (options.incorrect) {
                    options.incorrect.call(this, step);
                }

                step = lastTime = 0;
            }
        };

    return initialize;
}());
