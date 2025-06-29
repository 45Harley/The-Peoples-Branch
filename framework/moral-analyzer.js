import yaml from 'js-yaml';
import fs from 'fs/promises';  // If in browser, swap with fetch-based loader

let moralData = null;

// Load and cache YAML on first use
async function loadMoralLadder() {
  if (moralData) return moralData;
  const file = await fs.readFile('framework/moral-ladder.yaml', 'utf8');
  const parsed = yaml.load(file);
  moralData = parsed.degrees || [];
  return moralData;
}

// Normalize and score
function scoreTextAgainstDegree(text, degree) {
  const content = text.toLowerCase();
  let score = 0;
  const matched = new Set();

  const allMarkers = [
    ...(degree.markers || []),
    ...(degree.feelings?.tone_words || []),
    ...(degree.feelings?.phrase_patterns || [])
  ];

  allMarkers.forEach((marker) => {
    if (content.includes(marker.toLowerCase())) {
      matched.add(marker);
      score += 1;
    }

    // Also check synonyms
    const synonymList = degree.feelings?.synonyms?.[marker];
    if (Array.isArray(synonymList)) {
      synonymList.forEach((syn) => {
        if (content.includes(syn.toLowerCase())) {
          matched.add(syn);
          score += 0.75;
        }
      });
    }
  });

  return {
    degree: degree.degree,
    confidence: Math.min(1, score / 5), // heuristic cap
    markers_matched: Array.from(matched),
    marker_count: matched.size
  };
}

// Master function
export async function analyzeMoralDegrees(text) {
  const ladder = await loadMoralLadder();
  const scores = ladder
    .map((degree) => scoreTextAgainstDegree(text, degree))
    .filter((r) => r.marker_count > 0)
    .sort((a, b) => b.confidence - a.confidence);

  return {
    dominant_degree: scores[0]?.degree ?? null,
    degree_count: scores.length,
    degrees_detected: scores,
    markers_all: scores.flatMap(s => s.markers_matched)
  };
}
