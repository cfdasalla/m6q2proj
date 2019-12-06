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

let r2d = d3.randomInt(1, 3)();

random2 = new Polynomial();
random2.randomize(r2d);

random2W = [];

for (let y = 0; y < 3; y++) {
	random2W[y] = new Polynomial();
	random2W[y].randomize(r2d - 1);
}

let [random3, random4, random5] = [new Polynomial(), new Polynomial(), new Polynomial()];
let [r3d, r4d, r5d] = [d3.randomInt(1, 3)(), d3.randomInt(1, 3)(), d3.randomInt(1, 3)()];
random3.randomize(r3d); random4.randomize(r4d); random5.randomize(r5d);

let [random3W, random4W, random5W] = [[], [], []];

for (let z = 0; z < 3; z++) {
	random3W[z] = new Polynomial();
	random3W[z].randomize(r3d - 1);
	random4W[z] = new Polynomial();
	random4W[z].randomize(r4d - 1);
	random5W[z] = new Polynomial();
	random5W[z].randomize(r5d - 1);
}

// For polls: question, options, correct answer, right feedback, wrong feedback, ulit feedback, prepend to answer, postpend to answer

let messages = [
	["m", "Uy, IO! Kamusta?", right],
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
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "Kapag nabigyan naman tayo ng polynomial, maaari tayo magdifferentiate isa-isa sa bawat term.", left, 4000],
	["m", "Halimbawa, \\(" + random2.display() + "\\).", left, 4000],
	["p", "\\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + random2.display() + ")\\)", {
		a: "\\(" + random2.derivative().display() + "\\)",
		b: "\\(" + random2W[0].display() + "\\)",
		c: "\\(" + random2W[1].display() + "\\)",
		d: "\\(" + random2W[2].display() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "Sige, para mas lalo kang mahawa sa paggamit ng power rule, bibigyan kita ng short quiz.", left, 5000],
	["m", "Number 1:", left, 1000],
	["p", "\\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + random3.display() + ")\\)", {
		a: "\\(" + random3.derivative().display() + "\\)",
		b: "\\(" + random3W[0].display() + "\\)",
		c: "\\(" + random3W[1].display() + "\\)",
		d: "\\(" + random3W[2].display() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "Number 2!", left, 1000],
	["p", "\\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + random4.display() + ")\\)", {
		a: "\\(" + random4.derivative().display() + "\\)",
		b: "\\(" + random4W[0].display() + "\\)",
		c: "\\(" + random4W[1].display() + "\\)",
		d: "\\(" + random4W[2].display() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "Isa pa siguro...", left, 1500],
	["p", "\\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + random5.display() + ")\\)", {
		a: "\\(" + random5.derivative().display() + "\\)",
		b: "\\(" + random5W[0].display() + "\\)",
		c: "\\(" + random5W[1].display() + "\\)",
		d: "\\(" + random5W[2].display() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "O ayan, nagets mo na ba kung pano yung power rule?", left, 3000],
	["m", "Oo, salamat sa pagturo sa 'kin nito!", right],
	["m", "Walang anuman!", left, 1000],
	["m", "Good luck pala sa quiz bukas!", left, 2000],
	["m", "OMG MAY QUIZ???", right]
];

let messagesToAdd = [];

for (let i = messages.length - 1; i >= 0; i--) {
	if (messages[i][0] == "m") {
		if (i == messages.length - 1) {
			if (messages[i].length == 3) {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2], function() {
						setTimeout(toggleOnline, d3.randomInt(2000, 3001)());
					});
				});
			} else {
				messagesToAdd.unshift(function() {
					addMessage(messages[i][1], messages[i][2], function() {
						setTimeout(toggleOnline, d3.randomInt(2000, 3001)());
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
