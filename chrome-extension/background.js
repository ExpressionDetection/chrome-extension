chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  try {
    // console.log("LOADED", changeInfo, tab);
    if (
      /meet\.google\.com|teams\.live\.com|zoom\.us/gi.test(tab.url) &&
      changeInfo.status === "complete"
    ) {
      console.log("SENT", changeInfo, tab);
      chrome.tabs.sendMessage(
        tabId,
        { type: "expression-detection.onVideoConferenceTab", url: tab.url, tabId: tabId },
        {},
        function(response) {}
      );
    }
  } catch (error) {
    console.log("Chrome Tab Listener Error: ", error);
  }
  return true;
});
