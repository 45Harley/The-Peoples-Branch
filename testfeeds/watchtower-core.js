import fs from 'fs';
import yaml from 'js-yaml';

const feedSelect = document.getElementById('feedDropdown');
const pulseButton = document.getElementById('pulseButton');
const echoLog = document.getElementById('echoLog');

let feeds = []; // populated from YAML
let currentFeed = null;

// Load YAML and populate dropdown
function loadFeeds() {
  try {
    const file = fs.readFileSync('./testfeeds/feeds-source.yaml', 'utf8');
    const data = yaml.load(file);

    feeds = data.feeds;
    feedSelect.innerHTML = ''; // clear old options

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

// Watch for feed selection
feedSelect.addEventListener('change', e => {
  currentFeed = e.target.value;
});

// Pulse button logic
pulseButton.addEventListener('click', () => {
  const selectedFeed = feeds.find(f => f.key === currentFeed);
  if (!selectedFeed) {
    console.warn('No feed selected.');
    return;
  }

  fetch(selectedFeed.url)
    .then(res => res.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'text/xml');
      const items = Array.from(xml.querySelectorAll('item'));

      items.forEach(item => {
        const title = item.querySelector('title')?.textContent || '(No title)';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';

        const entry = {
          title,
          description,
          origin: selectedFeed.key,
          method: 'pulse',
          timestamp: new Date().toISOString(),
          pubDate
        };

        logEcho(entry);
      });
    })
    .catch(err => {
      console.error('Feed fetch failed:', err);
    });
});

// Echo logging (basic Phase 1 version)
function logEcho(entry) {
  const logItem = document.createElement('div');
  logItem.className = 'echo-entry';
  logItem.innerHTML = `
    <h4>${entry.title}</h4>
    <p><em>${entry.origin} | ${entry.pubDate}</em></p>
    <p>${entry.description}</p>
    <hr/>
  `;
  echoLog.prepend(logItem);
}

loadFeeds();
