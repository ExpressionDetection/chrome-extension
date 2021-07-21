chrome.runtime.onUpdateAvailable.addListener(function() {
  chrome.runtime.reload();
});
chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  try {
    console.log("LOADED");
    if (/meet\.google\.com/gi.test(tab.url)) {
      chrome.webNavigation.getAllFrames(
        {
          tabId: tabId,
        },
        (iframes) => {
          const iFrame = iframes.find(
            (iframe) => iframe.url === "http://localhost:3000/timeline"
          );
          if (iFrame) {
            console.log("SENDING MESSAGE", iFrame);
            chrome.tabs.sendMessage(
              tabId,
              { message: "OLAAAA" },
              { frameId: iFrame.frameId }
            );
          }
        }
      );
      // const frames = chrome.webNavigation
      //   .getAllFrames({
      //     tabId: tabId,
      //   })
      //   .then((frames) => {
      //     console.log(frames);
      //   });
      chrome.tabs.sendMessage(
        tabId,
        { type: "reel.onTabUpdated", url: tab.url, tabId: tabId },
        {},
        function(response) {}
      );
    }
  } catch (error) {
    console.log("ERROR", error);
  }
});
