let currentRecipient = io;

let nextChapter = "../2/"

let [r1, r2] = [new Polynomial(), new Polynomial()];
let [r1w, r2w] = [[], []];

// First example: derivative of one term

r1.randomize(d3.randomInt(2, 5)());

for (let y = 0; y < r1.coefficients.length - 1; y++) {
	r1.coefficients[y] = 0;
}

for (let x = 0; x < 3; x++) {
	r1w[x] = new Polynomial(r1.coefficients);
}

r1w[0].copy(r1);
r1w[0].coefficients.shift();

r1w[1].copy(r1.derivative());
r1w[1].coefficients.shift();

r1w[2].copy(r1.derivative());
r1w[2].coefficients.unshift(0);

// Second example: derivative of a polynomial

let r2d = d3.randomInt(2, 4)();

r2.randomize(r2d);

for (let y = 0; y < 3; y++) {
	r2w[y] = new Polynomial();
}

r2w[0].copy(r2);
r2w[0].coefficients[0] = 0;

r2w[1].copy(r2);
r2w[1].coefficients.shift();

r2w[2].copy(r2.derivative());
r2w[2].coefficients.unshift(0);

// Quiz

let [rq1, rq2, rq3] = [new Polynomial(), new Polynomial(), new Polynomial()];
let [rq1d, rq2d, rq3d] = [d3.randomInt(2, 4)(), d3.randomInt(2, 4)(), d3.randomInt(2, 4)()];

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
	shuffle(i[0][0].coefficients);
	i[0][0].coefficients[0] = 0;
	
	i[0][1].copy(i[1]);
	i[0][1].coefficients.shift();
	
	i[0][2].copy(i[1].derivative());
	shuffle(i[0][2].coefficients);
	i[0][2].coefficients.unshift(0);
}

// For polls: question, options, correct answer, right feedback, wrong feedback, ulit feedback, prepend to answer, postpend to answer

let messages = [
	["m", "Uy, IO! Kamusta?", right],
	["m", "Okay naman. Ikaw?", left],
	["m", "Okay naman din, pero… medyo nahihirapan ako sa Math eh.", right],
	["m", "Ah. Ano na ba topic niyo?", left],
	["m", "Power rule. May quiz nga kami bukas eh, tapos di ko gets yung lesson. GG na 😭", right],
	["m", "Ay hala… sige, turuan kita!", left],
	["m", "Legit?", right],
	["m", "Oo naman! 😁", left],
	["m", "Sige, bago tayo mag-discuss ng power rule, pag-usapan muna natin yung derivatives.", left],
	["m", "Ang derivative ng isang function ay ang sukat ng pagbabago ng y-component ng function sa pagbago ng x-component ng function. Masasabi rin natin na ito ang slope sa lahat ng points ng function.", left],
	["m", "Ang power rule ay isang strategy ng paghanap ng derivative (o tinatawag na <b>differentiation</b>). Kadalasan siyang ginagamit pag ang term o expression na idi-differentiate ay may exponent.", left],
	["m", "Para makapag-differentiate gamit ang power rule, imu-multiply natin yung coefficient ng term sa exponent niya tapos babawasan natin ng 1 ang exponent.", left],
	["m", "Kumbaga, binababa natin yung exponent tapos nagmi-minus 1 tayo sa exponent.", left],
	["m", "Halimbawa, \\(" + r1.latex() + "\\).", left],
	["p", "\\[\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r1.latex() + ")\\]", {
		a: "\\(" + r1.derivative().latex() + "\\)",
		b: "\\(" + r1w[0].latex() + "\\)",
		c: "\\(" + r1w[1].latex() + "\\)",
		d: "\\(" + r1w[2].latex() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "OK! Mukhang madali lang ’to, ah!", right],
	["m", "Teka lang...", right],
	["m", "Paano naman kung constant lang yung meron? 🤔", right],
	["m", "Magandang tanong ’yan!", left],
	["m", "Sige, isipin natin...", left],
	["p", "Ano ba ang <i>degree</i> ng isang constant?", {
		a: ["1", "Degree 1 ’yun, diba?"],
		b: ["0", "Degree 0 ’yun, diba?"],
		c: ["wala", "Wala namang degree ’yun, diba?"]
	}, "b", "Ayun!", "Hindi...", "Isipin mo ulit."],
	["m", "So dahil degree 0 ang isang constant, para mo na rin siyang nilagyan ng invisible na \\(x^0\\).", left],
	["m", "Dahil sinasabi ng power rule na imu-multiply natin sa coefficient yung exponent, magiging 0 na yung coefficient niya.", left],
	["m", "So magiging 0 yung derivative niya?", right],
	["m", "Oo!", left],
	["m", "At kahit ano pang constant ang gamitin natin, 0 lagi ang magiging derivative niya.", left],
	["m", "Wow! Ang galing naman nun!", right],
	["m", "Kapag binigyan naman tayo ng polynomial, maaari nating isa-isahin ang pag-differentiate sa bawat term.", left],
	["m", "Halimbawa, \\(" + r2.latex() + "\\).", left],
	["p", "\\[\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r2.latex() + ")\\]", {
		a: "\\(" + r2.derivative().latex() + "\\)",
		b: "\\(" + r2w[0].latex() + "\\)",
		c: "\\(" + r2w[1].latex() + "\\)",
		d: "\\(" + r2w[2].latex() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "Sige, para mas lalo kang mahasa sa paggamit ng power rule, bibigyan kita ng short quiz.", left],
	["m", "Number 1:", left],
	["p", "\\[\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + rq1.latex() + ")\\]", {
		a: "\\(" + rq1.derivative().latex() + "\\)",
		b: "\\(" + rq1w[0].latex() + "\\)",
		c: "\\(" + rq1w[1].latex() + "\\)",
		d: "\\(" + rq1w[2].latex() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "Number 2!", left],
	["p", "\\[\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + rq2.latex() + ")\\]", {
		a: "\\(" + rq2.derivative().latex() + "\\)",
		b: "\\(" + rq2w[0].latex() + "\\)",
		c: "\\(" + rq2w[1].latex() + "\\)",
		d: "\\(" + rq2w[2].latex() + "\\)"
	}, "a", "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "Isa pa siguro...", left],
	["m", "Ngayon, ikaw naman mag-type!", left],
	["t", "\\[\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + rq3.latex() + ")\\]", rq3.derivative().latex(), "Nice! Natama mo!", "Hindi eh...", "Subukin mo ulit! Mahahanap mo rin yung tamang sagot.", "", " ba yung sagot?"],
	["m", "O ayan, na-gets mo na ba kung pa’no yung power rule?", left],
	["m", "Oo, salamat sa pagturo sa ’kin nito!", right],
	["m", "Walang anuman!", left],
	["m", "Good luck pala sa quiz bukas!", left],
	["m", "Salamat!", right]
];