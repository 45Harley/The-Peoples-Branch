let feeds = [];
let currentFeed = null;

const feedSelect = document.getElementById('feedDropdown');
const pulseButton = document.getElementById('pulseButton');
const echoLog = document.getElementById('echoLog');

const corsProxy = 'https://api.allorigins.win/raw?url=';

// Load feeds-source.yaml (same directory as HTML)
async function loadFeeds() {
  const yamlPath = './feeds-source.yaml';
  console.log(`🔍 Attempting to fetch: ${yamlPath}`);

  try {
    const res = await fetch(yamlPath);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const text = await res.text();
    const data = jsyaml.load(text);
    feeds = data.feeds || [];

    feedSelect.innerHTML = '';
    feeds.forEach(feed => {
      const option = document.createElement('option');
      option.value = feed.key;
      option.textContent = feed.label;
      feedSelect.appendChild(option);
    });

    currentFeed = feeds[0]?.key;
    console.log(`✅ Loaded ${feeds.length} feeds from ${yamlPath}`);
  } catch (err) {
    console.error('🚨 Failed to load feeds-source.yaml:', err);
    echoLog.innerHTML = `<p><em>Could not load feed sources from <code>${yamlPath}</code>.</em></p>`;
  }
}

// Watch for feed change
feedSelect.addEventListener('change', (e) => {
  currentFeed = e.target.value;
});

// Pulse the selected feed and log entries
pulseButton.addEventListener('click', async () => {
  const selected = feeds.find(f => f.key === currentFeed);
  if (!selected) return;

  const proxiedURL = corsProxy + encodeURIComponent(selected.url);
  console.log(`🌐 Pinging feed via CORS proxy:\n${proxiedURL}`);

  try {
    const res = await fetch(proxiedURL);
    const xmlText = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'text/xml');
    const items = Array.from(xml.querySelectorAll('item'));

    echoLog.innerHTML = '';

    items.slice(0, 5).forEach(item => {
      const title = item.querySelector('title')?.textContent || '(No title)';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '#';

      const card = document.createElement('div');
      card.className = 'echo-entry';
      card.innerHTML = `
        <h4>${title}</h4>
        <p><em>${pubDate} | ${selected.label}</em></p>
        <p>${description}</p>
        <a href="${link}" target="_blank">Read more →</a>
        <hr/>
      `;
      echoLog.appendChild(card);
    });

  } catch (err) {
    console.error('⚠️ Pulse failed for:', selected.label, err);
    echoLog.innerHTML = `<p><em>Unable to fetch: ${selected.label} (via CORS proxy)</em></p>`;
  }
});

loadFeeds();
