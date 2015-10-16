module Cis {
    var activeDiv: HTMLElement;

    $("div").each(function () {
        var $this = $(this);
        var backgroundImage = window.getComputedStyle(this).backgroundImage;
        if (backgroundImage) {
            $this.dblclick((event) => {
                event.stopPropagation();
                activeDiv = $this[0];
                $this.css("box-shadow", "blue 0 0 12px 1px");

                var style = window.getComputedStyle(this);
                if (style.backgroundImage) {
                    chrome.runtime.sendMessage({
                        name: "edit-backgroup",
                        url: style.backgroundImage.slice(4, -1),
                        positionX: style.backgroundPositionX,
                        positionY: style.backgroundPositionY,
                        width: style.width,
                        height: style.height
                    });
                }
            });
        }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        switch (message.name) {
            case "set-backgroup-position":
                $(activeDiv).css('background-position', message.positionX + "px " + message.positionY + "px");
                break;
        }
    });
}

    //    box-shadow: red 0 0 12px 1px;
