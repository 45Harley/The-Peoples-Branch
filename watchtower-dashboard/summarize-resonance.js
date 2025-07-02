// summarize-resonance.js
import { getEntries } from './resonance-history.js';

export function summarizeResonance() {
  const entries = getEntries();
  if (entries.length === 0) return "No resonance entries to summarize.";

  const degreeCounts = {};
  const markerCounts = {};
  const sourceCounts = {};

  entries.forEach(entry => {
    entry.degrees_detected.forEach(degree => {
      degreeCounts[degree] = (degreeCounts[degree] || 0) + 1;
    });
    entry.markers.forEach(marker => {
      markerCounts[marker] = (markerCounts[marker] || 0) + 1;
    });
    if (entry.source) {
      sourceCounts[entry.source] = (sourceCounts[entry.source] || 0) + 1;
    }
  });

  const top = (obj, n = 3) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([key, count]) => `${key} (${count})`);

  return `
🧭 Resonance Summary:
📊 Entries analyzed: ${entries.length}
🎓 Top tones: ${top(degreeCounts).join(', ')}
🪶 Top markers: ${top(markerCounts).join(', ')}
📡 Sources: ${top(sourceCounts).join(', ')}
  `.trim();
}
