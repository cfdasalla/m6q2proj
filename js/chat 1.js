let currentRecipient = io;

let messages = [
	["m", "hello", right],
	["m", "are you busy rn?", right],
	["m", "No, why?", left, 2000],
	["m", "i need help with the seatwork kanina", right],
	["m", "Sure!", left, 1000],
	["m", "Which item?", left],
	["m", "number 7", right],
	["m", "\\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(2x^2+4x+3)\\)", right],
	["p", "\\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(2x^2+4x+3)=?\\)", ["\\(4x+4\\)","\\(4x+7\\)","\\(2x+4\\)","\\(2x+7\\)"], 0, "is the answer ", "?"],
	["m", "Do you get it now?", left, 3000],
	["m", "ya, tenkyu!!", right],
	["m", "No problem!", left, 1500],
	["m", "Good luck on the quiz tomorrow!", left, 3500],
	["m", "omg may quiz??!", right]
];

let messagesToAdd = [];

for (let i = messages.length - 1; i >= 0; i--) {
	if (messages[i][0] == "m") {
		if (i == messages.length - 1) {
			if (messages[i].length == 3) {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2]);
					setTimeout(toggleOnline, d3.randomInt(2000, 3001)());
				});
			} else {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2], undefined, messages[i][3]);
					setTimeout(toggleOnline, d3.randomInt(2000, 3001)());
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
				addPoll(messages[i][1], messages[i][2], messages[i][3], messages[i][4], messages[i][5]);
			});
		} else {
			messagesToAdd.unshift(function() {
				addPoll(messages[i][1], messages[i][2], messages[i][3], messagesToAdd[i + 1], messages[i][4], messages[i][5]);
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