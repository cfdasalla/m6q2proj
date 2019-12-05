let currentRecipient = io;

random1 = new Polynomial();
random1.randomize(d3.randomInt(2, 5)());

for (let y = 0; y < random1.coefficients.length - 1; y++) {
	random1.coefficients[y] = 0;
}

random1W = [];

for (let x = 0; x < 3; x++) {
	random1W[x] = new Polynomial();
}

random1W[0].setValues(random1.coefficients.slice(1, random1.coefficients.length), random1.signs.slice(1, random1.signs.length));
random1W[1].setValues([0].concat(random1.coefficients), ["+"].concat(random1.signs));
random1W[2].setValues([0].concat(random1.derivative().coefficients), ["+"].concat(random1.derivative().signs));

// For polls: question, options, correct answer, right feedback, wrong feedback, ulit feedback, prepend to answer, postpend to answer

let messages = [
	["m", "Uy, Io! Kamusta?", right],
	["m", "Okay naman. Ikaw?", left, 2000],
	["m", "Okay naman din, pero… medyo nahihirapan ako sa Math eh.", right],
	["m", "Ahhh. Ano na ba topic niyo?", left, 2500],
	["m", "Power rule. May quiz nga kami bukas eh, tapos di ko gets yung lesson. GG na.", right],
	["m", "Ayyy hala. Oh sige, turuan kita!", left, 2500],
	["m", "Legit?", right],
	["m", "Oo naman!", left, 1000],
	["m", "Sige, bago tayo mag-discuss ng power rule, pag-usapan muna natin yung derivatives.", left, 5000],
	["m", "(insert derivatives short discussion: as slope)", left, 3000],
	["m", "Ang power rule ay isang strategy ng pag-differentiate. Kadalasan siyang ginagamit pag ang term o expression na ididifferentiate ay may exponent.", left, 7000],
	["m", "Para makapag-differentiate gamit ang power rule, imumultiply natin yung coefficient ng term sa exponent niya tapos magsusubtract tayo ng 1 sa exponent.", left, 8000],
	["m", "Kumbaga, binababa natin yung exponent tapos nagmiminus 1 tayo sa exponent.", left, 4500],
	["m", "Halimbawa, \\(" + random1.display() + "\\).", left, 4000],
	["p", "\\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + random1.display() + ")\\)", {
		a: "\\(" + random1.derivative().display() + "\\)",
		b: "\\(" + random1W[0].display() + "\\)",
		c: "\\(" + random1W[1].display() + "\\)",
		d: "\\(" + random1W[2].display() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"]
	/*
	["Kapag nabigyan naman tayo ng polynomial, maaari tayo magdifferentiate isa-isa sa bawat term."]
	["Halimbawa, <rng polynomial>"]
	["Sige, para mas lalo kang mahawa sa paggamit ng power rule, bibigyan kita ng short quiz."]
	["<enter OG chie the game>]
	*/
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
				addPoll(messages[i][1], messages[i][2], messages[i][3], messages[i][4], messages[i][5], messages[i][6], messages[i][7], messages[i][8]);
			});
		} else {
			messagesToAdd.unshift(function() {
				addPoll(messages[i][1], messages[i][2], messages[i][3], messages[i][4], messages[i][5], messages[i][6], messages[i][7], messages[i][8], messagesToAdd[i + 1]);
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