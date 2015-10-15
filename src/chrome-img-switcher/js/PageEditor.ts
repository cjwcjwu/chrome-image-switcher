/* Page Designer */
var PageDesigner = (function () {
    var isEditMode = false;
    var badgeObj;

    var configVars = {
        menuText: "Design Mode",
        htmlClass: "design-mode",
        badgeClass: "designer-menu"
    };

    var getEditMode = function () {
        return isEditMode;
    }

    var turnEditOn = function () {
        isEditMode = true;
        badgeObj = $("<div id='chrome-tool-designer'></div>");
        badgeObj.addClass(configVars.badgeClass).attr("contenteditable", false).html("<h4>" + configVars.menuText + "</h4>");

        var html = "<div></div>";
        $(html).load(chrome.extension.getURL("src/inject/DesignMenu.html"),function (data) {
            html = data;

            $(html).appendTo(badgeObj);

            $("body").append(badgeObj);

          //  window.count = 1;

            $("html").addClass(configVars.htmlClass);

            //disable link clicking
            $("a").attr("href", "javascript: void(0)");

            //make draggable
            $("#chrome-tool-designer").draggable();
            $("#accordion").accordion({
                heightStyle: "content"
            });
            //Add tablet to body
            var tablet = "<div class='design-mode-tablet'><img src='http://www.7apps.net/Content/images/Mobile/ipad.jpg' alt='ipad'/><iframe id='frm' src='" + window.location + "' height='300px' width='300px'></iframe></div>";
           $("body").append($(tablet));
          //  $(".design-mode-mobile").click(function () {
          //      $(".design-mode-tablet").toggleClass("preview");
          //      //iterateIframe();
          //      $("iframe").load(function () {
          //          var ifr = document.getElementById("frm")
          //          var anchors = ifr.contentDocument.getElementsByTagName("img");
          //          var p = 0;
          //          for (var i in anchors) {
          //              anchors[i].setAttribute("data-monacoId", p);
          //              p++;
          //          }
          //      });
          //  });

            //Turn on text editing
            // $(".text-editing").click(function () {
            //     var span = $(this).find("span");
            //     if (span.text() === "OFF") {
            //         $("h1, h2, h3, h4, h5, h6, p").attr("contenteditable", "");
            //         span.text("ON");
            //     }
            //     else {
            //         $("h1, h2, h3, h4, h5, h6, p").removeAttr("contenteditable", "");
            //         span.text("OFF");
            //     }
            // });

            //Setup drag and drop
            $("img, .hero").each(function () {
                DragAndDrop.setup($(this));
            });



            // //Turn on color editing
            // console.log("Setting up color editor");
            // ColorEditor.setup();
            //
            // iterate();
            // //stop the hero
            // console.log("stopping hero");
            // Store.heroSlider.stop();
        });
    }
    function iterate(el) {
        var i = 0;
        console.log("iterating...");
        $("img").each(function () {
            $(this).attr("data-monacoId", i);
            i++;
        });
    }
    //            $("iframe").contents().find(".hero img").attr("src", fileString)

    function iterateIframe() {
        var i = 0;
        console.log("iterating iframe...");
        $("iframe").contents().find("img").each(function () {
            $(this).attr("data-monacoId", i);
            console.log("found iframe img..." + i);

            i++;
        });
    }
    var turnEditOff = function () {
        isEditMode = false;
        badgeObj.remove();

        $("html").removeClass(configVars.htmlClass);
    }

    return {
        turnEditOn: turnEditOn,
        turnEditOff: turnEditOff,
        getEditMode: getEditMode
    };
})();
