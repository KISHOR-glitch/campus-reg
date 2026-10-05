# Live College Scoreboard — NxtWave Growth Challenge

A single-file, zero-build web app that shows a **live leaderboard** of college registrations for the free workshop **"Build Your First AI Project in 60 Minutes"**.

---

## Files

```
campus-registration/
├── index.html          ← the entire app (open this in any browser)
└── apps-script/
    └── Code.gs         ← Google Apps Script for the data backend
```

---

## Running locally

1. Double-click `index.html` — it opens directly in your browser.  
2. No server, no `npm install`, no build step required.
3. By default it runs in **demo mode** with simulated registrations every 3 seconds.

---

## Connecting to a Google Sheet (live data)

### Step 1 — Create the sheet

1. Go to [sheets.google.com](https://sheets.google.com) → **New spreadsheet**.
2. Rename the first tab to `Registrations`.
3. Copy the Sheet ID from the URL:  
   `https://docs.google.com/spreadsheets/d/**SHEET_ID**/edit`

### Step 2 — Deploy the Apps Script

1. Open [script.google.com](https://script.google.com) → **New project**.
2. Delete the placeholder code and paste the contents of `apps-script/Code.gs`.
3. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID.
4. Click **Deploy → New deployment**:
   - **Type**: Web app  
   - **Execute as**: Me  
   - **Who has access**: Anyone  
5. Click **Deploy** and authorise the permissions when prompted.
6. Copy the **deployment URL** (looks like `https://script.google.com/macros/s/.../exec`).

### Step 3 — Connect the app

Open `index.html` in a text editor. Near the top find:

```js
const SHEET_WEBHOOK = ''; // paste your URL here
```

Replace the empty string with your deployment URL:

```js
const SHEET_WEBHOOK = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

Save the file. Registrations will now POST to your Sheet automatically.

### Step 4 — Disable demo simulation

In `index.html`, find the block clearly marked:

```
/* ⚠️  DEMO-ONLY: remove the setInterval block when using real data */
```

Delete the entire `startDemoSimulation()` IIFE. Also remove the **"Demo data"** badge from the header if desired.

---

## Deploying on Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site → Deploy manually**.
2. Drag and drop the **`campus-registration/`** folder onto the Netlify drop zone.
3. Netlify instantly gives you a public URL (e.g. `https://your-site.netlify.app`).

No `netlify.toml` or build settings needed — it is a plain HTML file.

---

## Deploying on GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages** in the repo.
3. Under **Source**, select your branch (e.g. `main`) and folder (`/ (root)`).
4. Click **Save**. Your site is live at `https://username.github.io/repo-name/`.

---

## Customising colleges

Edit the `COLLEGES` array near the top of `index.html`:

```js
const COLLEGES = [
  { id: 'NWC01', name: 'Your College Name', code: 'NW-CODE1', count: 0 },
  // add more colleges here
];
```

Each college needs a unique `id`, `name`, and referral `code`. Keep `count` at `0`.

---

## Feature checklist

| Feature | Status |
|---|---|
| Dark theme, Sora + Manrope fonts | ✅ |
| Responsive at 360 px and 1280 px | ✅ |
| Live leaderboard with rank badges | ✅ |
| Progress bar toward 25 registrations | ✅ |
| Ticker showing latest registration | ✅ |
| Referral code cards with tap-to-copy | ✅ |
| Registration modal with full validation | ✅ |
| Duplicate phone rejection (localStorage) | ✅ |
| Success screen + WhatsApp share | ✅ |
| Google Sheets webhook integration | ✅ |
| Demo simulation (removable) | ✅ |
| `prefers-reduced-motion` support | ✅ |
| Visible keyboard focus indicators | ✅ |
| No fake scarcity / countdown timers | ✅ |

---

## Privacy note

Phone numbers are stored **only in the visitor's own browser** (`localStorage`) to prevent duplicate submissions. They are never shared between devices. When the Sheet webhook is active, each registration record (name, phone, college, code, timestamp) is sent to your Google Sheet over HTTPS.
