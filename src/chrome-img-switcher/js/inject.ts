module Inject {
    var activeDiv: HTMLElement,
        isFeatureOn = false;

    function setBackground(event: any) {
        if (activeDiv) {
            $(activeDiv).removeAttr("chrome-img-switcher-edit-background");
        }

        event.stopPropagation();
        activeDiv = event.target;
        // $(activeDiv).css("box-shadow", "#B00 0 0 20px 3px");

        $(activeDiv).attr({ "chrome-img-switcher-edit-background": true });

        var style = window.getComputedStyle(event.target);
        if (style.backgroundImage) {
            chrome.runtime.sendMessage({
                name: "edit-background",
                url: style.backgroundImage.slice(4, -1),
                positionX: style.backgroundPositionX,
                positionY: style.backgroundPositionY,
                width: style.width,
                height: style.height
            });
        }
    }

    function featureOn() {
        isFeatureOn = true;
        $("div").each(function () {
            var backgroundImage = window.getComputedStyle(this).backgroundImage;
            if (backgroundImage) {
                $(this).on("dblclick", setBackground);
            }
        });
    }

    function featureOff() {
        isFeatureOn = false;
        if (activeDiv) {
            $(activeDiv).removeAttr("chrome-img-switcher-edit-background");
            activeDiv = null;
        }
        $("div").each(function () {
            $(this).off("dblclick", setBackground);
        });
    }

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        switch (message.name) {
            case "set-backgroup-position":
                $(activeDiv).css('background-position', message.positionX + "px " + message.positionY + "px");
                break;
            case "swith-features":
                if (isFeatureOn !== message.changeBackground) {
                    if (message.changeBackground) {
                        featureOn();
                    } else {
                        featureOff();
                    }
                }
                break;
        }
    });
}

    //    box-shadow: red 0 0 12px 1px;
