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

        // Create container for button selects
        var container = document.createElement('div');
        container.classList.add('button-select-container');
        // Apply styles for the container
        container.style.border = '1px solid #ccc';
        container.style.borderRadius = '5px';
        container.style.padding = '10px';
        container.style.display = 'inline-block';

        // Create button select for each option
        var options = select.getElementsByTagName('option');
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            if (option.textContent === '') {
                continue;
            }
            var buttonSelect = document.createElement('button');
            buttonSelect.textContent = option.textContent;
            buttonSelect.value = option.value;
            buttonSelect.onclick = function() {
                select.value = this.value;
                option.onclick;
            };
            // Append button select to container
            container.appendChild(buttonSelect);
        }
        // Insert container before the original select element
        select.parentNode.insertBefore(container, select);
    }

    // Call the function with your select ID
    // Replace 'selectId' with your actual ID
    convertSelectToButtonSelect('aIV[0]');
    convertSelectToButtonSelect('dIV[0]');
    convertSelectToButtonSelect('sIV[0]');

    // Find the table
    var table = document.getElementById('inputTable');
    if (table) {
        // Get the tbody element containing all the rows
        var tbody = table.querySelector('tbody');
        if (tbody) {
            // Iterate over each row of the tbody (excluding the first row)
            for (var i = 1; i < tbody.rows.length; i++) {
                // Convert select elements to button selects in the row
                convertSelectToButtonSelectInTable(`aIV[${i-1}]`);
                convertSelectToButtonSelectInTable(`dIV[${i-1}]`);
                convertSelectToButtonSelectInTable(`sIV[${i-1}]`);
            }
        }
    }

})();