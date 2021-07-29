const BASE_PATH = 'https://app.joinreel.co';
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('close').addEventListener('click', function () {
    window.close();
  });
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    onTabsResponse
  );
  async function onTabsResponse(tabs) {
    const currentTab = tabs[0];
    const link = BASE_PATH + '/extension';
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', link);
    iframe.frameBorder = 0;
    iframe.marginwidth = 0;
    iframe.marginheight = 0;
    iframe.scrolling = 'auto';
    document.querySelector('.iframe-container').appendChild(iframe);
    iframe.classList.add('frame');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      const site = tab[0].url;
      const link = BASE_PATH + '/extension' + '?url=' + site;
      iframe.src = link;
    });
  }
});
