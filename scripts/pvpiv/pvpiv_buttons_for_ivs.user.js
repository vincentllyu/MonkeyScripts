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
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const COLORS = ['#ff4d4d', '#4d79ff', '#ffd633'];
    const TEXT_COLORS = ['white', 'white', 'black'];

    function createButton(select, option, color, textColor, container) {
        let button = document.createElement('button');
        button.textContent = option.textContent;
        button.value = option.value;

        Object.assign(button.style, {
            padding: '4px 8px',
            border: `1px solid ${color}`,
            borderRadius: '4px',
            background: 'white',
            color: color,
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease-in-out',
            flexShrink: '0'
        });

        button.onmouseover = () => {
            button.style.background = color;
            button.style.color = textColor;
        };

        button.onmouseout = () => {
            button.style.background = 'white';
            button.style.color = color;
        };

        button.onclick = () => {
            select.value = button.value;
            select.dispatchEvent(new Event('input', { bubbles: true }));

            Array.from(container.children).forEach(btn => {
                if (btn.tagName === 'BUTTON') {
                    btn.style.background = 'white';
                    btn.style.color = color;
                }
            });

            button.style.background = color;
            button.style.color = textColor;
        };

        container.appendChild(button);
    }

    function convertSelectToButtonSelect(select, groupIndex) {
        if (!select || select.dataset.converted) return;

        let container = document.createElement('div');
        Object.assign(container.style, {
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            padding: '5px'
        });

        let color = COLORS[groupIndex % 3];
        let textColor = TEXT_COLORS[groupIndex % 3];

        Array.from(select.options).forEach(option => {
            if (option.textContent.trim()) {
                createButton(select, option, color, textColor, container);
            }
        });

        // Move the original select inside the container
        select.parentNode.insertBefore(container, select);
        container.appendChild(select); // Append the select inside the container

        // Mark it as converted to avoid duplicate processing
        select.dataset.converted = "true";
    }

    function processTable() {
        let table = document.getElementById('inputTable');
        if (!table) return;

        let tbody = table.querySelector('tbody');
        if (!tbody) return;

        Array.from(tbody.rows).forEach((row, rowIndex) => {
            row.querySelectorAll('select').forEach((select, index) => {
                convertSelectToButtonSelect(select, index);
            });
        });
    }

    function observeTableChanges() {
        let table = document.getElementById('inputTable');
        if (!table) return;

        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.tagName === 'TR') {
                        console.log("New row added! Processing...");
                        node.querySelectorAll('select').forEach((select, index) => {
                            convertSelectToButtonSelect(select, index);
                        });
                    }
                });
            });
        });

        observer.observe(table.querySelector('tbody'), { childList: true });
    }

    // Initial processing on page load
    window.addEventListener('load', () => {
        processTable();
        observeTableChanges();
    });

})();
