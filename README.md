# Acdyon Ingest — Resilient Web Ingestion Landing Page

A premium, developer-first landing page designed for **Acdyon Ingest**: a self-healing web scraping and data extraction engine engineered to bypass sophisticated anti-bot detectors, rate-limiting, and structural markup changes.

Built as part of the **Acdyon Technologies Frontend Challenge: "Build It Like You Mean It"** (Part 2 — The Premium Home Page).

---

## 🚀 Live Links

* **Live Deployment:** [https://ishurao.github.io/ACDYON/](https://ishurao.github.io/ACDYON/)
* **GitHub Repository:** [https://github.com/ISHURAO/ACDYON](https://github.com/ISHURAO/ACDYON)
* **Project PDF Showcase:** [Acdyon_Ingest_Showcase.pdf](./Acdyon_Ingest_Showcase.pdf)

---

## ✨ Features Built

1. **Self-Healing Selector Logs Console:**
   * A simulated background extraction process that illustrates TLS fingerprinting, IP rotation, and dynamic selector healing when CSS markup shifts.

2. **Live Stealth Fingerprint Display:**
   * A second console tab rendering a real-time updating browser fingerprint profile (Canvas Hash, WebGL Renderer, timezone, active residential IP, and JA3 TLS cipher strings).

3. **Interactive API Sandbox:**
   * A playground where developers can enter simulated endpoint URLs, trace proxy routing, watch bot-challenge mitigations animate, and export/download the output JSON schema directly.

4. **Premium Responsive Aesthetics:**
   * Styled with modern HSL CSS variables, glassmorphic layout overlays, hover spotlights, and fluid scaling supporting desktop (**1440px**) down to mobile viewports (**390px**).

5. **Secret Developer Console (Easter Egg):**
   * Can be triggered by clicking the logo 5 times, typing the classic **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → b a`), or hitting the tilde/backtick key (`` ` ``). It runs a retro CRT shell that supports commands like `system-diagnose`, `hack`, and `decisions`.

---

## 🛠️ Architecture & Tech Stack

This project was built from scratch without bulky frontend frameworks to guarantee a **100/100 Lighthouse performance score** and absolute control over rendering and micro-interactions:
* **HTML5:** Semantic document tags optimized for SEO.
* **CSS3:** Custom properties for theme toggling (Light/Dark mode), Flexbox, CSS Grid, and GPU-accelerated transition keyframes.
* **ES6 JavaScript:** Pure vanilla scripts handling DOM states, interactive promise chains, clipboard operations, file download generation, and event listeners.

---

## 💻 Local Preview

To run the landing page locally on your machine:

1. Clone this repository:
   ```bash
   git clone https://github.com/ISHURAO/ACDYON.git
   cd ACDYON
   ```

2. Start a simple static web server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (alternative)
   npx serve .
   ```

3. Open your browser and navigate to:
   👉 **[http://localhost:8000](http://localhost:8000)**

---

## 📄 Documentation

* **[DECISIONS.md](./DECISIONS.md):** Outlines the ingestion strategy decisions, layout trade-offs under the time limit, and AI tool utilization.
