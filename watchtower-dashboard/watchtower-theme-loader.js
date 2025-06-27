// 📦 Parses YAML in the browser
import yaml from 'https://cdn.skypack.dev/js-yaml@4.1.0';

export async function loadTheme(themeName) {
  const jsonURL = `/The-Peoples-Branch/watchtower-dashboard/data/${themeName}.json`;
  const yamlURL = `/The-Peoples-Branch/watchtower-dashboard/themes/${themeName}.yaml`;

  try {
    // Try loading JSON first
    const jsonRes = await fetch(jsonURL);
    if (jsonRes.ok) {
      return await jsonRes.json();
    }

    // Fall back to YAML
    const yamlRes = await fetch(yamlURL);
    if (!yamlRes.ok) throw new Error('Theme not found.');
    const rawYAML = await yamlRes.text();
    const parsedYAML = yaml.load(rawYAML);
    return parsedYAML;
  } catch (err) {
    console.error(`Failed to load theme "${themeName}":`, err.message);
    return null;
  }
}
