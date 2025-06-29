oral-analyzer-browser.jslet moralData = null;

// Fetch and cache YAML
export async function loadMoralLadder() {
  if (moralData) return moralData;

  const response = await fetch('./moral-ladder.yaml');
  const text = await response.text();

  // Simple YAML parser (assumes degrees list only)
  moralData = parseYamlToJSON(text);
  return moralData;
}

// Lightweight YAML-to-JSON parser (only for our structure)
function parseYamlToJSON(text) {
  const lines = text.split('\n');
  const degrees = [];
  let current = null;

  for (let line of lines) {
    if (line.startsWith('  - degree:')) {
      if (current) degrees.push(current);
      current = { degree: parseInt(line.split(':')[1].trim()) };
    } else if (current) {
      const match = line.match(/^\s+(\w+):\s(.*)$/);
      if (match) {
        const [, key, value] = match;
        if (!isNaN(value)) {
          current[key] = parseFloat(value);
        } else {
          current[key] = value.replace(/^"|"$/g, '');
        }
      }
    }
  }

  if (current) degrees.push(current);
  return degrees;
}

export async function analyzeMoralDegrees(text) {
  const ladder = await loadMoralLadder();
  const content = text.toLowerCase();

  const results = ladder.map((deg) => {
    let score = 0;
    const matched = [];

    for (const term of Object.values(deg).filter(v => typeof v === 'string')) {
      if (content.includes(term.toLowerCase())) {
        matched.push(term);
        score += 1;
      }
    }

    return {
      degree: deg.degree,
      confidence: Math.min(1, score / 5),
      markers_matched: matched,
      marker_count: matched.length
    };
  }).filter(r => r.marker_count > 0)
    .sort((a, b) => b.confidence - a.confidence);

  return {
    dominant_degree: results[0]?.degree ?? null,
    degree_count: results.length,
    degrees_detected: results,
    markers_all: results.flatMap(r => r.markers_matched)
  };
}
