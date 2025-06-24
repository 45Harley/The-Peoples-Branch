# The People's Branch

_Truth invites participation. This project builds a walkable structure for reflection, voice, and collective memory._

## 🌿 Overview

**The People’s Branch** is a participatory framework rooted in layered metaphor and modular design. This repository currently includes one operational “ladder” cycle focused on truth: five HTML pages that invite reflection, voice selection, and local memory.

Participants walk from **Witness → Exposure → Turning → Reform → Healing**, with a final soft return via **Celebration**.

## 🧗 Ladder Structure (Cycle-01)

- `truth_01_witness.html`
- `truth_02_exposure.html`
- `truth_03_turning.html`
- `truth_04_reform.html`
- `truth_05_healing.html`
- `celebration.html` (return point)

Each page includes:
- A prompt expressed in multiple voices (Plain, Poetic, Analytical, Playful)
- A reflection form (locally stored)
- Navigation between steps
- Embedded banners: **Ladder**, **Rails**, and **Net** metaphors

## 🎨 Styling

All layout and banners are styled via [`main.css`](main.css). Class names follow the system metaphors:
- `.ladder-banner` – placement and guidance
- `.rails-banner` – connection and continuity
- `.net-banner` – return and belonging

## 👥 Participation

User profiles are stored as YAML files in [`/users/`](users/):
- Individual files: `profile-fern.yaml`, `profile-jax.yaml`, etc.
- A shared registry: `profiles.yaml`
- Validator: `validate_profiles.py` (Python-based schema check)

Reflections are currently saved using `localStorage` per browser—intended for preview and testing. Future releases may support persistent or server-side participation.

## 📦 Getting Started

1. Clone this repo locally or visit the live version (via GitHub Pages).
2. Start at `truth_01_witness.html`
3. Explore each voice prompt and submit your own reflection
4. Walk through the ladder rungs → arrive at `celebration.html`
5. Optionally copy your reflection into a YAML profile

## 🔧 Version

This is **Version 0.01** — the first operational walkable ladder.

## 📚 Related Files

- `truth-map.html` — optional node map
- `ladder-manifest.yaml` — ladder index (in progress)
- `language-guide.yaml` — voice + tone alignment
- `roles.yaml`, `schema-registry.yaml` — emerging definitions

---

Want to participate? Walk the ladder. Want to contribute? Fork, suggest, remix.

> _"The truth still waits."_
