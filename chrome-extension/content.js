// const BASE_PATH = "https://app.joinreel.co";
// console.log("LOADED");

const state = {
  tabOpened: false,
  lastUrl: null,
  currentUrl: null,
};

function closeTab() {
  const container = document.querySelector(".custom-container");
  if (container) {
    container.classList.remove("animate-reel-iframe");
    container.classList.add("hide-reel-iframe");
    state.tabOpened = false;
  }
}

function openTab() {
  const container = document.querySelector(".custom-container");
  if (container) {
    container.classList.add("animate-reel-iframe");
    container.classList.remove("hide-reel-iframe");
    state.tabOpened = true;
  }
}

// function captureVideo(video) {
//   var canvas = document.createElement("canvas");
//   canvas.width = video.videoWidth;
//   canvas.height = video.videoHeight;
//   var canvasContext = canvas.getContext("2d");
//   canvasContext.drawImage(video, 0, 0);
//   const dataURL = canvas.toDataURL("image/png");
//   return { dataURL, width: video.videoWidth, height: video.videoHeight };
// }

async function messageReceived(message, sender, sendResponse) {
  console.log("content.js =================>", message);
  const iframeExists = document.querySelector("#iframe-reel");
  if (iframeExists) {
    return true;
  }

  if (message.type === "reel.onTabUpdated") {
    fetch(chrome.runtime.getURL("templates/index.html"))
      .then((response) => response.text())
      .then((html) => {
        let tabContainerDiv = document
          .createRange()
          .createContextualFragment(html);
        document.body.appendChild(tabContainerDiv);
        let crossImage = document.querySelector(".header-close");
        // document.querySelector(".tab-logo").src = chrome.extension.getURL(
        //   "images/logo-white.svg"
        // );
        // document.querySelector(".dots-img").src = chrome.extension.getURL(
        //   "images/dots.png"
        // );
        // document.querySelector(
        //   ".header-black-logo"
        // ).src = chrome.extension.getURL("images/logo.svg");
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
      });
  }
  return true;
}

chrome.runtime.onMessage.addListener(messageReceived);
