// resonance-history.js
let resonanceLog = [];

// ✨ Add a new resonance entry to memory
export function addEntry({ result, sourceMeta = {} }) {
  const entry = {
    timestamp: new Date().toISOString(),
    dominant: result.dominant_degree,
    degrees_detected: result.degrees_detected.map(d => d.degree),
    marker_count: result.markers_all.length,
    markers: result.markers_all,
    source: sourceMeta.label || null,
    origin: sourceMeta.url || null
  };

  resonanceLog.push(entry);
  return entry;
}

// 🧠 Retrieve the current session log (non-destructive)
export function getEntries() {
  return [...resonanceLog];
}

// 💾 Prepare JSON blob for download
export function exportSession() {
  const session = {
    sessionEnded: new Date().toISOString(),
    entries: getEntries()
  };

  const filename = `resonance-session_${session.sessionEnded.replace(/[:.]/g, '-')}.json`;
  const blob = new Blob([JSON.stringify(session, null, 2)], { type: 'application/json' });

  return { blob, filename };
}
