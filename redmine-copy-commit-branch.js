(function(funcName, baseObj) {

    var ticketNumberObj = $('#content > h2');
    var ticketTitleObj = $('#content div.subject h3');
	var trackers = ['Fehler', 'Feature', 'Unterstützung', 'Extern', 'Epic']
	var replableChars = ['\/', '\"', '\[', '\]', '\{', '\}', '\:', '\.'];

    var commit = $('<a title="copy commit comment" class="btn btn-sm btn-outline-dark icon icon-comment" href="#" style="margin-left: 10px;"/>',)
        .click(function(event) {
			event.preventDefault();
            copyToClipboard(ticketNumberObj.text() + " " + ticketTitleObj.text());
        });
		
	var branch = $('<a title="copy branch name" class="btn btn-sm btn-outline-dark icon icon-projects" href="#" style="margin-left: 10px;"/>',)
        .click(function(event) {
			event.preventDefault();
			
			var ticketNumberString = ticketNumberObj.text();
			var branchType = "feature";

			var trachersIdx;
			for (trachersIdx = 0; trachersIdx < trackers.length; trachersIdx++) { 
				if (ticketNumberString.startsWith(trackers[0])) {
					branchType = "bugfix";
				}
				ticketNumberString = ticketNumberString.replace(trackers[trachersIdx], "");
			}

			var ticketTitleString = ticketTitleObj.text();

			var charsIdx;
			for (charsIdx = 0; charsIdx < replableChars.length; charsIdx++) { 
				ticketTitleString = ticketTitleString.replace(new RegExp('\\' + replableChars[charsIdx], 'g'), "");
			}
			ticketTitleString = ticketTitleString.replace(new RegExp(" ", 'g'), "_")
			ticketTitleString = ticketTitleString.substr(0, 50);
			
            copyToClipboard(branchType + "/" + ticketNumberString.trim() + "_" + ticketTitleString);
        });

	var timeular = $('<a title="copy timeular comment" class="btn btn-sm btn-outline-dark icon icon-time-add" href="#" style="margin-left: 10px;"/>',)
        .click(function(event) {
			event.preventDefault();
			
			var ticketNumberString = ticketNumberObj.text();
			for (trachersIdx = 0; trachersIdx < trackers.length; trachersIdx++) { 
				ticketNumberString = ticketNumberString.replace(trackers[trachersIdx], "");
			}
			
            copyToClipboard(ticketNumberString);
        });

    if ($("#content div.subject h3 > a.icon-copy").length === 0) {
        $("#content div.subject h3").append(commit);
		$("#content div.subject h3").append(branch);
		$("#content div.subject h3").append(timeular);
    };

    function copyToClipboard(text){
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute('value', text);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

})("docReady", window);