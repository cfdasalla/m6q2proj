let currentRecipient = cal;

let messages = [
	["m", "hello", right],
	["m", "may ginagawa ka ba?", right],
	["m", "wala naman, bakit?", left, 2000],
	["m", "patulong naman dun sa seatwork kanina", right],
	["m", "sige", left, 1000],
	["m", "anong number ba?", left],
	["m", "yung number 7", right],
	["m", "\\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(2x^2+4x+3)\\)", right],
	["p", "\\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(2x^2+4x+3)=?\\)", ["\\(4x+4\\)","\\(4x+7\\)","\\(2x+4\\)","\\(2x+7\\)"], 0, "ba yung sagot?"],
	["m", "so gets mo na?", left, 3000]
];

let messagesToAdd = [];

for (let i = messages.length - 1; i >= 0; i--) {
	if (messages[i][0] == "m") {
		if (i == messages.length - 1) {
			if (messages[i].length == 3) {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2]);
				});
			} else {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2], undefined, messages[i][3]);
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
	} else {
		if (i == messages.length - 1) {
			messagesToAdd.unshift(function() {
				addPoll(messages[i][1], messages[i][2], messages[i][3], messages[i][4]);
			});
		} else {
			messagesToAdd.unshift(function() {
				addPoll(messages[i][1], messages[i][2], messages[i][3], messagesToAdd[i + 1], messages[i][4]);
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

$(function() {
	// messagesToAdd[0]();
})