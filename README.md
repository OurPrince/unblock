# 🛡️ AI Studio Unblock

A Chrome extension that removes the **"Content Blocked"** warning in Google AI Studio. The model's generated text stays visible instead of being replaced with an error banner.

---

## How it works

AI Studio uses an internal numeric `finishReason` code in its XHR responses:

- `1` = STOP (normal end)
- `8` = Content Policy violation → triggers "Content Blocked"

The extension intercepts the response stream **before Angular processes it** and does three things:

| # | Action | Effect |
|---|--------|--------|
| 1 | `[],8` → `[],1` | finishReason replaced with STOP |
| 2 | `xhr.abort()` → no-op | stream isn't killed mid-response |
| 3 | `"SAFETY"` → `"STOP"` | string enum fallback for public API format |

No DOM manipulation. No flicker. The block never appears.

---

## ⚠️ Important limitation

The server physically stops generating tokens when Content Policy triggers. The extension can't make the server generate more text — that's a hard server-side constraint.

**Workaround:** type `continue` in the chat to get the next chunk. Repeat until you have the full response.

---

## Install

> No Chrome Web Store — load as an unpacked extension.

1. [Download ZIP](../../archive/refs/heads/main.zip) and extract, or clone the repo
2. Open Chrome → go to `chrome://extensions` or `edge://extensions`
3. Enable **Developer Mode** (top right toggle)
4. Click **Load unpacked** → select the extracted folder
5. Open [aistudio.google.com](https://aistudio.google.com) — extension is active

---

## Files

```
├── manifest.json      — Extension config (Manifest V3)
├── interceptor.js     — XHR patch, runs in MAIN world before Angular loads
├── content.js         — Toggle state sync (ISOLATED world)
├── popup.html         — Extension popup UI
├── popup.css          — Popup styles
├── popup.js           — Popup toggle logic
└── icons/             — Extension icons (16, 48, 128px)
```

---

## Version history

| Version | What changed |
|---------|-------------|
| **v3.0** | Full rewrite — XHR response interception replaces DOM-based approach. Proactive, zero flicker. |
| v1.x | DOM Capture & Restore — MutationObserver detected block, clicked Edit → paste → Save |

---

## Notes

- Works only on `aistudio.google.com`
- No data collection, no external requests
- Free & open source
