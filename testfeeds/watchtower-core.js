// testfeeds/watchtower-core.js

function loadFeed() {
  const display = document.getElementById("feedDisplay");
  const box = document.createElement("div");
  box.className = "feed-box";
  box.innerHTML = `<div class="entry">
    <strong>Echo Pulse Triggered</strong><br>
    <div class="timestamp">${new Date().toISOString()}</div>
    <div>This is a placeholder echo from loadFeed().</div>
  </div>`;
  display.prepend(box);
}

function saveEchoes() {
  alert("saveEchoes() triggered. This is a placeholder function.");
}

// Expose globally
window.loadFeed = loadFeed;
window.saveEchoes = saveEchoes;
