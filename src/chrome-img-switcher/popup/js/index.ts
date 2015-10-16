module Popup {
    var queryString = (() => {
        // This function is anonymous, is executed immediately and 
        // the return value is assigned to QueryString!
        var queryString = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof queryString[pair[0]] === "undefined") {
                queryString[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof queryString[pair[0]] === "string") {
                var arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
                queryString[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                queryString[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return queryString;
    })();
    var tabId: number,
        framePositionX: number,
        framePositionY: number;

    function sendMessage(message: any, cb?: (response: any) => void): void {
        chrome.tabs.sendMessage(tabId, message, cb);
    }

    function showBackgroundEditor(config) {
        var url = config["url"];

        $("#image").attr({
            "src": url
        });

        var top = <string>config["positionY"];
        if (top.charAt(0) === "-") {
            top = top.substring(1);
        } else {
            top = "-" + top;
        }

        var left = <string>config["positionX"];
        if (left.charAt(0) === "-") {
            left = left.substring(1);
        } else {
            left = "-" + left;
        }
        $("#frame").css({
            width: config["width"],
            height: config["height"],
            top: top,
            left: left
        });
        $("#frame").draggable({
            stop: (event, ui) => {
                framePositionX = ui.position.left;
                framePositionY = ui.position.top;
            }
        });

        $("#myModal").modal("show");
    }

    function switchFeatures() {
        sendMessage({
            name: "swith-features",
            swapImage: $("#swap-image").is(":checked"),
            editContent: $("#edit-content").is(":checked"),
            changeBackground: $("#change-background").is(":checked")
        });
    }

    $(() => {
        tabId = parseInt(queryString["tabId"]);
        $("#swap-image").click(() => {
            switchFeatures();
        });

        $("#edit-content").click(() => {
            switchFeatures();
        });

        $("#change-background").click(() => {
            switchFeatures();
        });

        $("#set-position").click(() => {
            if (framePositionX != undefined && framePositionY != undefined) {

                chrome.tabs.sendMessage(tabId, {
                    name: "set-backgroup-position",
                    positionX: framePositionX * -1,
                    positionY: framePositionY * -1
                });
            }
        });

        $(window).unload(() => {
            sendMessage({
                name: "swith-features",
                swapImage: false,
                editContent: false,
                changeBackground: false
            });

            var bg: any = chrome.extension.getBackgroundPage();
            bg.popupWin = null;
        });
    });

  

    // var popup, currentTab;
    chrome.runtime.onMessage.addListener((message, sender) => {
        switch (message.name) {
            case "edit-background":
                showBackgroundEditor(message);
                break;
        }

    });
}