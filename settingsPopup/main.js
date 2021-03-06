const activationCheckbox = wrk.dom.id('activationCheckbox');
const intervalSizeInput = wrk.dom.id('intervalSizeInput');
const intervalUnitInput = wrk.dom.id('intervalUnitInput');
const resetPageButton = wrk.dom.id('resetPageButton')

// Attaching callback to the onchange of the inputs isn't allowed using html,
// so do through javascript
activationCheckbox.onchange = saveSettings;
intervalSizeInput.onchange = saveSettings;
intervalUnitInput.onchange = saveSettings;
resetPageButton.addEventListener('mouseup', sendResetPageMessage)

var settings = {};

// Load the settings
chrome.storage.sync.get(data => {
    settings = data;

    activationCheckbox.checked = settings.activated;
    intervalSizeInput.value = settings.updateIntervalSize;
    intervalUnitInput.value = settings.updateIntervalUnits;
});

function saveSettings() {
    settings.activated = activationCheckbox.checked;
    settings.updateIntervalSize = Number(intervalSizeInput.value);
    settings.updateIntervalUnits = Number(intervalUnitInput.value);
    chrome.storage.sync.set(settings);
}

function sendResetPageMessage() {
    chrome.extension.sendMessage({greeting: 'resetPage'});
}