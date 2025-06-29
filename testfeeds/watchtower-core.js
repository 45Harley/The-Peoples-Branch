const feedSources = {
  npr: "https://feeds.npr.org/1004/rss.xml",
  guardian: "https://www.theguardian.com/world/rss",
  ap: "https://apnews.com/apf-intlnews?format=RSS",
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
      const echo = {
        title: item.title,
        description: item.description,
        origin: key.toUpperCase(),
        evaluated: {
          degree: 2,
          tone: "curiosity",
          zone: "summit",
          markers: ["signal"]
        }
      };
      logEcho(echo);
    });
  } catch (err) {
    console.error("Feed error:", err);
    display.innerHTML = "🚫 Failed to fetch feed.";
  }
}

function saveEchoes() {
  if (!window.inMemoryLog || window.inMemoryLog.length === 0) {
    alert("No echoes to save.");
    return;
  }

  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `log-${dateStr}.json`;
  const json = JSON.stringify(window.inMemoryLog, null, 2);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

window.loadFeed = loadFeed;
window.saveEchoes = saveEchoes;
