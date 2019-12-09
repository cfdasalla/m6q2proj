let currentRecipient = io;

let [r1, r2, r3] = [new Polynomial(), new Polynomial(), new Polynomial()];
let [r1w, r2w, r3w] = [[], [], []];

// First example: reverse power rule with one term, without introducing +C

r1.randomize(d3.randomInt(1, 5)());

for (let y = 0; y < r1.coefficients.length - 1; y++) {
	r1.coefficients[y] = 0;
}

let r1c = r1.indefinite();
r1c.coefficients[0] = 0;

for (let x = 0; x < 3; x++) {
	r1w[x] = new Polynomial();
	r1w[x].setValues([...r1.coefficients], [...r1.signs]);
}

r1w[0].coefficients.unshift(0);
r1w[0].signs.unshift("+");

r1w[1] = r1w[1].indefinite();
r1w[1].coefficients[0] = 0;
r1w[1].coefficients.unshift(0);
r1w[1].signs.unshift("+");

r1w[2].coefficients.shift();
r1w[2].signs.shift();
r1w[2] = r1w[2].indefinite();
r1w[2].coefficients[0] = 0;

// Second example: introduction of +C

r2.randomize(d3.randomInt(2, 4)());

for (let y = r2.coefficients.length - 2; y > 0; y--) {
	r2.coefficients[y] = 0;
}

let [r2_a, r2_b] = [new Polynomial(), new Polynomial()];

r2_a.setValues([...r2.coefficients], [...r2.signs]);
r2_b.setValues([...r2.coefficients], [...r2.signs]);

r2_a.coefficients[0] = r2.coefficients[0] + d3.randomInt(1, 11)();
let r2_br = d3.randomInt(1, 11)();
r2_b.coefficients[0] = r2.coefficients[0] - r2_br >= 0 ? r2.coefficients[0] - r2_br : 0;

for (let u = 0; u < 3; u++) {
	r2w[u] = new Polynomial();
	r2w[u].setValues([...r1w[u].coefficients], [...r1w[u].signs]);
	r2w[u].coefficients[0] = "C";
}

// Third example: indefinite integral of a polynomial

r3d = d3.randomInt(1, 3)();

r3.randomize(r3d);

for (let y = 0; y < 3; y++) {
	r3w[y] = new Polynomial();
	r3w[y].randomize(r3d + 1);
	
	for (let o = 1; o < r3.coefficients.length; o++) {
		r3w[y].coefficients[o] = new Fraction(d3.randomInt(minCoef, maxCoef + 1)(), o);
	}
	
	r3w[y].coefficients[0] = "C";
	r3w[y].signs[0] = "+";
}

// Quiz

let [rq1, rq2, rq3] = [new Polynomial(), new Polynomial(), new Polynomial()];
let [rq1d, rq2d, rq3d] = [d3.randomInt(1, 3)(), d3.randomInt(1, 3)(), d3.randomInt(1, 3)()];

rq1.randomize(rq1d);
rq2.randomize(rq2d);
rq3.randomize(rq3d);

let [rq1w, rq2w, rq3w] = [[], [], []];

for (let z = 0; z < 3; z++) {
	[rq1w[z], rq2w[z], rq3w[z]] = [new Polynomial(), new Polynomial(), new Polynomial()];
	
	rq1w[z].randomize(rq1.indefinite().coefficients.length - 1);
	rq2w[z].randomize(rq2.indefinite().coefficients.length - 1);
	rq3w[z].randomize(rq3.indefinite().coefficients.length - 1);
	
	for (let o = 1; o < rq1w[z].length; o++) {
		rq1w[z].coefficients[o] = new Fraction(d3.randomInt(minCoef, maxCoef + 1)(), o);
	}

	for (let o = 1; o < rq2w[z].length; o++) {
		rq2w[z].coefficients[o] = new Fraction(d3.randomInt(minCoef, maxCoef + 1)(), o);
	}
	
	for (let o = 1; o < rq3w[z].length; o++) {
		rq3w[z].coefficients[o] = new Fraction(d3.randomInt(minCoef, maxCoef + 1)(), o);
	}
	
	[rq1w[z].coefficients[0], rq2w[z].coefficients[0], rq3w[z].coefficients[0]] = ["C", "C", "C"];
	[rq1w[z].signs[0], rq2w[z].signs[0], rq3w[z].signs[0]] = ["+", "+", "+"];
}

// For polls: question, options, correct answer, right feedback, wrong feedback, ulit feedback, prepend to answer, postpend to answer

let messages = [
	["m", "Uy, Cal! 👋🏽", left, 1000],
	["m", "Sagutan na natin yung pair work!", left, 3000],
	["m", "Sige!", right],
	["m", "Yun nga lang...", right],
	["m", "...hindi ko pa masyado gets yung concepts 😣", right],
	["m", "Ganun ba?", left, 1000],
	["m", "Turuan na lang kita habang ginagawa natin.", left, 2500],
	["m", "So yung topic kasi natin ay reverse power rule.", left, 2500],
	["m", "Naalala mo pa ba yung power rule na ginawa natin dati sa derivatives?", left, 3000],
	["m", "Medyo...", right],
	["m", "Masasabi nating medyo baliktad yung strategy na 'to sa reverse power rule na lesson natin ngayon.", left, 3500],
	["m", "Para mag-integrate gamit ang reverse power rule, kailangan nating dagdagan ng 1 yung exponent natin, tapos magdi-divide tayo ng kaparehas na number sa mismong term.", left, 6000],
	["m", "Bale, pag nag-reverse power rule tayo sa isang term, kunyari \\(ax^b\\), ang integral niya ay \\(\\frac{a}{b+1}x^{b+1}\\).", left, 4000],
	["m", "Parang ang gulo naman nun... 😕", right],
	["m", "Sige, bigyan kita ng example.", left],
	["p", "Ano ang lalabas pag ginamitan ng reverse power rule ang \\(" + r1.display() +"\\)?", {
		a: "\\(" + r1c.display() + "\\)",
		b: "\\(" + r1w[0].display() + "\\)",
		c: "\\(" + r1w[1].display() + "\\)",
		d: "\\(" + r1w[2].display() + "\\)",
	}, "a", "Yun!", "Hindi eh...", "Subukin ulit natin.", "", " ba?"],
	["m", "OK, gets ko na! Madali lang pala 'to eh.", right],
	["m", "Teka lang!", left, 500],
	["m", "Bakit?", right],
	["m", "Hindi pa dun nagtatapos ang reverse power rule.", left, 1500],
	["m", "Ha? Eh mukha namang tama yung sagot ah?", right],
	["m", "Tama naman yung sagot natin, pero may nakakalimutan tayo.", left, 2000],
	["m", "Ano ang derivative ng \\(" + r2.display() + "\\)?", left, 2000],
	["m", "\\(" + r2.derivative().display() + "\\), diba?", right],
	["m", "Tama...", left],
	["m", "Pero ano naman ang derivative ng \\(" + r2_a.display() + "\\)?", left, 2500],
	["m", "\\(" + r2_a.derivative().display() + "\\) din...", right],
	["m", "Ano naman ang derivative ng \\(" + r2_b.display() + "\\)?", left, 2500],
	["m", "\\(" + r2_b.derivative().display() + "\\) pa rin!", right],
	["m", "Dahil ang integration ang kabaligtaran ng differentiation, ano ang pwedeng integral ng \\(" + r2_b.derivative().display() + "\\)?", left, 4000],
	["m", "Hala! Pwede kahit alin dun sa tatlo kanina! 😲", right],
	["m", "Oo. Kahit nga ano pa yung constant sa dulo, parehas pa rin yung integral niya.", left, 3000],
	["m", "Pa'no yun? Ano yung integral niya kung maraming pwedeng sagot? 🤔", right],
	["m", "Kelangan nating isama lahat ng pwedeng maging integral ng function na yun.", left, 2500],
	["m", "Dahil dun, kailangan nating magdagdag ng \\(+C\\) sa dulo ng makukuha natin sa reverse power rule.", left, 3500],
	["m", "Pwede nating palitan si \\(C\\) ng kahit anong real number, at tama pa rin yung sagot natin.", left, 3000],
	["m", "Ah! Ganun pala yun! Kaya pala may nakikita akong \\(C\\) dun sa libro natin.", right],
	["m", "Ngayon, balikan natin yung unang halimbawa natin.", left, 2000],
	["p", "\\[\\int{" + r1.display() + "\\mathrm{d}x}\\]", {
		a: "\\(" + r1.indefinite().display() + "\\)",
		b: "\\(" + r2w[0].display() + "\\)",
		c: "\\(" + r2w[1].display() + "\\)",
		d: "\\(" + r2w[2].display() + "\\)"
	}, "a", "Yun!", "Hindi eh...", "Subukin ulit natin.", "", " ba?"],
	["m", "Wag mong kakalimutan yung \\(+C\\) sa dulo ng sagot pag nag-integrate ka.", left, 2500],
	["m", "Pag nalimutan mong ilagay yun, mamamali yung sagot mo.", left, 2000],
	["m", "OK! Aalalahanin ko lagi!", right],
	["m", "Nga pala...", right],
	["m", "Pwede rin bang mag-integrate nang pa-isa-isa kapag polynomial?", right],
	["m", "Ay! Buti pinaalala mo!", left, 1000],
	["m", "Gaya ng sa pag-differentiate, pwede mo ring isa-isahin ang pag-integrate sa polynomial.", left, 2500],
	["m", "Halimbawa, \\(" + r3.display() + "\\).", left, 1000],
	["p", "\\[\\int{(" + r3.display() + ")\\mathrm{d}x}\\]", {
		a: "\\(" + r3.indefinite().display() + "\\)",
		b: "\\(" + r3w[0].display() + "\\)",
		c: "\\(" + r3w[1].display() + "\\)",
		d: "\\(" + r3w[2].display() + "\\)"
	}, "a", "Yun!", "Hindi eh...", "Subukin ulit natin.", "", " ba yung sagot?"],
	["m", "O, mukhang gets mo na 'tong reverse power rule.", left, 1500],
	["m", "Gawin na natin 'tong pairwork!", left, 1000],
	["m", "Number 1:", left, 1000],
	["p", "\\[\\int{(" + rq1.display() + ")\\mathrm{d}x}\\]", {
		a: "\\(" + rq1.indefinite().display() + "\\)",
		b: "\\(" + rq1w[0].display() + "\\)",
		c: "\\(" + rq1w[1].display() + "\\)",
		d: "\\(" + rq1w[2].display() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "Number 2!", left, 1000],
	["p", "\\[\\int{(" + rq2.display() + ")\\mathrm{d}x}\\]", {
		a: "\\(" + rq2.indefinite().display() + "\\)",
		b: "\\(" + rq2w[0].display() + "\\)",
		c: "\\(" + rq2w[1].display() + "\\)",
		d: "\\(" + rq2w[2].display() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "Isa pa siguro...", left, 1500],
	["p", "\\[\\int{(" + rq3.display() + ")\\mathrm{d}x}\\]", {
		a: "\\(" + rq3.indefinite().display() + "\\)",
		b: "\\(" + rq3w[0].display() + "\\)",
		c: "\\(" + rq3w[1].display() + "\\)",
		d: "\\(" + rq3w[2].display() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "O ayan! Natapos na natin yung pairwork!", left, 1500],
	["m", "Yehey! Salamat ulit sa pagturo sa 'kin! 😁", right],
	["m", "Walang anuman!", left, 1000],
	["m", "May quiz pala bukas, ha!", left, 1500],
	["m", "Good luck! Kaya mo yan!", left, 1000],
	["m", "Ha? May quiz bukas?! 😱", right]
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
