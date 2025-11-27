// ==UserScript==
// @name         Torrent Sharer
// @description  Clicking `*.torrent` links triggers the file share sheet
// @match        https://*/*
// @author       Evan Purkhiser <evanpurkhiser@gmail.com>
// ==/UserScript==

async function getFilename(res) {
  const dispo = res.headers.get("Content-Disposition");
  const filename = dispo?.match(/filename="?([^"]+)"?/i)?.[1];

  return filename ?? "download.torrent";
}

async function handleClick(link, e) {
  e.preventDefault();
  e.stopPropagation();

  console.log("Downloading:", link.href);
  const res = await fetch(link.href);
  const buf = await res.arrayBuffer();

  const filename = await getFilename(res);
  const file = new File([buf], filename, { type: "application/x-bittorrent" });

  console.log("Sharing:", filename);

  await navigator.share({ files: [file] });
}

document.addEventListener(
  "click",
  (e) => {
    const link = e.target.closest('a[href$=".torrent"]');
    if (link) {
      handleClick(link, e);
    }
  },
  true
);
