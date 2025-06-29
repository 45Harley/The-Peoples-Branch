echo-test-runner.jsimport { evaluateEcho } from './watchtower-core.js';

const testEchoes = [
  {
    title: "Retaliation Erupts After Border Strike",
    description: "Military leaders vow to retaliate. Civilians flee cities amid fear and fire."
  },
  {
    title: "Community Mourns, Seeks Justice After Tragedy",
    description: "Locals organize vigils and demand reform, expressing both grief and courage."
  },
  {
    title: "In Stillness, They Found the Truth",
    description: "Former enemies embrace. A shared silence dissolves years of pain."
  }
];

async function runTests() {
  console.log("\n🖤 Echo Analyzer Test Run (Dark Mode Friendly)\n");

  for (const entry of testEchoes) {
    const result = await evaluateEcho(entry.title, entry.description);

    console.log("─".repeat(60));
    console.log(`📰  Title: ${entry.title}`);
    console.log(`🧾  Description: ${entry.description}`);
    console.log(`🎭  Tone: ${result.tone}   |  📍 Zone: ${result.zone}`);
    console.log(`🧭  Dominant Degree: ${result.dominant_degree}   |  🎚️ Degree Count: ${result.degree_count}`);
    console.log(`🔎  Matched Markers: ${result.markers.join(', ')}`);
  }

  console.log("\nAll echoes processed. Analyzer listening loud and clear. 🪜🫧");
}

runTests();
