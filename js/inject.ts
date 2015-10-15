$(function() {
	// $("#dm-pix-calculator a").live("click", function(){
	// 	var basePx = $("#dm-pix-calculator #base-pixel").val();
	// 	var targetPx = $("#dm-pix-calculator #target-pixel").val();
	// 	var ems = targetPx/basePx;
	// 	$("#dm-pix-calculator #result").text(ems);
	// });
});

// Add chrome extension listener
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
// 	if (request.action == "toggle_editmode") {
// 		// toggle the edit mode
// 		var isEditable = PageDesigner.getEditMode();
// 		isEditable = !isEditable;
//
// 		if(isEditable) {
// 			PageDesigner.turnEditOn();
// 		} else { //remove editing capabilities
// 			PageDesigner.turnEditOff();
// 		}
//
// 		// send a response back to the background script
// 		var responseText = isEditable ? "on" : "off";
// 		sendResponse({"edit_mode": responseText});
// 	}
// });
