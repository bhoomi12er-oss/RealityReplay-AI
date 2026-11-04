# RealityReplay AI

> **Imagine the Change. Track the Reality.**  
> Multimodal Visual Intelligence for Physical Space Transformations.

RealityReplay AI is a visual tracking and spatial audit platform designed to track real-world physical transformations over time from visual evidence. Whether renovating a room, building a deck, landscaping a garden, or retrofitting commercial retail space, RealityReplay AI bridges the gap between planned spatial objectives and ground-truth reality.

---

## Key Features

* **Visual Baseline Ingestion (Day 0):** Upload initial space photos via drag-and-drop or file picker. Images are optimized and compressed in-browser via Canvas and persisted in resilient storage (IndexedDB for high-resolution photo data + LocalStorage for project metadata).
* **Side-by-Side Visual Check-Ins:** Compare Day 0 ground truth against latest check-in photos with field notes and date tracking.
* **Meta Model API Architecture:** Server-side proxy (`/api/analyze-checkin`) ready to query Meta's multimodal models (`https://api.meta.ai/v1/chat/completions`) using dual-image payloads for spatial difference analysis and perspective drift compensation.
* **Strict 4-Category Audit Trajectory:** Evaluates planned milestones into four strict statuses with visual evidence citations and uncertainty factors:
  * `Observed` — Unambiguous, verified visual proof that work is completed.
  * `Partially Observed` — Physical progress visible, but incomplete.
  * `Not Yet Observed` — No visual evidence work has started.
  * `Needs Review` — Camera angle, lighting, or occlusion prevents confident evaluation.
* **Transparent Demo Mode:** When running without an API key, the system activates an explicit Demo Mode with zero fabricated progress percentages, confidence scores, or unsupported visual claims.
* **Zero Client Credential Exposure:** API keys and endpoints reside strictly on the server in `.env`. Credentials are never bundled into client JavaScript.

---

## Project Architecture

```
RealityReplay AI/
├── server/
│   ├── apiHandler.js      # Meta Model API integration & demo fallback logic
│   └── index.js           # Standalone Node.js HTTP server (port 3001)
├── src/
│   ├── components/
│   │   ├── CheckInModal.jsx         # Visual check-in upload & audit review modal
│   │   ├── DashboardView.jsx        # Space gallery & project management view
│   │   ├── HeroSection.jsx          # Interactive spatial transformation demo
│   │   ├── NewProjectModal.jsx      # Day 0 baseline creation modal
│   │   ├── ProjectDetailsModal.jsx  # Space inspection & milestone history modal
│   │   ├── Navbar.jsx, Footer.jsx, etc.
│   ├── utils/
│   │   ├── imageUtils.js            # Canvas image optimization & validation
│   │   └── storageUtils.js          # IndexedDB & LocalStorage persistence
│   ├── App.jsx                      # Main application view coordinator
│   └── main.jsx
├── .env.example                     # Environment configuration template
├── .gitignore                       # Git exclusion rules
├── package.json
└── vite.config.js                   # Vite configuration with integrated dev API middleware
```

---

## Setup & Running Locally

### Prerequisites

* Node.js v20.6.0 or higher (v24 recommended; uses native `fetch` and `.env` loading)
* npm or pnpm

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file to `.env`:

```bash
cp .env.example .env
```

Open `.env` and configure your settings:

```ini
# Meta Model API Base URL (OpenAI-compatible)
META_BASE_URL=https://api.meta.ai/v1

# Meta Model API Bearer Token
# Leave empty to run in transparent Demo Mode
META_API_KEY=

# Vision model identifier
META_MODEL=muse-spark-1.3

# Backend Server Port
PORT=3001
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note:** The Vite dev server includes an integrated API middleware plugin (`vite.config.js`). API endpoints (`/api/health` and `/api/analyze-checkin`) are served directly on port `5173` during development without needing a separate process.

### 4. Optional: Run Standalone Backend Server

To run the backend server independently on port 3001:

```bash
npm run server
```

### 5. Build for Production

```bash
npm run build
```

The production assets will be output to the `dist/` directory.

### 6. Linting

```bash
npm run lint
```

---

## Meta Model API Integration & Demo Mode Limitations

### Live API Readiness
The application is pre-configured for Meta's official multimodal endpoints:
* **Endpoint:** `POST https://api.meta.ai/v1/chat/completions`
* **Supported Models:** `muse-spark-1.3`, `llama-3.2-11b-vision`, `llama-3.2-90b-vision` (or compatible OpenAI-format endpoints such as Groq, Together AI, or OpenRouter).
* **Payload Structure:** Multi-image base64 data URLs passed under the `user` message with strict JSON schema instructions.

### Honest Demo Mode (Current Default)
Because a production Meta API key has not yet been populated in the environment, **RealityReplay AI runs in an honest Demo Mode**:
* **No Fabricated Percentages:** Progress is not artificially inflated; spaces start and remain at `0% Verified` until real AI inference runs.
* **No Invented Measurements:** Camera angle drift is not fabricated; it explicitly states that drift calculation requires active model inference.
* **Unverified Milestones:** Milestones in Demo Mode are marked as `Not Yet Verified` with explicit notice that visual evidence has not been processed.
* **Protected Progress:** Saving a check-in in Demo Mode records the photo to evidence history (`checkInsHistory`) but does not falsely advance project completion.
* **Activating Live Inference:** Adding a valid `META_API_KEY` to `.env` immediately activates live visual audits without requiring code changes.

---

## Security & Git Readiness

* `.env` and `.env.*` files are excluded from Git via `.gitignore`.
* `.env.example` contains placeholders only and no private tokens.
* All external AI API requests are routed through the backend proxy; credentials are never exposed in browser bundles or client network payloads.

---

## License

MIT
