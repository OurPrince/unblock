/**
 * content.js — world: ISOLATED, run_at: document_idle  (v3.0)
 *
 * Toggle bypass on/off через popup + логування XHR snap
 */

// ── State ────────────────────────────────────────────────────────────────────
let bypassEnabled = true;

// ── XHR snap listener (з interceptor.js MAIN world) ──────────────────────────
window.addEventListener('__aisu_xhrCapture', (e) => {
  const text = e.detail.text || '';
  console.log(
    `%c[Unblock] 📡 XHR snap: ${text.length} chars (trigger: ${e.detail.trigger})`,
    'color:#4fc3f7'
  );
});

// ── Storage: toggle on/off ───────────────────────────────────────────────────
chrome.storage.local.get(['bypassEnabled'], (data) => {
  bypassEnabled = data.bypassEnabled !== false;
  console.log(`🛡️ AI Studio Unblock ${bypassEnabled ? 'active ✅' : 'disabled ❌'}`);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  if (changes.bypassEnabled) {
    bypassEnabled = changes.bypassEnabled.newValue;
    console.log(`🛡️ Bypass ${bypassEnabled ? 'ENABLED ✅' : 'DISABLED ❌'}`);
  }
});
