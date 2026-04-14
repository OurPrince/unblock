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
function syncToggle(enabled) {
  bypassEnabled = enabled !== false;
  // Send state to interceptor.js (MAIN world)
  window.dispatchEvent(new CustomEvent('__aisu_toggle', { detail: bypassEnabled }));
}

chrome.storage.local.get(['bypassEnabled'], (data) => {
  syncToggle(data.bypassEnabled);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  if (changes.bypassEnabled) {
    syncToggle(changes.bypassEnabled.newValue);
  }
});
