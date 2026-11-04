# RealityReplay AI
### Imagine the Change. Track the Reality.

**From visual promises to evidence-backed progress.**

RealityReplay AI is an AI-powered visual verification platform designed to monitor and audit real-world transformations through visual evidence.

Whether it is renovating a room, transforming a garden, upgrading a retail store, or improving a physical space, every transformation begins with a plan. But one important question often remains unanswered:

**How can we verify that the promised transformation is actually happening?**

Traditional before-and-after comparisons show two different moments. RealityReplay AI aims to go beyond that. It organizes visual evidence over time, connects observations with planned milestones, and helps distinguish visible progress from incomplete or unverified work.

It is not just about seeing what changed. It is about understanding what the available evidence actually proves.

---

## The Problem: The Gap Between Plans and Reality

Physical transformation projects often face a common challenge: tracking actual progress against expected outcomes.

A project owner may have:
- An initial photograph of the space.
- A list of planned improvements.
- Regular progress updates from workers or contractors.
- Photos showing different stages of the transformation.

But collecting photographs does not automatically provide reliable progress verification.

Questions remain:

- Has the planned work actually started?
- Is the visible progress consistent with the milestone?
- Is the transformation complete or only partially visible?
- Are the photographs sufficient to verify the result?
- Does the available evidence justify marking the milestone as completed?

Without a structured verification process, progress reporting can become subjective, inconsistent, and difficult to audit.

## The Solution: Introducing RealityReplay AI

RealityReplay AI creates a structured visual timeline for physical transformations.

Users establish an initial visual baseline, define planned milestones, and submit subsequent check-in photographs as the project evolves.

The platform organizes these records into a visual evidence history and is designed to evaluate milestone progress using multimodal AI.

Its core principle is simple:

**No visual evidence, no verified progress.**

Rather than assuming that work has been completed, the system is designed to distinguish between confirmed observations, partial progress, missing evidence, and situations requiring human review.

---

## How RealityReplay AI Works

### 01. Capture the Starting Reality — Day 0

Every project begins with a baseline.

Users upload photographs of the existing physical space using drag-and-drop or a file picker.

The application optimizes images in the browser and stores project information separately from high-resolution image data.

This creates the visual reference against which future updates can be compared.

### 02. Define the Transformation Goals

Users describe the improvements they expect to see.

Examples:
- Repaint the walls.
- Install new flooring.
- Add garden plants.
- Replace old furniture.
- Upgrade retail display shelves.

These goals become milestones that provide context for subsequent progress reviews.

### 03. Submit Visual Check-Ins

As the transformation progresses, users upload new photographs.

Each check-in can include:
- Updated photographs.
- Submission date.
- Field notes.
- Project-specific observations.

The application maintains a chronological evidence history so users can revisit earlier stages.

### 04. Compare Evidence Against Planned Milestones

The system is designed to compare baseline and follow-up visual evidence against the intended transformation.

Its multimodal AI architecture supports sending multiple images and milestone context to a backend analysis service.

The goal is to evaluate visible changes while accounting for limitations such as lighting, camera perspective, occlusion, and incomplete visual information.

### 05. Generate a Transparent Audit Status

Every milestone is organized into one of four audit categories.

| Status | Meaning |
|---|---|
| Observed | Clear visual evidence supports completion. |
| Partially Observed | Some expected progress is visible, but the milestone appears incomplete. |
| Not Yet Observed | The submitted evidence does not show the expected work. |
| Needs Review | The available images are insufficient for a reliable conclusion. |

These categories are designed to avoid treating assumptions as verified progress.

---

## What Makes RealityReplay AI Different?

### 1. Beyond Before-and-After Comparisons

A conventional photo comparison focuses on visual differences.

RealityReplay AI focuses on the relationship between:
- What existed initially.
- What was planned.
- What is visible now.
- What remains unverified.

The objective is to make progress tracking more meaningful than simply displaying two photographs.

### 2. Evidence-First Verification

The platform is designed around a simple principle: progress claims should be supported by visual evidence.

A milestone should not automatically become completed simply because a new photograph has been uploaded.

### 3. Four-State Audit Intelligence

Instead of reducing every result to a percentage, RealityReplay AI uses four distinct status categories.

This allows uncertainty and partial completion to remain visible rather than hiding them behind a single progress score.

### 4. Honest Uncertainty Handling

Real-world photographs are not always perfect.

Different camera angles, lighting conditions, obstructions, and image quality can make comparisons difficult.

RealityReplay AI includes a Needs Review category to acknowledge when the evidence is insufficient.

### 5. A Persistent Visual History

Project metadata and image evidence are managed separately.

The application uses LocalStorage for project metadata and IndexedDB for high-resolution image data, supporting persistent project records in the browser.

### 6. Transparent Demo Mode

When no API key is configured, the application operates in Demo Mode.

In this mode:
- No fabricated AI analysis is presented as real.
- No unsupported confidence scores are generated.
- No artificial progress percentages are displayed.
- Check-ins can be stored as evidence history.
- Milestones remain unverified until actual analysis is available.

This keeps the distinction between recorded evidence and AI-verified results clear.

---

## Real-World Applications

RealityReplay AI is designed around a flexible concept that can be applied to multiple physical environments.

### Home Renovation

Track planned improvements such as painting, flooring, furniture installation, and interior upgrades.

### Construction and Infrastructure

Organize visual updates from different project stages and compare them against planned milestones.

### Garden and Landscape Transformation

Monitor visible changes in garden layouts, plantation, landscaping, and outdoor improvements.

### Retail and Commercial Spaces

Track store renovations, shelf installations, display upgrades, and other physical changes.

### Property Maintenance

Maintain a visual record of maintenance activities and review whether expected changes are supported by submitted photographs.

*These are intended application areas; each use case may require additional validation and domain-specific workflows.*

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Styling | CSS |
| Backend | Node.js |
| API Integration | REST API |
| AI Architecture | Meta Model API-compatible multimodal interface |
| Image Processing | Browser Canvas API |
| Image Storage | IndexedDB |
| Project Metadata | LocalStorage |
| Version Control | Git and GitHub |

---

## System Architecture

```text
                 USER
                   |
                   v
          React Web Application
                   |
          +--------+--------+
          |                 |
          v                 v
     Project Data       Visual Evidence
     LocalStorage        IndexedDB
          |                 |
          +--------+--------+
                   |
                   v
           Check-In Workflow
                   |
                   v
          Backend API Layer
                   |
                   v
        /api/analyze-checkin
                   |
           +-------+-------+
           |               |
           v               v
      Demo Mode       Meta Model API
           |               |
           v               v
     Unverified       Visual Analysis
       Evidence       (when configured
                        and validated)
           |               |
           +-------+-------+
                   |
                   v
          Milestone Audit Review
                   |
                   v
       Observed / Partially Observed
       Not Yet Observed / Needs Review
```

---

## Project Structure

```text
RealityReplay-AI/
│
├── public/
│
├── server/
│   ├── apiHandler.js
│   └── index.js
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AboutModal.jsx
│   │   ├── CheckInModal.jsx
│   │   ├── DashboardView.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── HowItWorksSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── NewProjectModal.jsx
│   │   ├── ProjectDetailsModal.jsx
│   │   └── Toast.jsx
│   │
│   ├── utils/
│   │   ├── imageUtils.js
│   │   └── storageUtils.js
│   │
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js v20.6.0 or higher.
- npm package manager.
- A modern web browser.

### 1. Clone the Repository

```bash
git clone https://github.com/bhoomi12er-oss/RealityReplay-AI.git
cd RealityReplay-AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create your local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Example configuration:

```env
META_BASE_URL=https://api.meta.ai/v1
META_API_KEY=
META_MODEL=muse-spark-1.3
PORT=3001
```

Keep your actual API credentials private. Never commit `.env` or place API keys inside frontend code.

The application can run in Demo Mode without an API key.

### 4. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

The Vite configuration includes development API middleware for the application's API endpoints.

### 5. Optional: Start the Standalone Backend

```bash
npm run server
```

### 6. Build the Application

```bash
npm run build
```

### 7. Run Linting

```bash
npm run lint
```

---

## API Integration

RealityReplay AI includes a backend integration architecture intended for multimodal visual analysis.

### Analysis Endpoint

```http
POST /api/analyze-checkin
```

The backend is designed to handle:
- Baseline image data.
- Latest check-in image data.
- Planned milestone descriptions.
- Structured analysis instructions.
- Audit response handling.

The configured Meta-compatible API endpoint is:

```text
https://api.meta.ai/v1/chat/completions
```

The actual availability and compatibility of the selected model, endpoint, and image payload format must be validated with a working API credential before live inference can be considered operational.

### Current Execution Mode

**Demo Mode is the current default when no valid API credential is configured.**

Demo Mode provides a way to explore the application workflow without pretending that visual AI verification has occurred.

Live AI analysis should only be presented as operational after successful end-to-end API testing.

---

## Security and Privacy

Security is an important part of the application architecture.

- API credentials are intended to remain in server-side environment variables.
- `.env` files are excluded through `.gitignore`.
- `.env.example` contains configuration placeholders.
- API requests are routed through the backend rather than exposing credentials in frontend bundles.
- Browser storage is used for local project information and image evidence.

**Privacy consideration:** Images stored in browser storage remain on the user's device unless the application sends them to a configured analysis service. Users should be informed when evidence is transmitted to an external AI provider.

---

## Current Development Status

| Component | Status |
|---|---|
| React application structure | Implemented |
| Project creation workflow | Implemented |
| Baseline image upload | Implemented |
| Image optimization | Implemented |
| Local project persistence | Implemented |
| Visual check-in workflow | Implemented |
| Four-category audit design | Defined |
| Backend API architecture | Implemented |
| Transparent Demo Mode | Implemented |
| Live Meta API inference | Requires successful API validation |

---

## Future Roadmap

RealityReplay AI has room to evolve into a more comprehensive visual auditing platform.

- **Evidence-Linked Milestone Reports:** Connect audit outcomes with the specific photographs supporting them.
- **Temporal Progress Timeline:** Explore changes across multiple check-ins rather than only comparing two moments.
- **Perspective-Aware Comparison:** Improve reliability when photographs are captured from different angles.
- **Human Review Workflow:** Allow users to review uncertain observations and correct misleading conclusions.
- **Exportable Audit Reports:** Generate shareable project summaries with milestone history and supporting evidence.
- **Multi-Project Management:** Support multiple spaces and transformation projects.
- **Cloud Synchronization:** Enable secure access to project evidence across devices.
- **Role-Based Collaboration:** Support project owners, contractors, and reviewers with appropriate access controls.

---

## Our Vision

We believe that visual progress should be more than a collection of photographs.

Every physical transformation represents a commitment between what was planned and what eventually becomes reality.

RealityReplay AI aims to make that relationship easier to understand, track, and verify through structured visual evidence.

From a single room renovation to a large-scale physical transformation, the goal remains the same:

**Make progress visible. Make evidence meaningful. Make verification transparent.**

---

## Built With Purpose

Created as an exploration of multimodal AI, full-stack engineering, and evidence-based visual intelligence.

**Project:** RealityReplay AI

**Tagline:** Imagine the Change. Track the Reality.

### Connect

- **GitHub Repository:** https://github.com/bhoomi12er-oss/RealityReplay-AI

---

## License

This project is licensed under the MIT License.
