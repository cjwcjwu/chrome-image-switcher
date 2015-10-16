/* Drag and Drop */
//Setup drag and drop
$(() => {
    $("img, .hero, a, div, span").each(function () {
        DragAndDrop.setup($(this));
    });
    $("h1, h2, h3, h4, h5, h6, p, a").attr("contenteditable", "true");
    //$("h1, h2, h3, h4, h5, h6, p, a").removeAttr("contenteditable");
});
var DragAndDrop = (() => {
    var selectedElement;
    var configVars = {
        dragClass: "drag-over"
    };

    var dragOver = event => {
        doNothing(event);

        var element = event.target;
        $(element).addClass(configVars.dragClass);
    }

    var dragLeave = e => {
        doNothing(e);

        var element = e.target;
        $(element).removeClass(configVars.dragClass);
    }

    var dropHandler = event => {
        doNothing(event);

        var element = event.target;
        selectedElement = $(element);
        $(element).removeClass(configVars.dragClass);

        // Get the file(s) that are dropped.
        var filelist = event.dataTransfer.files;
        if (!filelist) return;  // if null, exit now
        var filecount = filelist.length;  // get number of dropped files

        if (filecount === 1) {
            // Do something with the files.
            var file = filelist[0];
            if (file) {
                readFile(file);
            }
        }

        if (filecount > 1) {
            setup360(filelist);
        }
    }

    var doNothing = event => {
        event.stopPropagation();
        event.preventDefault();
    }

    var readFile = readFile => {
        var reader = new FileReader();

        //For TEXT FILES Read file into memory as UTF-16
        //reader.readAsText(readFile, "UTF-8");
        switch (readFile.type) {
        case "image/png":
        case "image/jpeg":
        case "image/jpg":
            reader.readAsDataURL(readFile);
            reader.onload = loaded;
            break;
        // case "text/plain":
        //     reader.readAsText(readFile);
        //     reader.onload = textloaded;
        //     break;
        default:
            doNothing(null);
            return;
        }

        // Handle progress, success, and errors
        reader.onerror = errorHandler;
    }


    var loaded = evt => {
        // Obtain the read file data.
        var url = evt.target.result;
        if (selectedElement.is("img")) {
            selectedElement.attr("src", url);
        } else if (selectedElement.is("a, div, span")
            && selectedElement.css('background-image')
            && !(selectedElement.css("background-image") === "none")) {
            selectedElement.css("background-image", "url('" + url.replace(/(\r\n|\n|\r)/gm, "") + "')");
        } else {
            selectedElement.parents(".hero").find("img").attr("src", url);
        }
        $(".preview").draggable();
    }

    var setup360 = files => {
        var rdr;
        for (var i = 0; i < files.length; i++) {
            rdr = new FileReader();
            rdr.readAsDataURL(files[i]);
            //rdr.onload = function (evt) {
            //}
            loadsingle(rdr, i);
        };

        function loadsingle(rdr: any, i: any) {
            rdr.onload = evt => {
                var flstring = evt.target.result;
                $(".images-container img").eq(i).attr("src", flstring);
            }
        }

        //$(".images-container img").eq(0).addClass("active");
    }

    var errorHandler = evt => {
        if (evt.target.error.name == "NotReadableError") {
            // The file could not be read.
        }
    }

    var setup = elem => {
        var element = elem.get(0);
        element.addEventListener("drop", dropHandler, false);
        element.addEventListener("dragleave", dragLeave, false);
        element.addEventListener("dragover", dragOver, false);
    }

    return {
        setup: setup
    };
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.name) {
        case "swith-features":
            console.log(message);
            break;
    }
});
