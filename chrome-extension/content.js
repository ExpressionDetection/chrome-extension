const state = {
  tabOpened: false,
  currentUrl: null
};

function toggleTab() {
  const container = document.querySelector(".super-container");
  if (container) {
    const arrowLeft = document.querySelector(".tab-container .arrow-left");
    const arrowRight = document.querySelector(".tab-container .arrow-right");
    container.classList.remove(state.tabOpened ? "animate-expression-detection-iframe-open" : "animate-expression-detection-iframe-close");
    container.classList.add(state.tabOpened ? "animate-expression-detection-iframe-close" : "animate-expression-detection-iframe-open");
    arrowLeft.hidden = state.tabOpened ? false : true;
    arrowRight.hidden = state.tabOpened ? true : false;
    state.tabOpened = !state.tabOpened;
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
    return fetch(chrome.runtime.getURL("templates/index.html"))
      .then((response) => response.text())
      .then((html) => {
        const tabContainerDiv = document
          .createRange()
          .createContextualFragment(html);
        document.body.appendChild(tabContainerDiv);
        const logo = document.querySelector(".tab-container .logo");
        logo.src = chrome.extension.getURL("images/logo.svg");
        const arrowLeft = document.querySelector(".tab-container .arrow-left");
        arrowLeft.src = chrome.extension.getURL("images/arrow.svg");
        const arrowRight = document.querySelector(".tab-container .arrow-right");
        arrowRight.src = chrome.extension.getURL("images/arrow.svg");
        arrowRight.hidden = true;
        document
          .querySelector(".tab-container")
          .addEventListener("click", function() {
            toggleTab();
          });
        return true;
      });
  }
  return true;
}

chrome.runtime.onMessage.addListener(messageReceived);
