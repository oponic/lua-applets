// ==UserScript==
// @name         Lua-Applets
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Sends output of Lua application to console for browser integration
// @author       opo
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // init msg
    console.log("lua-applets v0.3.0");
    console.log("Enabled on localhost:9733");
    const url = 'http://localhost:9733/log';
    function checkDaemonStatus() {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('daemon offline');
                }
            })
            .then(logMessages => {
                logMessages.forEach(message => console.log(message));
            })
            .catch(error => {
                console.error('daemon offline');
                alert("lua-applets daemon is offline");
            });
    }
    checkDaemonStatus();
})();
