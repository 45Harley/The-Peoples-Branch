// watchtower-dashboard/resonance-summary.js

function summarizeLedger(log) {
  if (!Array.isArray(log)) return "🌀 No echoes loaded.";

  const tally = {
    degree: {},
    zone: {},
    tone: {},
    markers: {}
  };

  log.forEach(entry => {
    const e = entry.evaluated || {};
    tally.degree[e.degree] = (tally.degree[e.degree] || 0) + 1;
    tally.zone[e.zone] = (tally.zone[e.zone] || 0) + 1;
    tally.tone[e.tone] = (tally.tone[e.tone] || 0) + 1;
    if (Array.isArray(e.markers)) {
      e.markers.forEach(m => tally.markers[m] = (tally.markers[m] || 0) + 1);
    }
  });

  function topOf(obj) {
    return Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] || "unknown";
  }

  const topZone = topOf(tally.zone);
  const topTone = topOf(tally.tone);
  const topDegree = topOf(tally.degree);
  const markers = Object.entries(tally.markers)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(pair => pair[0]);

  return `🧭 Echoes cluster in the ${topZone}, carrying a tone of ${topTone}, with top markers: ${markers.join(", ")} (degree ${topDegree}).`;
}

// Expose for use in the page
window.summarizeLedger = summarizeLedger;
