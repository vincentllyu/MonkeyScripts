// ==UserScript==
// @name         iv input box shower
// @namespace    https://github.com/vincentllyu
// @version      1.0
// @description  always show button to show iv input box
// @author       vincentllyu
// @match        https://pvpivs.com/*
// @icon         https://en.m.wikipedia.org/wiki/File:Pok%C3%A9_Ball_icon.svg
// @updateURL    https://github.com/vincentllyu/MonkeyScripts/raw/main/scripts//showDisplayIvInputBox/show_display_iv_input_box.user.js
// @installURL   https://github.com/vincentllyu/MonkeyScripts/raw/main/scripts//showDisplayIvInputBox/show_display_iv_input_box.user.js
// @downloadURL  https://github.com/vincentllyu/MonkeyScripts/raw/main/scripts//showDisplayIvInputBox/show_display_iv_input_box.user.js
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function showElement() {
        let element = document.getElementById('IVinputShow');
        if (element) {
            element.style.display = '';
        }
    }

    // Run immediately in case the element is already present
    showElement();

    // Observe DOM changes to catch dynamically loaded elements
    let observer = new MutationObserver(() => showElement());
    observer.observe(document.body, { childList: true, subtree: true });
})();