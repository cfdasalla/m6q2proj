let currentRecipient = io;

let nextChapter = "../3/"

let [r1, r2, r3] = [new Polynomial(), new Polynomial(), new Polynomial()];
let [r1w, r2w, r3w] = [[], [], []];

// First example: reverse power rule with one term, without introducing +C

r1.randomize(d3.randomInt(2, 5)());

for (let y = 0; y < r1.coefficients.length - 1; y++) {
	r1.coefficients[y] = 0;
}

let r1c = r1.indefinite();
r1c.coefficients[0] = 0;

for (let x = 0; x < 3; x++) {
	r1w[x] = new Polynomial();
}

r1w[0].copy(r1.derivative());

r1w[1].copy(r1.indefinite());
r1w[1].coefficients.shift();

r1w[2].copy(r1.derivative());
r1w[2].coefficients[0] = 0;
r1w[2].coefficients.unshift(0);

// Second example: introduction of +C

r2.randomize(d3.randomInt(2, 4)());

for (let y = r2.coefficients.length - 2; y > 0; y--) {
	r2.coefficients[y] = 0;
}

let [r2_a, r2_b] = [new Polynomial(), new Polynomial()];

r2_a.copy(r2);
r2_b.copy(r2);

r2_a.coefficients[0] = r2.coefficients[0] + d3.randomInt(1, 11)();
r2_b.coefficients[0] = r2.coefficients[0] - d3.randomInt(1, 11)();

for (let u = 0; u < 3; u++) {
	r2w[u] = new Polynomial();
	r2w[u].copy(r1w[u]);
	r2w[u].coefficients[0] = "C";
}

// Third example: indefinite integral of a polynomial

r3d = d3.randomInt(1, 3)();

r3.randomize(r3d);

for (let y = 0; y < 3; y++) {
	r3w[y] = new Polynomial();
}

r3w[0].copy(r3);
r3w[0].coefficients[0] = "C";

r3w[1].copy(r3.indefinite());
r3w[1].coefficients.shift();
r3w[1].coefficients[0] = "C";

r3w[2].copy(r3);
r3w[2].coefficients.unshift("C");

// Quiz

let [rq1, rq2, rq3] = [new Polynomial(), new Polynomial(), new Polynomial()];
let [rq1d, rq2d, rq3d] = [d3.randomInt(1, 3)(), d3.randomInt(1, 3)(), d3.randomInt(1, 3)()];

rq1.randomize(rq1d);
rq2.randomize(rq2d);
rq3.randomize(rq3d);

let [rq1w, rq2w] = [[], []];

for (let z = 0; z < 3; z++) {
	for (let i of [rq1w, rq2w]) {
		i[z] = new Polynomial();
	}
}

for (let i of [[rq1w, rq1], [rq2w, rq2]]) {
	i[0][0].copy(i[1]);
	i[0][0].coefficients[0] = "C";
	
	i[0][1].copy(i[1].indefinite());
	i[0][1].coefficients.shift();
	i[0][1].coefficients[0] = "C";
	
	i[0][2].copy(i[1]);
	i[0][2].coefficients.unshift("C");
}

// For polls: question, options, correct answer, right feedback, wrong feedback, ulit feedback, prepend to answer, postpend to answer

let messages = [
	["m", "l", "Uy, Cal! 👋🏽"],
	["m", "l", "Sagutan na natin yung pair work!"],
	["m", "r", "Sige!"],
	["m", "r", "Yun nga lang…"],
	["m", "r", "…hindi ko pa masyado gets yung concepts 😣"],
	["m", "l", "Ganun ba?"],
	["m", "l", "Turuan na lang kita habang ginagawa natin."],
	["m", "l", "So yung topic kasi natin ay reverse power rule."],
	["m", "l", "Naalala mo pa ba yung power rule na ginawa natin dati sa derivatives?"],
	["m", "r", "Medyo…"],
	["m", "l", "Masasabi nating medyo baliktad yung strategy na ’to sa reverse power rule na lesson natin ngayon."],
	["m", "l", "Para mag-integrate gamit ang reverse power rule, kailangan nating dagdagan ng 1 yung exponent natin, tapos magdi-divide tayo ng kaparehas na number sa mismong term."],
	["m", "l", "Bale, pag nag-reverse power rule tayo sa isang term, kunyari \\(ax^b\\), ang integral niya ay \\(\\frac{a}{b+1}x^{b+1}\\)."],
	["m", "r", "Parang ang gulo naman nun… 😕"],
	["m", "l", "Sige, bigyan kita ng example."],
	["p", "Ano ang lalabas pag ginamitan ng reverse power rule ang \\(" + r1.latex() +"\\)?", {
		a: "\\(" + r1c.latex() + "\\)",
		b: "\\(" + r1w[0].latex() + "\\)",
		c: "\\(" + r1w[1].latex() + "\\)",
		d: "\\(" + r1w[2].latex() + "\\)",
	}, "a", "Yun!", "Hindi eh…", "Subukin ulit natin.", "", " ba?"],
	["m", "r", "OK, gets ko na! Madali lang pala ’to eh."],
	["m", "l", "Teka lang!", 500],
	["m", "r", "Bakit?"],
	["m", "l", "Hindi pa dun nagtatapos ang reverse power rule."],
	["m", "r", "Ha? Eh mukha namang tama yung sagot ah?"],
	["m", "l", "Tama naman yung sagot natin, pero may nakakalimutan tayo."],
	["m", "l", "Ano ang derivative ng \\(" + r2.latex() + "\\)?"],
	["m", "r", "\\(" + r2.derivative().latex() + "\\), diba?"],
	["m", "l", "Tama…"],
	["m", "l", "Pero ano naman ang derivative ng \\(" + r2_a.latex() + "\\)?"],
	["m", "r", "\\(" + r2_a.derivative().latex() + "\\) din…"],
	["m", "l", "Ano naman ang derivative ng \\(" + r2_b.latex() + "\\)?"],
	["m", "r", "\\(" + r2_b.derivative().latex() + "\\) pa rin!"],
	["m", "l", "Dahil ang integration ang kabaligtaran ng differentiation, alin dun sa tatlo ang pwedeng integral ng \\(" + r2_b.derivative().latex() + "\\)?"],
	["m", "r", "Hala! Pwede kahit alin sa kanila! 😲"],
	["m", "l", "Oo. Kahit nga ano pa yung constant sa dulo, pwede pa rin siyang integral ng \\(" + r2_b.derivative().latex() + "\\)."],
	["m", "r", "Pa’no yun? Ano yung integral niya kung maraming pwedeng sagot? 🤔"],
	["m", "l", "Kelangan nating isama lahat ng pwedeng maging integral ng function na yun."],
	["m", "l", "Dahil dun, kailangan nating magdagdag ng \\(+C\\) sa dulo ng makukuha natin sa reverse power rule."],
	["m", "l", "Pwede nating palitan si \\(C\\) ng kahit anong real number, at tama pa rin yung sagot natin."],
	["m", "r", "Ah! Ganun pala yun! Kaya pala may nakikita akong \\(C\\) dun sa libro natin."],
	["m", "l", "Ngayon, balikan natin yung unang halimbawa natin."],
	["p", "\\[\\int{" + r1.latex() + "\\mathrm{d}x}\\]", {
		a: "\\(" + r1.indefinite().latex() + "\\)",
		b: "\\(" + r2w[0].latex() + "\\)",
		c: "\\(" + r2w[1].latex() + "\\)",
		d: "\\(" + r2w[2].latex() + "\\)"
	}, "a", "Yun!", "Hindi eh…", "Subukin ulit natin.", "", " ba?"],
	["m", "l", "Wag mong kakalimutan yung \\(+C\\) sa dulo ng sagot pag nag-integrate ka."],
	["m", "l", "Pag nalimutan mong ilagay yun, mamamali yung sagot mo."],
	["m", "r", "OK! Aalalahanin ko lagi!"],
	["m", "r", "Nga pala…"],
	["m", "r", "Pwede rin bang mag-integrate nang pa-isa-isa kapag polynomial?"],
	["m", "l", "Ay! Buti pinaalala mo!"],
	["m", "l", "Gaya ng sa pag-differentiate, pwede mo ring isa-isahin ang pag-integrate sa polynomial."],
	["m", "l", "Halimbawa, \\(" + r3.latex() + "\\)."],
	["p", "\\[\\int{(" + r3.latex() + ")\\mathrm{d}x}\\]", {
		a: "\\(" + r3.indefinite().latex() + "\\)",
		b: "\\(" + r3w[0].latex() + "\\)",
		c: "\\(" + r3w[1].latex() + "\\)",
		d: "\\(" + r3w[2].latex() + "\\)"
	}, "a", "Yun!", "Hindi eh…", "Subukin ulit natin.", "", " ba yung sagot?"],
	["m", "l", "O, mukhang gets mo na ’tong reverse power rule."],
	["m", "l", "Gawin na natin ’tong pairwork!"],
	["m", "l", "Number 1:"],
	["p", "\\[\\int{(" + rq1.latex() + ")\\mathrm{d}x}\\]", {
		a: "\\(" + rq1.indefinite().latex() + "\\)",
		b: "\\(" + rq1w[0].latex() + "\\)",
		c: "\\(" + rq1w[1].latex() + "\\)",
		d: "\\(" + rq1w[2].latex() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh…", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "l", "Number 2!"],
	["p", "\\[\\int{(" + rq2.latex() + ")\\mathrm{d}x}\\]", {
		a: "\\(" + rq2.indefinite().latex() + "\\)",
		b: "\\(" + rq2w[0].latex() + "\\)",
		c: "\\(" + rq2w[1].latex() + "\\)",
		d: "\\(" + rq2w[2].latex() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh…", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "l", "Last na!"],
	["m", "l", "Ngayon, ikaw naman mag-type!"],
	["t", "\\[\\int{(" + rq3.latex() + ")\\mathrm{d}x}\\]", rq3.indefinite().latex(), "Nice! Natama mo!", "Hindi eh…", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "l", "O ayan! Natapos na natin yung pairwork!"],
	["m", "r", "Yehey! Salamat ulit sa pagturo sa ’kin! 😁"],
	["m", "l", "Walang anuman!"],
	["m", "l", "May quiz pala bukas, ha!"],
	["m", "l", "Good luck! Kaya mo yan!"],
	["m", "r", "Ha? May quiz bukas?! 😱"]
];