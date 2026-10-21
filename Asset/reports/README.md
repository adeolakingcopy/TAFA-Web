# TAFA Reports Folder — PDF Placement Guide

Place your PDF whitepapers, course syllabi, and executive briefings in this folder.

## Required File Names

| PDF File | Triggered By |
|---|---|
| `TAFA-State-of-Enterprise-AI-Africa-2026.pdf` | "The 2026 State of Enterprise AI in Africa" download |
| `TAFA-Workforce-Readiness-Index-2026.pdf` | "Pan-African AI Workforce Readiness Index 2026" download |
| `TAFA-Enterprise-LLM-Agent-Playbook.pdf` | "The African Enterprise LLM & Agent Playbook" download |
| `TAFA-Fintech-AI-Governance-Blueprint.pdf` | "Fintech & Banking AI Governance Blueprint" download |
| `TAFA-AI-ROI-Measurement-Playbook.pdf` | "AI ROI Measurement Playbook" download |
| `TAFA-Academy-Course-Syllabus.pdf` | Syllabus download button on all course pages |
| `TAFA-Executive-Briefing.pdf` | Fallback for any unmatched resource name |

## How to Create PDFs for Free
- **Canva**: Design professional PDF reports at https://canva.com (free tier)
- **Google Docs**: Write the report and export as PDF (File > Download > PDF)
- **Adobe Express**: https://express.adobe.com (free)

## Delivery Flow
1. Visitor clicks a "Download" button on the site
2. A modal opens asking for Name, Work Email, Organisation
3. On submit:
   - Their details go to Google Sheets (via Apps Script backend)
   - The browser instantly triggers a download of the PDF from this folder
   - They receive a branded email with the resource link
   - Admin receives an instant notification email

## Notes
- Files in this folder are publicly accessible (needed for browser download)
- Keep file sizes under 10MB for fast delivery
- Use compressed PDFs (Smallpdf.com has a free compressor)
