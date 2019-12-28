let messagesToAdd = [];

for (let i = messages.length - 1; i >= 0; i--) {
	let x = messages[i];
	
	if (x[0] == "m") {
		if (i == messages.length - 1) {
			messagesToAdd.unshift(function() {
				setTimeout(function() {
					addMessage(x[1], x[2], function() {
						setTimeout(function() {
							toggleOnline();
							setTimeout(function() {
								$("#chat").append(`<a class="btn animated fadeInUp faster" href="${nextChapter}" role="button" style="display:inline-block">Next</a>`);
								$("a").addClass("btn-" + currentRecipient.first.toLowerCase());
								updateScroll();
							}, 2000);
						}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
					}, timeDelay(x[1].length));
				}, (x[2] == "right" ? timeDelay(x[1].length, true) : 0) + (x[2] == "left" ? 800 : i == 0 ? 800 : timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true, false)));
			});
		} else {
			messagesToAdd.unshift(function() {
				setTimeout(function() {
					addMessage(x[1], x[2], messagesToAdd[i + 1], timeDelay(x[1].length));
				}, (x[2] == "right" ? timeDelay(x[1].length, true) : 0) + (x[2] == "left" ? 800 : i == 0 ? 800 : timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true, false)));
			});
		}
	} else if (x[0] == "p") {
		messagesToAdd.unshift(function() {
			setTimeout(function() {
				addPoll(x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], i == messages.length - 1 ? undefined : messagesToAdd[i + 1]);
			}, i == 0 ? 0 : timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true, false));
		});
	} else if (x[0] = "t") {
		messagesToAdd.unshift(function() {
			setTimeout(function() {
				addTypedPoll(x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], i == messages.length - 1 ? undefined : messagesToAdd[i + 1]);
			}, i == 0 ? 0 : timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true, false));
		});
	}
}

$("#chat button").click(function() {
	toggleOnline();
	setTimeout(function() {
		messagesToAdd[0]();
	}, d3.randomInt(500, 1001)());
	$("#chat button").hide();
	
	started = true;
});
