# DEMURE MODELS — Editorial Monograph Architecture

> **PRESENCE. POISE. POWER. — MAKE AN IMPRESSION.**

A modern, high-end editorial website crafted specifically for **DEMURE MODELS**. Built using a **Split-Pane Editorial Architecture** (inspired by prestigious international modeling agencies and luxury fashion publications).

---

## 🏛️ Architectural Overview: The Split-Pane Layout

The experience is divided into two harmonious panes:

### 1. Left Pane (~38% Desktop, Sticky Anchor)
- **Permanent Brand Anchor**: Features the official DM monogram, horizontal typography wordmark, and brand motto: *Presence. Poise. Power.*
- **Core Mission**: Clear, dignified statement of Demure's purpose.
- **Vertical Editorial Navigation (with Live Scrollspy)**:
  - `01 / THE ROSTER`: Active talent across all divisions
  - `02 / PHILOSOPHY & PURPOSE`: The meaning of Demure (Dignity, composure, restraint)
  - `03 / SERVICES & PRACTICE`: Discovery, Training, Representation, and Castings
  - `04 / DEMURE BOOTCAMP '26`: The 3-day hybrid development programme
  - `05 / PROFESSIONAL WELFARE`: Safeguarding charter & ethical standards
  - `06 / CLIENT & TALENT DESK`: Direct portals to book talent or apply
- **Verified Official Coordinates**:
  - Telephone: `07059624764`
  - Email: `demuremodelshq@gmail.com`
  - Instagram: `@demuremodels`
  - TikTok: `@demuremodels`
- **Primary CTA**: Direct link to client brief submission.

### 2. Right Pane (~62% Desktop, Fluid Editorial Canvas)
- **The Talent Roster**: 
  - Minimal division filter: *All Talent · Runway · Commercial · Beauty · Curve · Youth · Fitness & Screen*.
  - Large 3:4 portrait cards with model codes, names, categories, and heights.
  - Interactive **Agency Comp Card Modal** displaying lookbook polaroids and verified specifications (Height, Bust/Chest, Waist, Hips, Shoes, Eyes, Hair, Location) with 1-click booking prefill.
- **Philosophy & Purpose**: Thoughtfully formatted explanation of Demure's three pillars: **Presence**, **Poise**, and **Power**.
- **Agency Practice**: Clear breakdown of the 4 operational pillars with clean category coverage.
- **DEMURE Bootcamp 2026**: Highlighting the proposed 3-day hybrid accelerator (In-Person Studio Immersion vs Global Virtual Track) with instant priority waitlist registration.
- **Model Welfare & Safeguards**: Child safeguarding, transparent written terms, advance wardrobe/location disclosure, and image rights protections.
- **Agency Desk (Dual Portals)**:
  - **Client Booking Form**: Structured project brief for brands, agencies, and production houses.
  - **Talent Application Form**: Intake form with natural polaroid uploads and an **automated Child Safeguarding section** that only triggers when age $< 18$.

---

## 📁 File Structure

```
c:\Users\dell\Desktop\TAFA Web\demure-models\
├── index.html                 # Main website with Split-Pane layout
├── README.md                  # Documentation and architecture guide
└── assets/
    ├── demure-monogram.png    # Official DM monogram with orange slash
    ├── demure-wordmark.png    # Official DEMURE MODELS horizontal typography
    ├── css/
    │   └── styles.css         # Split-pane styles, editorial typography, dark palette
    └── js/
        ├── app.js             # Scrollspy, comp card modals, filters, form feedback
        └── talent-data.js     # Curated diverse talent profiles across all 10+ categories
```

---

## 🚀 How to Launch and Preview

Open `index.html` in your browser:
```powershell
Start-Process "c:\Users\dell\Desktop\TAFA Web\demure-models\index.html"
```
Or serve locally via Python or Node:
```powershell
python -m http.server 3000 --directory "c:\Users\dell\Desktop\TAFA Web\demure-models"
```
Then visit `http://localhost:3000`.
