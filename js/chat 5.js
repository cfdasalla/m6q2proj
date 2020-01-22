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
	["m", "r", "Uy IO!"],
  ["m", "r", "Patulong naman dun sa bagong seatwork…"],
  ["m", "l", "Bakit, ano’ng meron?"],
	["m", "r", "Diba pag kumukuha ng derivative, magsusulat ng \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}\\)?"],
	["m", "l", "Oo."],
	["m", "r", "May nakita kasi ako kanina sa PowerPoint ni Sir na \\(f'(x)\\)…"],
	["m", "r", "…tapos sabi niya derivative daw yun."],
	["m", "r", "Pa’no ba sinusulat ang derivative?"],
	["m", "l", "Marami kasing paraan ng pagsabi na kinukuha natin ang derivative ng isang function."],
	["m", "l", "Yung lagi kong ginagamit ay yung \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}\\) dahil dun na ’ko nasanay."],
	["m", "l", "Pero sa ibang mga libro, may tatlo pang ibang paraan ng pagsulat ng derivative."],
	["d", "Match the notation to the mathematician.", {
    a: ["\\(\\frac{\\mathrm{d}y}{\\mathrm{d}x}\\)", "Leibniz"],
    b: ["\\(\\dot y\\\)", "Newton"],
    c: ["\\(y'\\)", "Lagrange"],
    d: ["\\(Dy\\)", "Euler"]
	}, "Tama lahat!", "Mukhang may mali…", "Ulitin kaya natin?", "Tama ba ’to?"],
];
