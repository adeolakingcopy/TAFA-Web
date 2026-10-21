/**
 * TAFA Lead Capture & Conversion Module
 * ─────────────────────────────────────
 * Handles:
 *  1. Whitepaper / resource download gating (email-for-PDF)
 *  2. Course enrollment modal with Paystack inline checkout
 *  3. Syllabus / brochure lead magnet
 *  4. Newsletter signup
 *  5. Consulting inquiry form submission
 *
 * Backend: Google Apps Script web-app endpoint.
 * CONFIGURE YOUR ENDPOINT IN TAFA_CONFIG below.
 */

const TAFA_CONFIG = {
  /**
   * ⚙️  SETUP INSTRUCTIONS
   * ────────────────────────
   * 1. Open https://sheets.new and rename it "TAFA Leads Master".
   *    Add these columns in row 1:
   *    Timestamp | Form Type | Name | Email | Organization | Phone | Interest | Notes
   *
   * 2. Click Extensions > Apps Script. Paste the code from SETUP.md or the
   *    Google Apps Script provided separately.
   *
   * 3. Click Deploy > New Deployment > Web App.
   *    Set "Execute as: Me" and "Who has access: Anyone".
   *    Copy the Web App URL and paste it below.
   *
   * 4. For Paystack:
   *    Sign up free at https://paystack.com and paste your PUBLIC key below.
   *    (Paystack charges 1.5% per transaction, zero monthly fees.)
   */

  // ── Paste your Google Apps Script Web App URL here ──────────────────────
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec',

  // ── Paste your Paystack PUBLIC key here ─────────────────────────────────
  PAYSTACK_KEY: 'pk_live_YOUR_PAYSTACK_PUBLIC_KEY_HERE',

  // ── Notification email: receives instant alert on every lead ────────────
  ADMIN_NOTIFY_EMAIL: 'academy@talentflowafrica.com',

  // ── Exchange rate fallback (USD → NGN) for Paystack amount calculation ──
  USD_TO_NGN_RATE: 1600,
};

// ═══════════════════════════════════════════════════════════════
//  UTILITY: Submit lead to Google Sheets (fire-and-forget)
// ═══════════════════════════════════════════════════════════════
async function tafaCaptureLead(data) {
  if (!TAFA_CONFIG.APPS_SCRIPT_URL.includes('script.google.com')) return;
  try {
    await fetch(TAFA_CONFIG.APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });
  } catch (_) {
    // Silently fail — don't block user experience
  }
}

// ═══════════════════════════════════════════════════════════════
//  UTILITY: Global toast notification (used across all pages)
// ═══════════════════════════════════════════════════════════════
function tafaShowToast(message, durationMs = 5000) {
  let toast = document.getElementById('tafa-global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'tafa-global-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText = `
      position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(120px);
      background:#061a3f;color:#fff;padding:14px 24px;border-radius:40px;
      font-size:14px;font-weight:600;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.22);
      display:flex;align-items:center;gap:10px;transition:transform .38s cubic-bezier(.22,1,.36,1),opacity .38s;
      opacity:0;pointer-events:none;max-width:calc(100vw - 40px);text-align:center;
    `;
    const icon = document.createElement('span');
    icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    toast.appendChild(icon);
    const txt = document.createElement('span');
    txt.id = 'tafa-toast-text';
    toast.appendChild(txt);
    document.body.appendChild(toast);
  }
  const txt = toast.querySelector('#tafa-toast-text');
  if (txt) txt.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(120px)';
  }, durationMs);
}

// ═══════════════════════════════════════════════════════════════
//  UTILITY: Trigger an instant browser file download
// ═══════════════════════════════════════════════════════════════
function tafaTriggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'TAFA-Resource.pdf';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 200);
}

// ═══════════════════════════════════════════════════════════════
//  RESOURCE FILE MAP — Update paths when actual PDFs are created
// ═══════════════════════════════════════════════════════════════
const TAFA_RESOURCES = {
  'The 2026 State of Enterprise AI in Africa':
    './Asset/reports/TAFA-State-of-Enterprise-AI-Africa-2026.pdf',
  'Pan-African AI Workforce Readiness Index 2026':
    './Asset/reports/TAFA-Workforce-Readiness-Index-2026.pdf',
  'The African Enterprise LLM & Agent Playbook':
    './Asset/reports/TAFA-Enterprise-LLM-Agent-Playbook.pdf',
  'Fintech & Banking AI Governance Blueprint':
    './Asset/reports/TAFA-Fintech-AI-Governance-Blueprint.pdf',
  'AI ROI Measurement Playbook':
    './Asset/reports/TAFA-AI-ROI-Measurement-Playbook.pdf',
  '__syllabus__':
    './Asset/reports/TAFA-Academy-Course-Syllabus.pdf',
};

function tafaGetResourceUrl(name) {
  return TAFA_RESOURCES[name] || './Asset/reports/TAFA-Executive-Briefing.pdf';
}


// ═══════════════════════════════════════════════════════════════
//  LEAD MODAL — Shared gated access modal (download / enrol)
// ═══════════════════════════════════════════════════════════════
(function buildLeadModal() {
  if (document.getElementById('tafa-lead-modal')) return;

  const styles = document.createElement('style');
  styles.textContent = `
    #tafa-lead-modal-overlay {
      position:fixed;inset:0;z-index:8000;background:rgba(6,26,63,.55);
      backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;
      padding:20px;opacity:0;pointer-events:none;transition:opacity .28s ease;
    }
    #tafa-lead-modal-overlay.open {
      opacity:1;pointer-events:auto;
    }
    #tafa-lead-modal {
      background:#fff;border-radius:22px;padding:36px 32px 32px;width:100%;max-width:480px;
      position:relative;box-shadow:0 24px 80px rgba(6,26,63,.18);
      transform:translateY(24px) scale(.97);transition:transform .32s cubic-bezier(.22,1,.36,1);
    }
    #tafa-lead-modal-overlay.open #tafa-lead-modal {
      transform:translateY(0) scale(1);
    }
    #tafa-lead-modal .lm-badge {
      display:inline-block;font-size:11px;font-weight:800;letter-spacing:.07em;
      padding:4px 12px;border-radius:40px;background:#fdf3d0;color:#92400e;margin-bottom:14px;
    }
    #tafa-lead-modal h3 {
      font-size:20px;font-weight:800;color:#061a3f;margin:0 0 8px;line-height:1.3;
    }
    #tafa-lead-modal .lm-desc {
      font-size:13.5px;color:#475569;margin:0 0 20px;line-height:1.6;
    }
    #tafa-lead-modal .lm-close {
      position:absolute;top:18px;right:18px;width:32px;height:32px;border-radius:50%;
      border:1px solid #e2e8f0;background:#f8fafc;cursor:pointer;display:flex;
      align-items:center;justify-content:center;color:#475569;transition:background .15s;
    }
    #tafa-lead-modal .lm-close:hover { background:#e2e8f0; }
    #tafa-lead-modal form { display:flex;flex-direction:column;gap:12px; }
    #tafa-lead-modal .lm-field {
      display:flex;flex-direction:column;gap:5px;font-size:13px;font-weight:700;color:#061a3f;
    }
    #tafa-lead-modal .lm-field input,
    #tafa-lead-modal .lm-field select {
      height:46px;border:1.5px solid #e2e8f0;border-radius:10px;padding:0 14px;
      font:inherit;font-size:14px;color:#0b1f4d;background:#f8fafc;transition:border-color .15s;
    }
    #tafa-lead-modal .lm-field input:focus,
    #tafa-lead-modal .lm-field select:focus {
      outline:none;border-color:#1d4ed8;background:#fff;
    }
    #tafa-lead-modal .lm-submit {
      height:50px;border-radius:12px;background:#fbbf24;color:#061a3f;
      border:none;font-weight:800;font-size:14.5px;cursor:pointer;margin-top:4px;
      display:flex;align-items:center;justify-content:center;gap:8px;
      transition:background .18s,transform .15s;
    }
    #tafa-lead-modal .lm-submit:hover { background:#f5a800;transform:translateY(-1px); }
    #tafa-lead-modal .lm-submit:disabled { opacity:.55;cursor:not-allowed;transform:none; }
    #tafa-lead-modal .lm-privacy {
      font-size:11.5px;color:#94a3b8;text-align:center;margin-top:6px;
    }
    /* Enrollment pricing strip */
    #tafa-lead-modal .lm-price-strip {
      background:#f1f5f9;border-radius:12px;padding:14px 16px;
      display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;
    }
    #tafa-lead-modal .lm-price { font-size:24px;font-weight:800;color:#061a3f; }
    #tafa-lead-modal .lm-price-note { font-size:12px;color:#64748b; }
    #tafa-lead-modal .lm-divider {
      text-align:center;font-size:12px;color:#94a3b8;margin:8px 0 0;position:relative;
    }
    #tafa-lead-modal .lm-divider::before,
    #tafa-lead-modal .lm-divider::after {
      content:'';position:absolute;top:50%;width:40%;height:1px;background:#e2e8f0;
    }
    #tafa-lead-modal .lm-divider::before { left:0; }
    #tafa-lead-modal .lm-divider::after { right:0; }
    #tafa-lead-modal .lm-team-link {
      text-align:center;font-size:13px;color:#1d4ed8;font-weight:600;
      cursor:pointer;text-decoration:underline;margin-top:4px;
    }
  `;
  document.head.appendChild(styles);

  const overlay = document.createElement('div');
  overlay.id = 'tafa-lead-modal-overlay';
  overlay.innerHTML = `
    <div id="tafa-lead-modal" role="dialog" aria-modal="true" aria-labelledby="lm-heading">
      <button class="lm-close" id="lm-close-btn" aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <span class="lm-badge" id="lm-badge">EXECUTIVE ACCESS</span>
      <h3 id="lm-heading">Download Research Report</h3>
      <p class="lm-desc" id="lm-desc">Enter your details below to instantly receive the full PDF and a follow-up briefing.</p>

      <!-- Enrolment pricing strip (hidden by default) -->
      <div class="lm-price-strip" id="lm-price-strip" style="display:none">
        <div>
          <div class="lm-price" id="lm-price-display">$300</div>
          <div class="lm-price-note">per seat · TAFA Academy cohort</div>
        </div>
        <span style="font-size:12px;background:#dcfce7;color:#166534;padding:4px 10px;border-radius:40px;font-weight:700;">✓ OPEN FOR ENROLMENT</span>
      </div>

      <form id="lm-form" novalidate>
        <div class="lm-field">
          <label for="lm-name">Full Name</label>
          <input type="text" id="lm-name" placeholder="e.g. Oluwaseun Adeleke" required autocomplete="name">
        </div>
        <div class="lm-field">
          <label for="lm-email">Work Email</label>
          <input type="email" id="lm-email" placeholder="name@company.com" required autocomplete="email">
        </div>
        <div class="lm-field" id="lm-org-field">
          <label for="lm-org">Organisation / Company</label>
          <input type="text" id="lm-org" placeholder="e.g. First Bank, MTN, Twiga" autocomplete="organization">
        </div>
        <div class="lm-field" id="lm-phone-field" style="display:none">
          <label for="lm-phone">Phone (optional)</label>
          <input type="tel" id="lm-phone" placeholder="+234 800 000 0000" autocomplete="tel">
        </div>
        <button type="submit" class="lm-submit" id="lm-submit-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          <span id="lm-submit-label">Instant Download PDF</span>
        </button>
        <p class="lm-privacy">🔒 Zero spam. One-click unsubscribe. Your data stays private.</p>
        <div class="lm-divider" id="lm-divider" style="display:none">or</div>
        <p class="lm-team-link" id="lm-team-link" style="display:none"
          onclick="window.location.href='tafa-ai-consulting.html#book'">
          Need team / corporate invoicing? Talk to us →
        </p>
      </form>
    </div>
  `;
  document.body.appendChild(overlay);

  // Close handlers
  document.getElementById('lm-close-btn').addEventListener('click', tafaCloseLeadModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) tafaCloseLeadModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') tafaCloseLeadModal(); });

  // Form submission
  document.getElementById('lm-form').addEventListener('submit', handleLeadModalSubmit);
})();


// ═══════════════════════════════════════════════════════════════
//  LEAD MODAL — Public API
// ═══════════════════════════════════════════════════════════════
let _lmMode = 'download';   // 'download' | 'enrol' | 'syllabus' | 'team'
let _lmContext = {};         // Stores resource name, price, course title, etc.

function tafaOpenDownloadModal(resourceName) {
  _lmMode = 'download';
  _lmContext = { resourceName };

  document.getElementById('lm-badge').textContent    = 'EXECUTIVE ACCESS';
  document.getElementById('lm-heading').textContent  = resourceName || 'Download Research Report';
  document.getElementById('lm-desc').textContent     = 'Enter your business details to instantly receive the complete PDF report, benchmark charts, and implementation checklist.';
  document.getElementById('lm-submit-label').textContent = 'Instant Download PDF';
  document.getElementById('lm-price-strip').style.display = 'none';
  document.getElementById('lm-org-field').style.display   = '';
  document.getElementById('lm-phone-field').style.display = 'none';
  document.getElementById('lm-divider').style.display     = 'none';
  document.getElementById('lm-team-link').style.display   = 'none';

  const btn = document.getElementById('lm-submit-btn');
  btn.style.background = '#fbbf24';
  btn.querySelector('svg').innerHTML = `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>`;

  tafaOpenLeadModal();
}

function tafaOpenSyllabusModal(courseTitle) {
  _lmMode = 'syllabus';
  _lmContext = { courseTitle };

  document.getElementById('lm-badge').textContent    = 'FREE DOWNLOAD';
  document.getElementById('lm-heading').textContent  = 'Get the Full Course Syllabus';
  document.getElementById('lm-desc').textContent     = `Receive the complete module-by-module curriculum, learning outcomes, and cohort schedule for "${courseTitle || 'this course'}" — straight to your inbox.`;
  document.getElementById('lm-submit-label').textContent = 'Download Syllabus PDF';
  document.getElementById('lm-price-strip').style.display = 'none';
  document.getElementById('lm-org-field').style.display   = '';
  document.getElementById('lm-phone-field').style.display = 'none';
  document.getElementById('lm-divider').style.display     = 'none';
  document.getElementById('lm-team-link').style.display   = 'none';

  tafaOpenLeadModal();
}

function tafaOpenEnrolModal(courseTitle, priceDisplay, priceUSD) {
  _lmMode = 'enrol';
  _lmContext = { courseTitle, priceDisplay, priceUSD: priceUSD || 300 };

  document.getElementById('lm-badge').textContent    = 'ENROL NOW';
  document.getElementById('lm-heading').textContent  = `Enrol: ${courseTitle || 'TAFA Academy Course'}`;
  document.getElementById('lm-desc').textContent     = 'Secure your seat in the next cohort. We accept cards, mobile money, and bank transfer — all via Paystack.';
  document.getElementById('lm-price-display').textContent = priceDisplay || '$300';
  document.getElementById('lm-price-strip').style.display = '';
  document.getElementById('lm-submit-label').textContent  = 'Proceed to Secure Checkout';
  document.getElementById('lm-org-field').style.display   = '';
  document.getElementById('lm-phone-field').style.display = '';
  document.getElementById('lm-divider').style.display     = '';
  document.getElementById('lm-team-link').style.display   = '';

  const btn = document.getElementById('lm-submit-btn');
  btn.style.background = '#fbbf24';
  btn.querySelector('svg').innerHTML = `<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>`;

  tafaOpenLeadModal();
}

function tafaOpenTeamEnrolModal(courseTitle) {
  _lmMode = 'team';
  _lmContext = { courseTitle };

  document.getElementById('lm-badge').textContent    = 'TEAM & CORPORATE';
  document.getElementById('lm-heading').textContent  = 'Enquire About Team Training';
  document.getElementById('lm-desc').textContent     = 'Tell us about your team. We will prepare a custom quote with group pricing, flexible scheduling, and private cohort options.';
  document.getElementById('lm-submit-label').textContent = 'Send Team Enquiry';
  document.getElementById('lm-price-strip').style.display = 'none';
  document.getElementById('lm-org-field').style.display   = '';
  document.getElementById('lm-phone-field').style.display = '';
  document.getElementById('lm-divider').style.display     = 'none';
  document.getElementById('lm-team-link').style.display   = 'none';

  tafaOpenLeadModal();
}

function tafaOpenLeadModal() {
  const overlay = document.getElementById('tafa-lead-modal-overlay');
  overlay.classList.add('open');
  overlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    const first = document.getElementById('lm-name');
    if (first) first.focus();
  }, 100);
}

function tafaCloseLeadModal() {
  const overlay = document.getElementById('tafa-lead-modal-overlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}


// ═══════════════════════════════════════════════════════════════
//  LEAD MODAL — Form submission handler
// ═══════════════════════════════════════════════════════════════
async function handleLeadModalSubmit(e) {
  e.preventDefault();

  const name   = document.getElementById('lm-name').value.trim();
  const email  = document.getElementById('lm-email').value.trim();
  const org    = document.getElementById('lm-org').value.trim();
  const phone  = document.getElementById('lm-phone').value.trim();

  if (!name || !email) {
    tafaShowToast('Please fill in your name and email.');
    return;
  }

  const btn   = document.getElementById('lm-submit-btn');
  const label = document.getElementById('lm-submit-label');
  btn.disabled = true;
  label.textContent = 'Processing…';

  // ── Capture lead to Google Sheets ──────────────────────────────────────
  await tafaCaptureLead({
    formType:     _lmMode === 'download' ? 'Whitepaper Download' :
                  _lmMode === 'syllabus' ? 'Syllabus Download' :
                  _lmMode === 'enrol'   ? 'Course Enrolment' :
                  'Team Training Enquiry',
    name,
    email,
    organization: org,
    phone,
    interest:     _lmContext.resourceName || _lmContext.courseTitle || '',
    notes:        window.location.href,
  });

  // ── Mode-specific action ────────────────────────────────────────────────
  if (_lmMode === 'download') {
    tafaCloseLeadModal();
    tafaTriggerDownload(
      tafaGetResourceUrl(_lmContext.resourceName),
      (_lmContext.resourceName || 'TAFA-Report').replace(/[^a-z0-9\s-]/gi, '').replace(/\s+/g, '_') + '.pdf'
    );
    tafaShowToast('Your download has started! A copy will also be emailed to you.');

  } else if (_lmMode === 'syllabus') {
    tafaCloseLeadModal();
    tafaTriggerDownload('./Asset/reports/TAFA-Academy-Course-Syllabus.pdf', 'TAFA-Academy-Course-Syllabus.pdf');
    tafaShowToast('Syllabus download started! We\'ll also send it to your email.');

  } else if (_lmMode === 'enrol') {
    // Hand off to Paystack checkout
    tafaInitiatePaystackCheckout({ name, email, org, phone });

  } else if (_lmMode === 'team') {
    tafaCloseLeadModal();
    tafaShowToast('Team enquiry received! Our training coordinator will contact you within 24 hours.');
  }

  // Reset button
  setTimeout(() => {
    btn.disabled = false;
    label.textContent = _lmMode === 'enrol' ? 'Proceed to Secure Checkout' : 'Instant Download PDF';
  }, 2000);

  // Reset form fields
  document.getElementById('lm-form').reset();
}


// ═══════════════════════════════════════════════════════════════
//  PAYSTACK CHECKOUT INTEGRATION
// ═══════════════════════════════════════════════════════════════
function tafaInitiatePaystackCheckout({ name, email, org }) {
  const priceUSD = _lmContext.priceUSD || 300;
  const courseTitle = _lmContext.courseTitle || 'TAFA Academy Course';

  // Check if Paystack is loaded
  if (typeof PaystackPop === 'undefined') {
    // Paystack not loaded — fallback to email enquiry
    tafaCloseLeadModal();
    const subject = encodeURIComponent('Enrolment: ' + courseTitle);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nOrganisation: ${org}\nCourse: ${courseTitle}`);
    window.open(`mailto:academy@talentflowafrica.com?subject=${subject}&body=${body}`, '_blank');
    tafaShowToast('Opening email to complete your enrolment. We\'ll send your payment link shortly.');
    return;
  }

  tafaCloseLeadModal();

  const handler = PaystackPop.setup({
    key: TAFA_CONFIG.PAYSTACK_KEY,
    email: email,
    amount: priceUSD * TAFA_CONFIG.USD_TO_NGN_RATE * 100, // Paystack uses kobo
    currency: 'NGN',
    ref: 'TAFA_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    metadata: {
      custom_fields: [
        { display_name: 'Student Name',   variable_name: 'student_name',   value: name },
        { display_name: 'Organisation',   variable_name: 'organisation',   value: org },
        { display_name: 'Course Enrolled',variable_name: 'course_enrolled',value: courseTitle },
      ],
    },
    callback: function (response) {
      // Payment successful
      tafaCaptureLead({
        formType:     'Enrolment Payment Successful',
        name,
        email,
        organization: org,
        interest:     courseTitle,
        notes:        'Paystack Ref: ' + response.reference,
      });
      tafaShowToast('🎉 Payment confirmed! Check your email for onboarding details.');
      // Optional: redirect to a thank-you page
      // window.location.href = 'enrolment-success.html?course=' + encodeURIComponent(courseTitle);
    },
    onClose: function () {
      tafaShowToast('Checkout closed. Your seat is still available — enrol anytime!');
    },
  });
  handler.openIframe();
}


// ═══════════════════════════════════════════════════════════════
//  NEWSLETTER FORM ENHANCEMENT
//  Wires up any form with id="newsletter-form" or class="newsletter-form"
// ═══════════════════════════════════════════════════════════════
(function wireNewsletterForms() {
  document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('#newsletter-form, .newsletter-form');
    forms.forEach(function (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const nameInput  = form.querySelector('input[type="text"]');
        const email = emailInput ? emailInput.value.trim() : '';
        const name  = nameInput  ? nameInput.value.trim() : '';

        if (!email) return;

        const btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Subscribing…'; }

        await tafaCaptureLead({
          formType:     'Newsletter Subscription',
          name:         name || '',
          email,
          organization: '',
          interest:     'The African Superintelligence Memo',
          notes:        window.location.href,
        });

        if (emailInput) emailInput.value = '';
        if (nameInput)  nameInput.value = '';
        if (btn) { btn.disabled = false; btn.innerHTML = 'Subscribe Free ✓'; }

        // Use existing showToast if available, else use our own
        if (typeof showToast === 'function') {
          showToast('You\'re subscribed! The African Superintelligence Memo arrives bi-weekly.');
        } else {
          tafaShowToast('You\'re subscribed! The African Superintelligence Memo arrives bi-weekly.');
        }
      });
    });
  });
})();


// ═══════════════════════════════════════════════════════════════
//  CONSULTING FORM ENHANCEMENT
//  Wires up any form with class="tf-form"
// ═══════════════════════════════════════════════════════════════
(function wireConsultingForm() {
  document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form.tf-form');
    forms.forEach(function (form) {
      // Remove old inline onsubmit
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; }

        const get = (n) => { const el = form.querySelector(`[name="${n}"]`); return el ? el.value.trim() : ''; };

        await tafaCaptureLead({
          formType:     'Consulting Enquiry',
          name:         get('name'),
          email:        get('email'),
          organization: get('org'),
          phone:        '',
          interest:     get('topic'),
          notes:        get('msg'),
        });

        form.classList.add('sent');
        if (btn) btn.disabled = true;
        tafaShowToast('Thank you! Your enquiry was received. We'll be in touch within 24 hours.');
      });
    });
  });
})();
