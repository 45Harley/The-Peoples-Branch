function summarizeLedger(log) {
  if (!log || log.length === 0) return "🌀 No echoes recorded.";

  const zones = {}, tones = {}, markers = {};

  log.forEach(entry => {
    const z = entry.evaluated?.zone || "unknown";
    const t = entry.evaluated?.tone || "neutral";
    const m = entry.evaluated?.markers || [];

    zones[z] = (zones[z] || 0) + 1;
    tones[t] = (tones[t] || 0) + 1;
    m.forEach(marker => {
      markers[marker] = (markers[marker] || 0) + 1;
    });
  });

  const top = (map) =>
    Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(e => e[0])[0];

  const zone = top(zones);
  const tone = top(tones);
  const marker = top(markers);

  return `🧭 Zone: ${zone} · 🎭 Tone: ${tone} · 🎯 Marker: ${marker} (top echo out of ${log.length})`;
}

window.summarizeLedger = summarizeLedger;
