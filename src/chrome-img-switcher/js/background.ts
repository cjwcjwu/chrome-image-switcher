module Back {
    var popupWin;

    // Add a click listener
    chrome.browserAction.onClicked.addListener((tab) => {
        if (!popupWin) {
            chrome.windows.create({
                url: `popup/index.html?tabId=${tab.id}`,
                type: "popup",
                width: 1150,
                height: 700
            }, (win) => {
                popupWin = win;
            });
        }
    });
}


