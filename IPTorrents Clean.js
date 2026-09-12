// ==UserScript==
// @name         IPTorrents Clean
// @description  Adds viewport metadata tag to IPTorrents
// @match        https://iptorrents.com/*
// @author       Evan Purkhiser
// ==/UserScript==

// make mobile friendly
document.head.insertAdjacentHTML(
  "beforeend",
  `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`
);
