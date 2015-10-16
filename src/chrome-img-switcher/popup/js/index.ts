module Popup {
    function sendMessage(message: any, cb?: (response: any) => void): void {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, message, cb);
        });
    }

    $(() => {
        $("#swap-image").click(function () {
            sendMessage({
                name: $(this).is(':checked') ? "swap-image-on" : "swap-image-off"
            });
        });
    });
}