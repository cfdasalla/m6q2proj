let currentRecipient = io;

let nextChapter = "../"

// First example: d/dx (degree 1 / degree 1)

maxCoef = 10;

let [r1a, r1b] = [new Polynomial(), new Polynomial()];
r1a.randomize(1);
r1b.randomize(1);
let r1 = new Rational(r1a, r1b);

// Second example: d/dx (degree 2 * degree 1)

let [r2a, r2b] = [new Polynomial(), new Polynomial()];
r2a.randomize(1);
r2b.randomize(1);
let r2 = new Rational(r2a, r2b);

// Third example: d/dx (degree 2 * degree 2)

let [r3a, r3b] = [new Polynomial(), new Polynomial()];
r3a.randomize(2);
r3b.randomize(1);
let r3 = new Rational(r3a, r3b);

// For polls: question, options, correct answer, right feedback, wrong feedback, ulit feedback, prepend to answer, postpend to answer

let messages = [
	["d", "Match the notation to the mathematician.", {
    a: ["\\(\\frac{\\mathrm{d}y}{\\mathrm{d}x}\\)", "Leibniz"],
    b: ["\\(\\dot y\\\)", "Newton"],
    c: ["\\(y'\\)", "Lagrange"],
    d: ["\\(Dy\\)", "Euler"]
	}, "Tama lahat!", "Mukhang may mali…", "Ulitin kaya natin?", "Tama ba ’to?"]/*,
	["m", "r", "Uy IO!"],
  ["m", "r", "Patulong naman dun sa bagong seatwork…"],
  ["m", "l", "Bakit, ano'ng meron?"],*/
];
