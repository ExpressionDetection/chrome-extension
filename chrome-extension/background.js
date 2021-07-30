chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  try {
    // console.log("LOADED", changeInfo, tab);
    if (
      /meet\.google\.com|teams\.live\.com/gi.test(tab.url) &&
      changeInfo.status === "complete"
    ) {
      // console.log("SENT", changeInfo, tab);
      chrome.tabs.sendMessage(
        tabId,
        { type: "microfacial.onTabUpdated", url: tab.url, tabId: tabId },
        {},
        function(response) {}
      );
    }
  } catch (error) {
    console.log("ERROR", error);
  }
  return true;
});
