# Engineering Decisions — Acdyon Ingest Landing Page

This document outlines the architectural decisions, trade-offs, and verification workflows chosen during the development of the **Acdyon Ingest** landing page.

---

### 1. Ingestion Strategy Choice
Rather than presenting a simple static overview or traditional dashboard screens, we selected an **interactive sandbox and live pipeline simulator**. 

* **Rejected Alternative:** A typical marketing home page detailing API features in static grids with mock customer testimonials.
* **Rationale:** Acdyon Engineering values candidates who can "think like an engineer." Highlighting the actual mitigation of scraper blocks (such as anti-bot bypass traces, TLS Client Hello spoofing, and structural selector self-healing) directly communicates product value. By giving developers a playground where they can run a mock URL and see the step-by-step trace of how the scraper navigates security layers and structural DOM shifts, we build immediate technical credibility.

### 2. Time-Limit Trade-offs & Next Steps
With a tight submission window, the primary trade-off was choosing a **pure Vanilla HTML5/CSS3/JS stack** over a framework like Next.js or React.

* **Trade-off Made:** Opted out of component frameworks to focus entirely on visual details, smooth transitions, responsive breakpoints (testing specifically at 390px and 1440px), and pure client-side load performance (reducing build pipeline bloat).
* **If Given a Full Week:**
  1. **Deploy a Live Proxy Sandbox Node:** Connect the interactive playground to a real back-end sandbox scraper that runs against low-risk target RSS/XML feeds or a public job page to return actual JSON live.
  2. **Add Custom Component Tests:** Set up visual regression tests (using Playwright or Cypress) to ensure no layout regressions occur across viewport sizes or system theme toggles.
  3. **Build Out Authentication and API Key Provisioning:** Integrate a lightweight JWT-based sign-up flow where users can instantly copy a testing token directly into the terminal code block.

### 3. AI Collaboration & Verification
AI tools were used selectively as a pair-programming resource during development.

* **Where AI Was Used:**
  * Initial scaffolding of layout constraints matching the requested dimensions (390px and 1440px).
  * Structuring the mock JSON response and selector trace lists inside `app.js`.
* **What was Manually Verified/Changed:**
  * **Visual Polish:** Refined gradient styling, hover state intensities, and glassmorphism borders (`backdrop-filter`) to match premium SaaS design patterns.
  * **Mobile Layout Fluidity:** Replaced automated grid layouts with custom CSS flex directions inside mobile media queries (specifically fixing button wrapping and responsive padding for smaller screens below 420px).
  * **Easter Egg Logic:** Manually wrote and verified the Konami code event listener sequence and retro terminal command handling routines.
