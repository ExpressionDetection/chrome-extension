const state = {
  tabOpened: false,
  lastUrl: null,
  currentUrl: null,
};

function closeTab() {
  const container = document.querySelector(".custom-container");
  if (container) {
    container.classList.remove("animate-microfacial-iframe");
    container.classList.add("hide-microfacial-iframe");
    state.tabOpened = false;
  }
}

function openTab() {
  const container = document.querySelector(".custom-container");
  if (container) {
    container.classList.add("animate-microfacial-iframe");
    container.classList.remove("hide-microfacial-iframe");
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
  // console.log("content.js =================>", message);
  const iframeExists = document.querySelector("#iframe-reel");
  if (iframeExists) {
    return true;
  }

  if (message.type === "microfacial.onTabUpdated") {
    fetch(chrome.runtime.getURL("templates/index.html"))
      .then((response) => response.text())
      .then((html) => {
        let tabContainerDiv = document
          .createRange()
          .createContextualFragment(html);
        document.body.appendChild(tabContainerDiv);
        let crossImage = document.querySelector(".header-close");
        crossImage.src = chrome.extension.getURL("images/hamburger.svg");
        crossImage.addEventListener("click", function() {
          closeTab();
        });
        document
          .querySelector(".tab-container")
          .addEventListener("click", function() {
            openTab();
            if (state.currentUrl !== state.lastUrl) {
              refreshIframeURL();
            }
          });
        return true;
      });
  }
  return true;
}

chrome.runtime.onMessage.addListener(messageReceived);
