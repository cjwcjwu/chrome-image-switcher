// Add a click listener
chrome.browserAction.onClicked.addListener((tab) => {
    // Send a message to the content script
    chrome.tabs.sendMessage(tab.id, { action: "toggle_editmode" }, function (response) {
        if (response.edit_mode == 'on') {
            // Update the tooltip and add badge text
            chrome.browserAction.setTitle({ 'tabId': tab.id, 'title': 'Edit Mode: ON' });
            chrome.browserAction.setBadgeText({ 'tabId': tab.id, 'text': 'On' });
        } else {
            // Update the tooltip and remove the badge text
            chrome.browserAction.setTitle({ 'tabId': tab.id, 'title': 'Edit Mode: Off' });
            chrome.browserAction.setBadgeText({ 'tabId': tab.id, 'text': '' });
        }
    });
    
});





// var popup, currentTab;
chrome.runtime.onMessage.addListener((message, sender) => {
    switch (message.name) {
        case "edit-backgroup":
            message.tabId = sender.tab.id;
            var url = Object.keys(message).map((k) => {
                return encodeURIComponent(k) + '=' + encodeURIComponent(message[k]);
            }).join('&');

            chrome.windows.create({
                url: "backgroup-editor/index.html?" + url,
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


