// Add a click listener
chrome.browserAction.onClicked.addListener(function(tab) {
	// Send a message to the content script
	chrome.tabs.sendMessage(tab.id, {action: "toggle_editmode"}, function(response) {
		if (response.edit_mode == 'on') {
			// Update the tooltip and add badge text
			chrome.browserAction.setTitle({'tabId': tab.id, 'title': 'Edit Mode: ON'});
			chrome.browserAction.setBadgeText({'tabId': tab.id, 'text': 'On'});
		} else {
			// Update the tooltip and remove the badge text
			chrome.browserAction.setTitle({'tabId': tab.id, 'title': 'Edit Mode: Off'});
			chrome.browserAction.setBadgeText({'tabId': tab.id, 'text': ''});
		}
	});
});



// var popup, currentTab;
// chrome.browserAction.onClicked.addListener(function (tab) {
//     if (!popup) {
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             currentTab = tabs[0];
//             chrome.windows.create({
//                 url: "index.html",
//                 type: "popup",
//                 width: 1150,
//                 height: 700
//             });
//         });
//     }
// });
// chrome.commands.onCommand.addListener(function (command) {
//     if (popup) {
//         try {
//             switch (command) {
//                 case 'screenshot':
//                     popup.takeScreenshot();
//                     break;
//                 case 'cursor':
//                     popup.toggleCursor();
//                     break;
//                 case 'wait':
//                     popup.toggleGetWaitFor();
//                     break;
//                     ;
//             }
//         }
//         catch (e) {
//         }
//     }
// });
