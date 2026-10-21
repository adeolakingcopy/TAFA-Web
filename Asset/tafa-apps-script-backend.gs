/**
 * TAFA Lead Capture — Google Apps Script Backend
 * ================================================
 * SETUP (takes ~10 minutes, completely free):
 *
 * 1. Open https://sheets.new
 *    Rename the spreadsheet: "TAFA Leads Master"
 *    In Row 1, add these headers exactly:
 *    A: Timestamp
 *    B: Form Type
 *    C: Name
 *    D: Email
 *    E: Organisation
 *    F: Phone
 *    G: Interest / Resource
 *    H: Notes / URL
 *    I: Status  (manually updated: e.g. "Contacted", "Enrolled", "Closed")
 *
 * 2. Click  Extensions > Apps Script
 *    Delete everything in the editor and paste THIS ENTIRE FILE.
 *
 * 3. Update ADMIN_EMAIL below to your address.
 *
 * 4. Click Deploy > New Deployment
 *    - Type: Web app
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 *    Click Deploy. Authorise when prompted.
 *
 * 5. Copy the Web App URL that appears and paste it into tafa-leads.js:
 *    TAFA_CONFIG.APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec'
 *
 * That's it! Every form submission on the TAFA website now lands in this sheet
 * AND sends you an instant email notification.
 */

// ── CONFIGURATION ────────────────────────────────────────────────────────────
const ADMIN_EMAIL = 'academy@talentflowafrica.com'; // Receives instant lead alerts
const SHEET_NAME  = 'Leads';                        // Tab name in Google Sheets
// ─────────────────────────────────────────────────────────────────────────────


/**
 * Handles incoming POST requests from the TAFA website.
 * This is the main entry point deployed as a Web App.
 */
function doPost(e) {
  try {
    const raw  = e.postData ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    // 1. Write lead to Google Sheet
    appendLeadToSheet(data);

    // 2. Send instant notification to admin
    sendAdminAlert(data);

    // 3. Send resource/confirmation email to the lead
    if (data.email && data.formType !== 'Newsletter Subscription') {
      sendLeadConfirmation(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('Error in doPost: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * Appends a lead row to the Google Sheet.
 */
function appendLeadToSheet(data) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);

  // Auto-create tab if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp', 'Form Type', 'Name', 'Email',
      'Organisation', 'Phone', 'Interest / Resource', 'Notes / URL', 'Status'
    ]);
    // Style the header row
    const headerRange = sheet.getRange(1, 1, 1, 9);
    headerRange.setBackground('#061a3f').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date(),
    data.formType     || '',
    data.name         || '',
    data.email        || '',
    data.organization || '',
    data.phone        || '',
    data.interest     || '',
    data.notes        || '',
    'New Lead',
  ]);
}


/**
 * Sends an immediate email alert to the TAFA admin.
 */
function sendAdminAlert(data) {
  if (!ADMIN_EMAIL) return;

  const subject = `🔔 New TAFA Lead: ${data.formType || 'Website Form'} — ${data.name || data.email}`;
  const body = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#1e293b;">
      <div style="background:#061a3f;padding:20px 28px;border-radius:10px 10px 0 0;">
        <h2 style="color:#fbbf24;margin:0;font-size:20px;">New Lead Captured</h2>
        <p style="color:#94a3b8;margin:4px 0 0;font-size:13px;">${new Date().toUTCString()}</p>
      </div>
      <div style="background:#fff;padding:24px 28px;border:1px solid #e2e8f0;border-radius:0 0 10px 10px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#64748b;width:140px;">Form Type</td><td style="padding:8px 0;font-weight:700;">${data.formType || '—'}</td></tr>
          <tr style="background:#f8fafc;"><td style="padding:8px 6px;color:#64748b;">Name</td><td style="padding:8px 6px;font-weight:700;">${data.name || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#1d4ed8;">${data.email || '—'}</a></td></tr>
          <tr style="background:#f8fafc;"><td style="padding:8px 6px;color:#64748b;">Organisation</td><td style="padding:8px 6px;">${data.organization || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Phone</td><td style="padding:8px 0;">${data.phone || '—'}</td></tr>
          <tr style="background:#f8fafc;"><td style="padding:8px 6px;color:#64748b;">Interest</td><td style="padding:8px 6px;font-weight:700;color:#061a3f;">${data.interest || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Source Page</td><td style="padding:8px 0;font-size:12px;">${data.notes || '—'}</td></tr>
        </table>
        <div style="margin-top:20px;">
          <a href="mailto:${data.email}?subject=Re: Your TAFA Enquiry" style="background:#fbbf24;color:#061a3f;padding:10px 20px;border-radius:8px;font-weight:700;text-decoration:none;font-size:13px;">Reply to Lead</a>
          &nbsp;&nbsp;
          <a href="https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActiveSpreadsheet().getId()}" style="background:#f1f5f9;color:#1d4ed8;padding:10px 20px;border-radius:8px;font-weight:700;text-decoration:none;font-size:13px;">View in Sheets</a>
        </div>
      </div>
    </div>
  `;

  GmailApp.sendEmail(ADMIN_EMAIL, subject, '', { htmlBody: body });
}


/**
 * Sends a confirmation / resource delivery email to the lead.
 */
function sendLeadConfirmation(data) {
  if (!data.email) return;

  const firstName = (data.name || 'there').split(' ')[0];
  let subjectLine = 'Your TalentFlow Africa Resource is Ready';
  let resourceSection = '';

  if (data.formType === 'Whitepaper Download' || data.formType === 'Syllabus Download') {
    subjectLine = `Your TAFA Resource: ${data.interest || 'Executive Briefing'}`;
    resourceSection = `
      <p>You requested access to <strong>${data.interest || 'the TAFA research report'}</strong>.
      If your download did not start automatically, click the button below to access it directly.</p>
      <p style="margin:20px 0;">
        <a href="https://talentflowafrica.com/Asset/reports/" style="background:#fbbf24;color:#061a3f;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;">
          Download Your Resource →
        </a>
      </p>
    `;
  } else if (data.formType === 'Course Enrolment') {
    subjectLine = `Your TAFA Academy Enrolment: ${data.interest || 'Course Registration'}`;
    resourceSection = `
      <p>Thank you for enrolling in <strong>${data.interest || 'the TAFA Academy course'}</strong>.
      Our team will send your cohort access details and onboarding pack within 24 hours.</p>
      <p>Questions? Reply to this email or WhatsApp us directly.</p>
    `;
  } else if (data.formType === 'Consulting Enquiry') {
    subjectLine = 'Your TAFA AI Growth Audit Request';
    resourceSection = `
      <p>We've received your enquiry regarding <strong>${data.interest || 'AI consulting'}</strong>.
      One of our senior advisors will be in touch within <strong>24 business hours</strong> to schedule
      your discovery call.</p>
      <p>In the meantime, explore our latest research and enterprise case studies:</p>
      <p><a href="https://talentflowafrica.com/tafa-insights.html" style="color:#1d4ed8;font-weight:600;">Read TAFA Insights →</a></p>
    `;
  } else if (data.formType === 'Team Training Enquiry') {
    subjectLine = 'TAFA Team Training — We\'ll Prepare Your Custom Proposal';
    resourceSection = `
      <p>Our training coordination team has received your request for group training on
      <strong>${data.interest || 'AI for enterprise teams'}</strong>.</p>
      <p>We will prepare a tailored proposal including group pricing, scheduling, and private cohort
      options, and send it to you within 24 hours.</p>
    `;
  }

  const body = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#1e293b;margin:0 auto;">
      <div style="background:#061a3f;padding:28px;text-align:center;border-radius:12px 12px 0 0;">
        <img src="https://talentflowafrica.com/tafa-log.png" alt="TalentFlow Africa" width="160" style="max-width:160px;">
      </div>
      <div style="background:#fff;padding:32px 28px;border:1px solid #e2e8f0;border-radius:0 0 12px 12px;">
        <h2 style="color:#061a3f;margin:0 0 16px;font-size:22px;">Hi ${firstName},</h2>
        ${resourceSection}
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
        <p style="font-size:13px;color:#64748b;">
          You are now connected with TalentFlow Africa — Africa's leading enterprise AI strategy
          and talent development company.
        </p>
        <p style="font-size:13px;color:#64748b;">
          <strong>Email:</strong> <a href="mailto:info@talentflowafrica.com" style="color:#1d4ed8;">info@talentflowafrica.com</a> &nbsp;|&nbsp;
          <a href="https://talentflowafrica.com" style="color:#1d4ed8;">talentflowafrica.com</a>
        </p>
        <p style="font-size:11px;color:#94a3b8;margin-top:24px;">
          You received this email because you requested a resource or made an enquiry on talentflowafrica.com.
          <a href="#" style="color:#94a3b8;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;

  GmailApp.sendEmail(data.email, subjectLine, '', { htmlBody: body, name: 'TalentFlow Africa' });
}


/**
 * Test function — run this manually in the Apps Script editor
 * to verify everything is working before going live.
 */
function testSubmission() {
  const testData = {
    formType:     'Whitepaper Download',
    name:         'Test User',
    email:        ADMIN_EMAIL,
    organization: 'Test Corp',
    phone:        '+234 800 000 0000',
    interest:     'Pan-African AI Workforce Readiness Index 2026',
    notes:        'https://talentflowafrica.com/tafa-insights.html (test)',
  };

  appendLeadToSheet(testData);
  sendAdminAlert(testData);
  sendLeadConfirmation(testData);

  Logger.log('✅ Test complete. Check your sheet and inbox.');
}
