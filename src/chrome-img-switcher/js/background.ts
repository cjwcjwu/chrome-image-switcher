var popupWin;

module Back {
    // Add a click listener
    chrome.browserAction.onClicked.addListener((tab) => {
        if (!popupWin) {
            chrome.windows.create({
                url: `popup/index.html?tabId=${tab.id}`,
                type: "popup",
                width: 540,
                height: 310
            }, (win) => {
                popupWin = win;
            });
        }
    });
}


