// testfeeds/watchtower-core.js

const feedSources = {
  npr: "https://feeds.npr.org/1004/rss.xml",
  guardian: "https://www.theguardian.com/world/rss",
  ap: "https://www.apnews.com/apf-intlnews?format=RSS",
  dw: "https://rss.dw.com/rdf/rss-en-world",
  aljazeera: "https://www.aljazeera.com/xml/rss/all.xml"
};

async function loadFeed() {
  const select = document.getElementById("feedSelect");
  const key = select.value;
  const url = feedSources[key];

  const display = document.getElementById("feedDisplay");
  display.innerHTML = "⏳ Loading feed…";

  if (!url) {
    display.innerHTML = "⚠️ Please select a feed.";
    return;
  }

  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

  try {
    const res = await fetch(api);
    const data = await res.json();
    display.innerHTML = "";

    data.items.slice(0, 5).forEach(item => {
      const box = document.createElement("div");
      box.className = "feed-box";
      box.innerHTML = `
        <div class="entry">
          <div class="timestamp">${new Date(item.pubDate).toLocaleString()}</div>
          <strong>${item.title}</strong>
          <p>${item.description}</p>
          <div><a href="${item.link}" target="_blank">🔗 Read more</a></div>
        </div>
      `;
      display.appendChild(box);
    });
  } catch (err) {
    console.error("Feed error:", err);
    display.innerHTML = "🚫 Failed to fetch feed.";
  }
}

function saveEchoes() {
  alert("Save Echoes clicked. You can now export or extend this.");
}

// Expose globally
window.loadFeed = loadFeed;
window.saveEchoes = saveEchoes;
