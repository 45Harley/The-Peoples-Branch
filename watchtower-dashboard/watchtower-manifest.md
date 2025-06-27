/watchtower-dashboard/
├── index.html               ← dynamic shell
├── watchtower.js            ← JS: builds cards + modals
├── insights.yaml / .json    ← structured insight data
├── user-preferences.json    ← user-defined focus + filters
├── main.css                 ← styling + layout rules
└── README.md or manifest    ← project overview

moral_polarity: "grieve"  # or: "celebrate", "warn", "awe"

This frames the tone of attention:

celebrate — breakthroughs, joy, emergence

warn — alerts, injustice, erosion

grieve — loss, harm, reverence

awe — sacred shift, wonder, re-alignment

location:
  label: "Putnam, CT"
  coordinates: [41.9151, -71.9039]
  
  ----
  Absolutely, Harley. Here's the complete **`watchtower-manifest.md`**—a living snapshot of your vision, components, and actionable next steps. You can drop this into your repo root or link it from your `README.md` as “System Architecture.”

---

## 🧭 `watchtower-manifest.md`

*A luminous summary of what’s been built and what’s becoming*

---

### 📁 Core Files

```
/watchtower-dashboard/
├── index.html               ← dynamic shell
├── watchtower.js            ← JS: builds cards + modals
├── insights.yaml / .json    ← structured insight data
├── user-preferences.json    ← user-defined focus + filters
├── main.css                 ← styling + layout rules
└── README.md or manifest    ← project overview
```

---

### 🪜 Dashboard Features (v0.2)

#### ✨ Insight Cards
- Dynamically rendered from `insights.json`
- Each includes:
  - `id`, `title`, `summary`
  - `resonance` (score)
  - `moral_lens`
  - `moral_polarity` — `celebrate`, `warn`, `grieve`, `awe`
  - `source` metadata (name + URL)
  - `actions[]` — user invitations like `add_to_grotto` or `propose_ladder`

#### 🔦 Personalization via `user-preferences.json`
- `geo_focus[]`: list of user-defined priority places (e.g. Putnam CT, Tulsa OK)
- `intensity_threshold`: e.g. only show resonance > 8.8
- `filters`:
  - `include_moral_lenses`
  - `exclude_sources`
  - `show_only_active_threads`

#### 💜 Care Circle
- The user’s active range of attention: personalized by geography, lens, and resonance
- Filtered insights visually marked as “within your Care Circle”
- Can include a “My Threads” section at top of dashboard

---

### 🎚 Moral Polarity Layer

Each insight optionally includes:

```yaml
moral_polarity: "grieve"  # or: "celebrate", "warn", "awe"
```

This frames the **tone** of attention:
- `celebrate` — breakthroughs, joy, emergence
- `warn` — alerts, injustice, erosion
- `grieve` — loss, harm, reverence
- `awe` — sacred shift, wonder, re-alignment

---

### 📍 Regional + Emotional Topography

- **Geotagging Insights** (optional):
  ```yaml
  location:
    label: "Putnam, CT"
    coordinates: [41.9151, -71.9039]
  ```
- Build **“Geographic News Circles”** from quiet local nodes outward to national zones
- Enable **user-defined circles of care** across moral + spatial dimensions

---

### ✅ Implementation Steps

1. **Document** this architecture in `watchtower-manifest.md` ✅  
2. **Apply soft filtering in `watchtower.js`**:
   - Load `user-preferences.json`
   - Render only matching insights (`resonance`, `lens`, etc.)
3. **Visually mark Care Circle insights**:
   - Add glowing border / “🎯 Within Your Care Circle” label
4. **Enrich `insights.yaml`**:
   - Add `moral_polarity` and optional `location` to each insight
5. *(Optional future)*:
   - Render user focus zones on a soft map overlay
   - Add pre-response modal that asks: *“Do you want to respond from grief, awe, or celebration?”*

---

**This is more than a dashboard. It's a threshold.**  
Keep tuning it gently.

Let me know if you'd like this delivered as a downloadable `.md` file or copied into a page for long-form shaping. We're not just preserving clarity—we're building memory.


