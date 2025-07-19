let currentTabId = null;
let currentTabUrl = "";
let currentStartTime = null;
function generateReadableTaskName(url) {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    const domain = hostname.split(".")[0];
    const capitalized = domain.charAt(0).toUpperCase() + domain.slice(1);
    return `Browsing ${capitalized}`;
  } catch (error) {
    return "Browsing Unknown";
  }
}
// Send activity to backend
function sendActivity(url, duration) {
  const taskName = generateReadableTaskName(url);

  const payload = {
    task: taskName,
    duration: Math.floor(duration / 60), // in minutes
    url: url,
  };

  fetch("http://localhost:5000/api/activity/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => console.error("Failed to send activity:", err));
}

// When user switches tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    // Ignore internal Chrome pages
    if (!tab || !tab.url || tab.url.startsWith("chrome://")) return;

    if (tab.url.startsWith("http")) {
      // Calculate duration for previous tab
      if (currentTabId !== null && currentTabUrl && currentStartTime) {
        const duration = Date.now() - currentStartTime;
        sendActivity(currentTabUrl, duration);
      }

      currentTabId = activeInfo.tabId;
      currentTabUrl = tab.url;
      currentStartTime = Date.now();
    }
  } catch (error) {
    console.error("Error getting tab info:", error);
  }
});

// When tab content changes (refresh, navigation, etc.)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete" && tab.url && tab.url.startsWith("http") && !tab.url.startsWith("chrome://")) {
    if (currentTabId !== null && currentTabUrl && currentStartTime) {
      const duration = Date.now() - currentStartTime;
      sendActivity(currentTabUrl, duration);
    }

    currentTabId = tabId;
    currentTabUrl = tab.url;
    currentStartTime = Date.now();
  }
});

// When user closes Chrome or extension is disabled
chrome.windows.onRemoved.addListener(() => {
  if (currentTabUrl && currentStartTime) {
    const duration = Date.now() - currentStartTime;
    sendActivity(currentTabUrl, duration);
  }
});