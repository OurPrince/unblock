const toggle = document.getElementById('toggleSwitch');
const statusBar = document.getElementById('statusBar');
const statusText = document.getElementById('statusText');
const cards = document.getElementById('cardsContainer');

// Load saved state
chrome.storage.local.get(['bypassEnabled'], (data) => {
  const enabled = data.bypassEnabled !== false;
  toggle.checked = enabled;
  updateUI(enabled);
});

// Main toggle handler
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ bypassEnabled: enabled });
  updateUI(enabled);
});

function updateUI(enabled) {
  if (enabled) {
    statusBar.classList.remove('disabled');
    statusText.textContent = 'Active';
    cards.classList.remove('disabled');
  } else {
    statusBar.classList.add('disabled');
    statusText.textContent = 'Disabled';
    cards.classList.add('disabled');
  }
}
