module Back {
    import DraggableEventUiParams = JQueryUI.DraggableEventUIParams;
    var QueryString = function () {
        // This function is anonymous, is executed immediately and 
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    } ();

    var framePositionX: number,
        framePositionY: number,
        tabId;

    $(() => {
        $("#set-position").click(() => {
            if (framePositionX != undefined && framePositionY != undefined) {

                chrome.tabs.sendMessage(tabId, {
                    name: "set-backgroup-position",
                    positionX: framePositionX * -1,
                    positionY: framePositionY * -1
                });
            }
        });

        tabId = parseInt(QueryString["tabId"]);
        var url = QueryString["url"];
        var image = new Image();
        image.src = url;
        $("#image").attr({
            "src": url
        });

        var top = <string>QueryString["positionY"];
        if (top.charAt(0) === "-") {
            top = top.substring(1);
        } else {
            top = "-" + top;
        }

        var left = <string>QueryString["positionX"];
        if (left.charAt(0) === "-") {
            left = left.substring(1);
        } else {
            left = "-" + left;
        }
        $("#frame").css({
            width: QueryString["width"],
            height: QueryString["height"],
            top: top,
            left: left
        });
        $("#frame").draggable({
            stop: (event, ui: DraggableEventUiParams) => {
                framePositionX = ui.position.left;
                framePositionY = ui.position.top;
            }
        });
        // var canvas = <HTMLCanvasElement>document.getElementById("editor");
        // canvas.getContext("2d");

        // var ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        // image.onload = () => {
        //ctx.drawImage(image, 69, 50);
        // };
    });
}

