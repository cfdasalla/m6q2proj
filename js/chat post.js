let messagesToAdd = [];

for (let i = messages.length - 1; i >= 0; i--) {
	if (messages[i][0] == "m") {
		if (i == messages.length - 1) {
			if (messages[i].length == 3) {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2], function() {
						setTimeout(toggleOnline, d3.randomInt(2000, 3001)());
						setTimeout(function() {
							$("#chat").append(`<a class="btn btn-ian" href="https://xtian.dev/m6q2proj" role="button" style="display:inline-block">Next</a>`)
						}, 3000);
					});
				});
			} else {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2], function() {
						setTimeout(toggleOnline, d3.randomInt(2000, 3001)());
						setTimeout(function() {
							$("#chat").append(`<a class="btn btn-ian" href="https://xtian.dev/m6q2proj" role="button" style="display:inline-block">Next</a>`)
						}, 3000);
					}, messages[i][3]);
				});
			}
		} else {
			if (messages[i].length == 3) {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2], messagesToAdd[i + 1]);
				});
			} else {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2], messagesToAdd[i + 1], messages[i][3]);
				});
			}
		}
	} else if (messages[i][0] == "p") {
		if (i == messages.length - 1) {
			messagesToAdd.unshift(function() {
				addPoll(messages[i][1], messages[i][2], messages[i][3], messages[i][4], messages[i][5], messages[i][6], messages[i][7], messages[i][8]);
			});
		} else {
			messagesToAdd.unshift(function() {
				addPoll(messages[i][1], messages[i][2], messages[i][3], messages[i][4], messages[i][5], messages[i][6], messages[i][7], messages[i][8], messagesToAdd[i + 1]);
			});
		}
	} else if (messages[i][0] = "t") {
		if (i == messages.length - 1) {
			messagesToAdd.unshift(function() {
				addTypedPoll(messages[i][1], messages[i][2], messages[i][3], messages[i][4], messages[i][5], messages[i][6], messages[i][7]);
			});
		} else {
			messagesToAdd.unshift(function() {
				addTypedPoll(messages[i][1], messages[i][2], messages[i][3], messages[i][4], messages[i][5], messages[i][6], messages[i][7], messagesToAdd[i + 1]);
			});
		}
	}
}

$("#chat button").click(function() {
	toggleOnline();
	setTimeout(function() {
		messagesToAdd[0]();
	}, d3.randomInt(500, 1001)());
	$("#chat button").hide();
});
