// ==============
// Default values
// ==============

/** Maximum degree of Polynomial. Default value: 3. */
let maxDeg = 3;

/** Minimum term coefficient in Polynomials. Default value: 1. */
let minCoef = 1;

/** Maximum term coefficient in Polynomials. Default value: 20. */
let maxCoef = 20;

/** Minimum definite integral bound in Polynomials. Default value: -5. */
let minBound = -5;

/** Maximum definite integral bound in Polynomials. Default value: 5. */
let maxBound = 5;

/** Determines whether Polynomials will have missing terms. Default value: true. */
let zeroCoef = true;

/** Determines whether lower bounds greater than upper bounds are allowed. Default value: true. */
let greaterLower = true;

// =====================
// Classes and functions
// =====================

/** Represents a numerical fraction. */
class Fraction {
	constructor(n, d = 1) {
		/** The numerator of the Fraction. */
		this.n = n;

		/** The denominator of the Fraction. */
		this.d = d;
	}

	/**
		Returns a string representation of the Fraction.

		@param {boolean} simp - Determines whether Fraction should be reduced to lowest terms. Defaults to false.
	*/
	str(simp = false) {
		return simp ? (this.n / gcd(this.n, this.d)) + "/" + (this.d / gcd(this.n, this.d)) : this.n + "/" + this.d;
	}

	/** Returns the numerical value of the Fraction. */
	num() {
		return this.n / this.d;
	}

	/** Returns the LaTeX code for the Fraction. */
	latex() {
		if (this.n % this.d == 0) {
			return (this.n / this.d).toString();
		} else {
			if ((this.n < 0 && this.d > 0) || (this.n > 0 && this.d < 0)) {
				return "-\\frac{" + Math.abs(this.n) + "}{" + Math.abs(this.d) + "}";
			} else {
				return "\\frac{" + Math.abs(this.n) + "}{" + Math.abs(this.d) + "}";
			}
		}
	}

	/** Returns a new fraction representing the Fraction reduced to lowest terms. */
	simplify() {
		return new Fraction(this.n / gcd(this.n, this.d), this.d / gcd(this.n, this.d));
	}
}

/** Represents a rational expression. */
class Rational {
	constructor(n, d) {
		this.n = n;
		this.d = d;

		return this;
	}

	/**
		Returns the LaTeX code for the rational expression.

		@param {boolean} [simp] - Specifies whether output is simplified (i.e., largest coefficients of numerator & denominator are positive). If the numerator is a single fraction, its denominator is multiplied to the rational's denominator. Defaults to false.
	*/
	latex(simp = false) {
		if (!simp) {
			return "\\frac{" + this.n.latex() + "}{" + this.d.latex() + "}";
		} else {
			let [tempN, tempD] = [new Polynomial(), this.d instanceof RaisedPoly ? new RaisedPoly() : new Polynomial()];
			tempN.copy(this.n);
			tempD.copy(this.d);

			if (tempN.length == 1 && tempN.coefficients[0] instanceof Fraction) {
				if (tempD instanceof Polynomial) {
					tempD = operatePoly(new Polynomial([tempN.coefficients[0].d]), tempD, "m");
				}

				tempN.setValues([tempN.coefficients[0].n]);
			}

			if (tempN.coefficients[tempN.length - 1] < 0) {
				tempN.copy(operatePoly(tempN, new Polynomial([-1]), "m"));

				if (tempD.coefficients[tempD.length - 1] < 0) {
					tempD.copy(operatePoly(tempD, new Polynomial([-1]), "m"));
					return "\\frac{" + tempN.latex() + "}{" + tempD.latex() + "}";
				} else {
					return "-\\frac{" + tempN.latex() + "}{" + tempD.latex() + "}";
				}
			} else {
				if (tempD.coefficients[tempD.length - 1] < 0) {
					tempD.copy(operatePoly(tempD, new Polynomial([-1]), "m"));
					return "-\\frac{" + tempN.latex() + "}{" + tempD.latex() + "}";
				} else {
					return "\\frac{" + tempN.latex() + "}{" + tempD.latex() + "}";
				}
			}
		}
	}

	/** Returns the LaTeX code for the simplified quotient when the numerator is divided by the denominator. */
	divide() {
		return operatePoly(this.n, this.d, "d");
	}

	/**
		Returns the derivative of the Rational as a Rational.

		@param {boolean} [rp] - Specifies whether denominator should be output as a RaisedPoly. Defaults to false.
	*/
	derivative(rp = false) {
		let denom = rp ? new RaisedPoly(this.d, 2) : operatePoly(this.d, this.d, "m");

		return new Rational(operatePoly(operatePoly(this.d, this.n.derivative(), "m"), operatePoly(this.n, this.d.derivative(), "m"), "s"), denom);
	}
}

/** Represents a polynomial. */
class Polynomial {
	/** Makes a polynomial. Also makes upper and lower bounds for the definite integral. */
	constructor(c = []) {
		/** Coefficients of each term of the polynomial. */
		this.coefficients = c;

		return this;
	}

	get length() {
		return this.coefficients.length;
	}

	/** Sets values of polynomial. Call without parameters to clear polynomial. */
	setValues(c = []) {
		this.coefficients = c;

		return this;
	}

	/** Assigns random values to coefficients. */
	randomize(max) {
		for (let i = 0; i <= max; i++) {
			this.coefficients.push(d3.randomInt(0,2)() == 0 ? d3.randomInt(minCoef, maxCoef + 1)() : - d3.randomInt(minCoef, maxCoef + 1)());
		}

		return this;
	}

	/** Randomly assigns zero coefficients to terms. */
	randomZero() {
		let tf = [true, false, false, false, false];

		for (let i = 0; i < this.length; i++) {
			if (tf[d3.randomInt(0, tf.length + 1)()]) {
				this.coefficients[i] = 0;
			}
		}

		return this;
	}

	/** Returns the LaTeX code of the equation for latex in #question. */
	latex() {
		let terms = [];
		let final = "";

		for (let i = 0; i < this.length; i++) {
			if (this.coefficients[i] != undefined) {
				if (!(this.coefficients[i] instanceof Fraction)) {
					switch (i) {
						case 0:
							terms[i] = this.coefficients[i].toString();
							break;
						case 1:
							terms[i] = this.coefficients[i] == 1 ? "x"
									 : this.coefficients[i] == -1 ? "-x"
									 : this.coefficients[i] + "x";
							break;
						default:
							if (i < 10) {
								terms[i] = this.coefficients[i] == 1 ? "x^" + i
										 : this.coefficients[i] == -1 ? "-x^" + i
										 : this.coefficients[i] + "x^" + i;
							} else {
								terms[i] = this.coefficients[i] == 1 ? "x^{" + i + "}"
										 : this.coefficients[i] == -1 ? "-x^{" + i + "}"
										 : this.coefficients[i] + "x^{" + i + "}";
							}
							break;
					}
				} else {
					switch (i) {
						case 0:
							terms[i] = this.coefficients[i].latex();
							break;
						case 1:
							terms[i] = this.coefficients[i].latex() + "x";
							break;
						default:
							terms[i] = i < 10 ? this.coefficients[i].latex() + "x^" + i : terms[i] = this.coefficients[i].latex() + "x^{" + i + "}";
							break;
					}
				}

				if (checkZero(this.coefficients[i])) {
					terms[i] = "";
				}
			}
		}

		for (let i = terms.length - 1; i >= 0; i--) {
			if (terms[i] != "") { final += terms[i][0] == "-" ? terms[i] : "+" + terms[i]; }
		}

		if (final == "") { final = "0" }

		if (final[0] == "+") { final = final.slice(1, final.length) }

		return final;
	}

	/**
		Returns the LaTeX code for the derivative. Used to check input.
		@param {Number} n - Computes for the nth derivative of the Polynomial. Defaults to 1.
	*/
	derivative(n = 1) {
		let answerEq = new Polynomial();
		let tempIn = new Polynomial().copy(this);

		for (let i = 1; i < tempIn.length; i++) {
			answerEq.coefficients[i - 1] = i * tempIn.coefficients[i];
		}

		if (n === 1) {
			return answerEq;
		} else {
			return answerEq.derivative(n - 1);
		}
	}

	/** Returns the LaTeX code for the indefinite integral. Used to check input. */
	indefinite() {
		let answerEq = new Polynomial();

		for (let i = 0; i < this.length; i++) {
			answerEq.coefficients[i + 1] = this.coefficients[i] % (i + 1) == 0 ? this.coefficients[i] / (i + 1) : new Fraction(this.coefficients[i], i + 1).simplify();
		}

		answerEq.coefficients[0] = "C";

		return answerEq;
	}

	/** Returns the value of the definite integral. Used to check input. */
	definite(l, u) {
		let upper = [];
		let lower = [];
		let upA;
		let lwA;

		for (let i = 0; i < this.length; i++) {
			let coef = this.coefficients[i];

			let multU = operateFrac(new Fraction(coef), new Fraction(1, i + 1), "m");
			let prodU = operateFrac(multU, new Fraction(u ** (i + 1)), "m");
			upper.push(prodU);

			let multL = operateFrac(new Fraction(coef), new Fraction(1, i + 1), "m");
			let prodL = operateFrac(multL, new Fraction(l ** (i + 1)), "m");
			lower.push(prodL);
		}

		if (upper.length != 0) {
			upA = upper.reduce(function(a, b) {
				return operateFrac(a, b, "a");
			});

			lwA = lower.reduce(function(a, b) {
				return operateFrac(a, b, "a");
			});
		} else {
			[upA, lwA] = [new Fraction(0), new Fraction(0)];
		}

		let ans = operateFrac(upA, lwA, "s");

		return ans.latex();
	}

	/** Copies values from another polynomial to current polynomial. */
	copy(other) {
		this.setValues();

		let newValues = [];

		for (let c = 0; c < other.length; c++) {
			if (other.coefficients[c] instanceof Fraction) {
				newValues[c] = new Fraction(other.coefficients[c].n, other.coefficients[c].d);
			} else {
				newValues[c] = other.coefficients[c];
			}
		}

		this.setValues(newValues);

		return this;
	}
}

/** Represents a polynomial with extra terms added to the end. */
class ExtraPoly {
	constructor(poly, extra) {
		this.poly = poly;
		this.extra = extra;
	}

	setValues(poly = new Polynomial(), extra = []) {
		this.poly = poly;
		this.extra = extra;
	}

	latex(simp = false) {
		let x = this.poly.latex();

		for (let i of this.extra) {
			if (i instanceof Rational) {
				x += i.latex(simp)[0] != "-" ? "+" + i.latex(simp) : i.latex(simp);
			} else {
				x += i.latex()[0] != "-" ? "+" + i.latex() : i.latex();
			}

		}

		return x;
	}

	derivative() {
		let x = this.poly.derivative().latex();

		for (let i of this.extra) {
			x += i.derivative().latex()[0] != "-" ? "+" + i.derivative().latex() : i.derivative().latex();
		}

		return x;
	}
}

/** Represents a polynomial raised to a power. */
class RaisedPoly {
	constructor(poly, power) {
		/** The RaisedPoly's Polynomial. */
		this.poly = poly;

		/** The RaisedPoly's exponent. */
		this.power = power;

		return this;
	}

	get coefficients() {
		return this.poly.coefficients;
	}

	/** Returns the LaTeX code for the RaisedPoly. */
	latex() {
		return this.power < 10 ? "\\left(" + this.poly.latex() + "\\right)^" + this.power : "\\left(" + this.poly.latex() + "\\right)^{" + this.power + "}";
	}

	/** Returns a Polynomial representing the expansion of the RaisedPoly. */
	expand() {
		let x = [];
		x.length = this.power;
		x.fill(this.poly);

		return x.reduce((a, b) => operatePoly(a, b, "m"));
	}

	/** Sets values of RaisedPoly. Call without parameters to clear RaisedPoly. */
	setValues(poly = new Polynomial(), power = 0) {
		this.poly = poly;
		this.power = power;

		return this;
	}

	/** Returns a Polynomial representing the derivative of the RaisedPoly, as computed using the chain rule. */
	derivative() {
		let step1 = new RaisedPoly(this.poly, this.power - 1).expand();
		let step2 = operatePoly(step1, new Polynomial([this.power]), "m");
		let step3 = (operatePoly(step2, this.poly.derivative(), "m"));

		return step3;
	}

	/** Copies values from another RaisedPoly to current RaisedPoly. */
	copy(other) {
		this.setValues();

		this.poly.copy(other.poly);
		this.power = other.power;

		return this;
	}
}

/** Gets the GCD of two numbers. Used to find lowest terms. */
function gcd(a, b) {
	if (!b) return Math.abs(a);

	return gcd(b, a % b);
}

/** Gets the LCM of two numbers. Used for adding and subtracting Fractions. */
function lcm(a, b) {
	return Math.abs((a * b) / gcd(a, b));
}

/**
	Operates on two Fractions.
	@param {Fraction} a - First Fraction
	@param {Fraction} b - Second Fraction
	@param {string} operation - Operation to be performed
*/
function operateFrac(a, b, operation) {
	let [aN, aD, bN, bD] = [a.n, a.d, b.n, b.d];
	let lcd = lcm(aD, bD);
	let [aN2, bN2] = [aN * lcd / aD, bN * lcd / bD];

	switch (operation) {
	case "a":
		return new Fraction(aN2 + bN2, lcd);
		break;
	case "s":
		return new Fraction(aN2 - bN2, lcd);
		break;
	case "m":
		return new Fraction(aN * bN, aD * bD);
		break;
	case "d":
		return new Fraction(aN * bD, aD * bN);
	}
}

/**
	Operates on two Polynomials.
	@param {Polynomial} a - First Polynomial
	@param {Polynomial} b - Second Polynomial
	@param {string} operation - Operation to be performed

	If the operation performed is division and there exists a remainder, an ExtraPoly is created instead of a Polynomial.
*/
function operatePoly(a, b, operation) {
	let A = [];
	let B = [];

	let resultC = [];
	let resultE = [];

	for (let i = 0; i < a.length; i++) {
		A[i] = a.coefficients[i] != undefined ? a.coefficients[i] : 0;
	}

	for (let i = 0; i < b.length; i++) {
		B[i] = b.coefficients[i] != undefined ? b.coefficients[i] : 0;
	}

	if (A.length > B.length) {
		for (let u = B.length; u < A.length; u++) {
			B.push(0);
		}
	} else {
		for (let u = A.length; u < B.length; u++) {
			A.push(0);
		}
	}

	switch (operation) {
		case "a":
			if (A.length >= B.length) {
				for (let i = 0; i < A.length; i++) {
					resultC[i] = operate(A[i], B[i], "a");
				}
			} else {
				for (let i = 0; i < B.length; i++) {
					resultC[i] = operate(A[i], B[i], "a");
				}
			}
			break;
		case "s":
			if (A.length >= B.length) {
				for (let i = 0; i < A.length; i++) {
					resultC[i] = operate(A[i], B[i], "s");
				}
			} else {
				for (let i = 0; i < B.length; i++) {
					resultC[i] = operate(A[i], B[i], "s");
				}
			}
			break;
		case "m":
			for (let i = 0; i < A.length; i++) {
				for (let j = 0; j < B.length; j++) {
					if (resultC[i + j] == undefined) {
						resultC[i + j] = operate(A[i], B[j], "m");
					} else {
						resultC[i + j] = operate(resultC[i + j], operate(A[i], B[j], "m"), "a");
					}
				}
			}
			break;
		case "d":
			let tempPoly = new Polynomial();
			let remainder = new Polynomial();

			// console.log("%cstep 0: %cget divisor, which will serve as the first minuend", "font-weight: bold; color: red;", "font-weight: normal;");
			tempPoly.copy(a);
			// console.log(tempPoly);
			// console.log("");

			if (A.length < B.length) {
				resultE.push(new Rational(a, b));
			} else {
				for (let g = a.length - b.length; g >= 0; g--) {
					// console.log("%c<start of current term>", "font-weight: bold; color: blue;");
					// console.log("%cstep 1: %cadjust temporary minuend; keep only first n coefficients (n = degree of divisor)", "font-weight: bold; color: red;", "font-weight: normal;");

					for (let h = 0; h < g; h++) {
						tempPoly.coefficients[h] = 0;
					}

					// console.log(tempPoly.coefficients);

					// console.log("%cstep 2: %cget first term of temporary minuend, divide by coefficient of term of largest degree in divisor, and shift by (length of divisor - 1), which will serve as the multiplier to the divisor", "font-weight: bold; color: red;", "font-weight: normal;");

					let tempMult = new Polynomial();
					tempMult.copy(tempPoly);

					for (let j = 0; j < b.length - 1; j++) {
						tempMult.coefficients.shift();
					}

					for (let i = 0; i < tempMult.length - 1; i++) {
						tempMult.coefficients[i] = 0;
					}

					tempMult.coefficients[tempMult.coefficients.length - 1] = operate(tempMult.coefficients[tempMult.coefficients.length - 1], b.coefficients[b.coefficients.length - 1], "d");

					// console.log(tempMult.coefficients);

					// console.log("%cstep 3: %cmultiply multiplier to divisor; the product will serve as the temporary subtrahend", "font-weight: bold; color: red;", "font-weight: normal;");

					let tempSubt = operatePoly(b, tempMult, "m");

					// console.log(tempSubt.coefficients);

					// console.log("%cstep 4: %csubtract temporary minuend to temporary subtrahend", "font-weight: bold; color: red;", "font-weight: normal;");

					let tempDiff = operatePoly(tempPoly, tempSubt, "s");

					// console.log(tempDiff.coefficients);

					// console.log("%cstep 5: %cset new temporary minuend as temporary difference, \"bring down\" next term from divisor", "font-weight: bold; color: red;", "font-weight: normal;");

					let newDivi = new Polynomial();
					newDivi.copy(tempDiff);
					newDivi.coefficients[tempDiff.length - b.length] = a.coefficients[tempDiff.length - b.length];

					tempPoly.copy(newDivi);

					// console.log(tempPoly.coefficients);

					// console.log("%cstep 6: %cappend multiplier to coefficient array", "font-weight: bold; color: red;", "font-weight: normal;");

					resultC[g] = tempMult.coefficients[tempMult.length - 1];

					// console.log(resultC);

					// console.log("%cstep 7: %cset remainder as temporary difference", "font-weight: bold; color: red;", "font-weight: normal;");

					remainder.copy(tempDiff);

					// console.log(remainder.coefficients);

					// console.log("%c<end of current term>", "font-weight: bold; color: blue;");
					// console.log("");
				}
			}

			if (remainder.latex() != "0") {
				resultE.push(new Rational(remainder, b));
			}

			break;
	}

	for (let i = 0; i < resultC.length; i++) {
		if (resultC[i] instanceof Fraction && resultC[i].n % resultC[i].d == 0) {
			resultC[i] = resultC[i].n / resultC[i].d;
		}
	}

	for (let g = resultC.length - 1; g >= 0; g--) {
		if (resultC[g] == 0) {
			resultC.pop();
		} else {
			break;
		}
	}

	let result = resultE.length == 0 ? new Polynomial() : new ExtraPoly();

	if (result instanceof ExtraPoly) {
		result.setValues(new Polynomial(resultC), resultE);
	} else {
		result.setValues(resultC);
	}

	if (operation == "d") {
		// console.log("%clatex answer: %c" + result.latex(), "font-weight: bold; color: lime;", "font-weight: normal; color: black");
	}

	return result;
}

/**
	Checks if parameter passed is equivalent to zero. Can be used on numbers and Fractions.
	@param {number, Fraction} c - coefficient to be checked
*/
function checkZero(c) {
	if (c instanceof Fraction) {
		if (c.n == 0) {
			return true;
		} else {
			return false;
		}
	} else {
		if (c == 0) {
			return true;
		} else {
			return false;
		}
	}
}

/**
	Operates on two values.
	@param {Number|Fraction} a - First Fraction
	@param {Number|Fraction} b - Second Fraction
	@param {string} operation - Operation to be performed
*/
function operate(a, b, o) {
	if (a instanceof Fraction) {
		if (b instanceof Fraction) {
			return operateFrac(a, b, o);
		} else {
			return operateFrac(a, new Fraction(b), o);
		}
	} else {
		if (b instanceof Fraction) {
			return operateFrac(new Fraction(a), b, o);
		} else {
			switch (o) {
				case "a":
					return a + b;
					break;
				case "s":
					return a - b;
					break;
				case "m":
					return a * b;
					break;
				case "d":
					return operateFrac(new Fraction(a), new Fraction(b), o);
					break;
			}
		}
	}
}

/**
	Converts string passed to a Polynomial. Only works for polynomials with whole number coefficients.
	@param {string} s - The LaTeX representation of the polynomial.
*/
function latexToPoly(s) {
	let t = s.replace(/\s/g, "").replace(/-/g, "+-").split(/\+/g);
	let u = [];

	for (let i of t) {
    let j = i.split("x");
    let coeff = j[0] === "" ? 1 : parseInt(j[0]);
    let power = j.length === 1 ? 0 : (j[1] === "" ? 1 : parseInt(j[1].replace("^", "")));
    u[power] = coeff;
	}

	u = Array.from(u, x => x || 0);
	return new Polynomial(u);
}
