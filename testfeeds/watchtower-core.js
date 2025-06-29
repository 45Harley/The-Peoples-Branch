let feeds = [];
let currentFeed = null;

const feedSelect = document.getElementById('feedDropdown');
const pulseButton = document.getElementById('pulseButton');
const echoLog = document.getElementById('echoLog');

// Load YAML and populate feed selector
async function loadFeeds() {
  try {
    const res = await fetch('./testfeeds/feeds-source.yaml');
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
  } catch (err) {
    console.error('Failed to load feeds-source.yaml:', err);
  }
}

// On dropdown change
feedSelect.addEventListener('change', (e) => {
  currentFeed = e.target.value;
});

// On pulse
pulseButton.addEventListener('click', async () => {
  const selected = feeds.find(f => f.key === currentFeed);
  if (!selected) return;

  try {
    const res = await fetch(selected.url);
    const xmlText = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'text/xml');
    const items = Array.from(xml.querySelectorAll('item'));

    echoLog.innerHTML = '';

    items.slice(0, 5).forEach(item => {
      const title = item.querySelector('title')?.textContent || '(No title)';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';

      const card = document.createElement('div');
      card.className = 'echo-entry';
      card.innerHTML = `
        <h4>${title}</h4>
        <p><em>${pubDate} | ${selected.label}</em></p>
        <p>${description}</p>
        <a href="${link}" target="_blank">Read more →</a>
      `;
      echoLog.appendChild(card);
    });

  } catch (err) {
    console.error('Pulse failed:', err);
    echoLog.innerHTML = `<p><em>Unable to fetch feed: ${selected.label}</em></p>`;
  }
});

loadFeeds();
