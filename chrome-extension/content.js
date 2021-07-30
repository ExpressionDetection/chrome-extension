const state = {
  tabOpened: false,
  currentUrl: null
};

function closeTab() {
  const container = document.querySelector(".custom-container");
  if (container) {
    container.classList.remove("animate-expression-detection-iframe");
    container.classList.add("hide-expression-detection-iframe");
    state.tabOpened = false;
  }
}

function openTab() {
  const container = document.querySelector(".custom-container");
  if (container) {
    container.classList.add("animate-expression-detection-iframe");
    container.classList.remove("hide-expression-detection-iframe");
    state.tabOpened = true;
  }
}

async function queryAsync(query, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = document.querySelector(query);
      resolve(item);
    }, timer);
  });
}

async function messageReceived(message, sender, sendResponse) {
  const iframeExists = document.querySelector("#iframe-expression-detection");
  if (iframeExists) {
    return true;
  }

  // Render the extension HTML/IFrame when we find that the user is on a tab 
  // which URL is one of the choosen video conference applications (Microsoft Teams, Google Meet, etc..)
  if (message.type === "expression-detection.onVideoConferenceTab") {
    fetch(chrome.runtime.getURL("templates/index.html"))
      .then((response) => response.text())
      .then((html) => {
        const tabContainerDiv = document
          .createRange()
          .createContextualFragment(html);
        document.body.appendChild(tabContainerDiv);
        const crossImage = document.querySelector(".header-close");
        crossImage.src = chrome.extension.getURL("images/hamburger.svg");
        crossImage.addEventListener("click", function() {
          closeTab();
        });
        document
          .querySelector(".tab-container")
          .addEventListener("click", function() {
            openTab();
          });
        return true;
      });
  }
  return true;
}

chrome.runtime.onMessage.addListener(messageReceived);
