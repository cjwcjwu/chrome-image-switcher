// Add a click listener
chrome.browserAction.onClicked.addListener((tab) => {
    chrome.windows.create({
        url: `popup/index.html?tabId=${tab.id}`,
        type: "popup",
        width: 1150,
        height: 700
    });
});

// var popup, currentTab;
chrome.runtime.onMessage.addListener((message, sender) => {
    switch (message.name) {
        case "edit-backgroup":
            message.tabId = sender.tab.id;
            var url = Object.keys(message).map((k) => {
                return encodeURIComponent(k) + "=" + encodeURIComponent(message[k]);
            }).join("&");

            chrome.windows.create({
                url: `backgroup-editor/index.html?${url}`,
                type: "popup",
                width: 1150,
                height: 700
            }, (win) => {
                chrome.runtime.sendMessage({
                    name: "tab-id",
                    id: win.tabs[0].id
                });

            });
            break;

        default:
    }

});


