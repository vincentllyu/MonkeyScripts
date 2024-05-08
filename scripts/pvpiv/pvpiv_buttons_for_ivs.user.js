// ==UserScript==
// @name         pvpiv buttons for iv selection
// @namespace    https://github.com/vincentllyu
// @version      1.0
// @description  transform select module to single option buttons
// @author       vincentllyu
// @match        https://pvpivs.com/*
// @icon         https://en.m.wikipedia.org/wiki/File:Pok%C3%A9_Ball_icon.svg
// @updateURL    https://github.com/vincentllyu/MonkeyScripts/raw/main/scripts/pvpiv/pvpiv_buttons_for_ivs.user.js
// @installURL   https://github.com/vincentllyu/MonkeyScripts/raw/main/scripts/pvpiv/pvpiv_buttons_for_ivs.user.js
// @downloadURL  https://github.com/vincentllyu/MonkeyScripts/raw/main/scripts/pvpiv/pvpiv_buttons_for_ivs.user.js
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Function to convert select module to button select
    function convertSelectToButtonSelect(selectId) {
        // Get select element
        var select = document.getElementById(selectId);
        if (!select) return;

        // Hide select
        select.style.display = 'hidden';

        // Create button select for each option
        var options = select.getElementsByTagName('option');
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var buttonSelect = document.createElement('button');
            buttonSelect.textContent = option.textContent;
            buttonSelect.value = option.value;
            buttonSelect.onclick = function() {
                select.value = this.value; // Set select value
                // Trigger change event
                var event = new Event('change', { bubbles: true });
                select.dispatchEvent(event);
                option.onclick;
            };
            // Insert button select before the original select element
            select.parentNode.insertBefore(buttonSelect, select);
        }
    }

    // Call the function with your select ID
    // Replace 'selectId' with your actual ID
    convertSelectToButtonSelect('aIV[0]');
    convertSelectToButtonSelect('dIV[0]');
    convertSelectToButtonSelect('sIV[0]');

})();