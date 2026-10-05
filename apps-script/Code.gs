/**
 * Google Apps Script — doPost handler
 * Appends workshop registration data to a Google Sheet.
 *
 * SETUP STEPS
 * ───────────
 * 1. Go to https://script.google.com → New project.
 * 2. Replace the default code with this entire file.
 * 3. Replace SHEET_ID below with your Google Sheet's ID
 *    (the long string in the URL: .../spreadsheets/d/SHEET_ID/edit).
 * 4. Replace SHEET_TAB with your sheet tab name (default: "Registrations").
 * 5. Click "Deploy" → "New deployment":
 *      - Type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 6. Authorise the script when prompted.
 * 7. Copy the deployment URL and paste it into the
 *    SHEET_WEBHOOK constant at the top of index.html.
 *
 * Each row written: [Timestamp, Name, Phone, College, Code]
 */

// ── CONFIG ────────────────────────────────────────────────────────
const SHEET_ID  = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_TAB = 'Registrations';
// ─────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data     = JSON.parse(e.postData.contents);
    const sheet    = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB);

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'College', 'Code']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffffff');
    }

    sheet.appendRow([
      data.time   || new Date().toISOString(),
      data.name   || '',
      data.phone  || '',
      data.college|| '',
      data.code   || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: doGet — health check so you can verify deployment.
 * Visit the deployment URL in a browser; you should see { "status": "ok" }.
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'NxtWave registration sheet is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
