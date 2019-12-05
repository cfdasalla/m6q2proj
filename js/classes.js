/** The fraction class. */
class Fraction {
	constructor(n, d = 1) {
		/** The numerator of the Fraction. */
		this.n = n;

		/** The denominator of the Fraction. */
		this.d = d;
	}
	
	/** Returns a string representation of the Fraction. */
	str() {
		return this.n + "/" + this.d;
	}
	
	/** Returns the numerical value of the Fraction. */
	num() {
		return this.n / this.d;
	}
	
	/** Returns the LaTeX code for the Fraction. */
	latex() {
		return convertToLatexFrac(this.n, this.d);
	}
	
	/** Returns a string representation of the simplified version of the Fraction. */
	simplestStr() {
		return (this.n / gcd(this.n, this.d)) + "/" + (this.d / gcd(this.n, this.d));
	}
	
	/** Returns a new Fraction representing the simplified version of the current Fraction. */
	simplestFrac() {
		return new Fraction(this.n / gcd(this.n, this.d), this.d / gcd(this.n, this.d));
	}
	
	/** Returns the LaTeX code representing the simplified version of the current Fraction. */
	simplestLatex() {
        let res = convertToLatexFrac(this.n / gcd(this.n, this.d), this.d / gcd(this.n, this.d));
        return res != "" ? res : "1"
	}
}

/** The equation class. */
class Polynomial {
	/** Makes a polynomial. Also makes upper and lower bounds for the definite integral. */
	constructor() {
		/** Coefficients of each term of the polynomial. */
		this.coefficients = [];
		
		/** Signs of each term of the polynomial. */
		this.signs = [];
		
		/** The lower bound of the definite integral. */
		this.defl;

		/** The upper bound of the definite integral. */
		this.defu;
	}
	
	setValues(c, s) {
		this.coefficients = c;
		this.signs = s;
	}
	
	randomize(max) {
		for (let i = 0; i <= max; i++) {
			this.coefficients.push(d3.randomInt(minCoef, maxCoef + 1)());
			this.signs.push(sgn[d3.randomInt(0,2)()]);
		}
		
		if (this.signs[this.signs.length - 1] == "+") {
			this.signs[this.signs.length - 1] = "";
		}
		
		this.defl = d3.randomInt(minBound, maxBound + 1)();
		
		if (greaterLower == true) {
			this.defu = d3.randomInt(minBound, maxBound + 1)();
		} else {
			this.defu = d3.randomInt(this.defl, maxBound + 1)();
		}
	}
	
	/** Randomly assigns zero coefficients to terms. */
	randomZero() {
		let tf = [true, false, false, false, false];
		
		for (let i = 0; i < this.coefficients.length; i++) {
			if (tf[d3.randomInt(0, tf.length + 1)()]) {
				this.coefficients[i] = 0;
			}
		}
	}
	
	/** Returns the LaTeX code of the equation for display in #question. */
	display() {
		let terms = [];
		let final = "";
		
		for (let i = 0; i < this.coefficients.length; i++) {
			if (this.coefficients[i] != undefined) {
				if (!(this.coefficients[i] instanceof Fraction)) {
					switch (i) {
						case 0:
							terms[i] = this.signs[i] + this.coefficients[i];
							break;
						case 1:
							if (this.coefficients[i] == 1) {
								terms[i] = this.signs[i] + "x";
							} else {
								terms[i] = this.signs[i] + this.coefficients[i] + "x";
							}
							break;
						default:
							if (i < 10) {
								if (this.coefficients[i] == 1) {
									terms[i] = this.signs[i] + "x^" + i;
								} else {
									terms[i] = this.signs[i] + this.coefficients[i] + "x^" + i;
								}
							} else {
								if (this.coefficients[i] == 1) {
									terms[i] = this.signs[i] + "x^{" + i + "}";
								} else {
									terms[i] = this.signs[i] + this.coefficients[i] + "x^{" + i + "}";
								}
							}
							break;
					}
				} else {
					switch (i) {
						case 0:
							terms[i] = this.signs[i] + this.coefficients[i].latex();
							break;
						case 1:
							if (this.coefficients[i] == 1) {
								terms[i] = this.signs[i] + "x";
							} else {
								terms[i] = this.signs[i] + this.coefficients[i].latex() + "x";
							}
							break;
						default:
							if (i < 10) {
								if (this.coefficients[i] == 1) {
									terms[i] = this.signs[i] + "x^" + i;
								} else {
									terms[i] = this.signs[i] + this.coefficients[i].latex() + "x^" + i;
								}
							} else {
								if (this.coefficients[i] == 1) {
									terms[i] = this.signs[i] + "x^{" + i + "}";
								} else {
									terms[i] = this.signs[i] + this.coefficients[i].latex() + "x^{" + i + "}";
								}
							}
							break;
								
					}
				}

				if (checkZero(this.coefficients[i])) {
					terms[i] = undefined;

					if (i > 0) {
						if (this.signs[i - 1] == "+" && this.coefficients.slice(i, this.coefficients.length).every(checkZero)) {
							this.signs[i - 1] = "";
						}
					}

					if (this.coefficients[i - 1] == 0) {
						terms[i - 1] = "";
					}
				}
			}
		}
		
		for (let i = terms.length - 1; i >= 0; i--) {
			if (terms[i] != undefined) {
				final += terms[i];
			}
		}
		
		if (final == "") { final = "0" }
		
		if (final[0] == "+") { final = final.slice(1, final.length) }
		
		return final;
	}
	
	/** Returns the LaTeX code for the derivative. Used to check input. */
	derivative() {
		let answerEq = new Polynomial();
		
		for (let i = 1; i < this.coefficients.length; i++) {
			answerEq.coefficients[i - 1] = i * this.coefficients[i];
			answerEq.signs[i - 1] = this.signs[i];
		}
		
		return answerEq;
	}
	
	/** Returns the LaTeX code for the indefinite integral. Used to check input. */
	indefinite() {
		let answerEq = new Polynomial();
		
		for (let i = 0; i < this.coefficients.length; i++) {
			answerEq.coefficients[i + 1] = new Fraction(this.coefficients[i], i + 1);
			answerEq.signs[i + 1] = this.signs[i];
		}
		
		answerEq.coefficients[0] = "C";
		answerEq.signs[0] = "+";
		
		return answerEq;
	}
	
	/** Returns the value of the definite integral. Used to check input. */
	definite() {
		let upper = [];
		let lower = [];
		let upA;
		let lwA;
		
		for (let i = 0; i < this.coefficients.length; i++) {
			let coef = parseInt(this.signs[i] + this.coefficients[i]);
			
			let multU = operateFrac(new Fraction(coef), new Fraction(1, i + 1), "m");
			let prodU = operateFrac(multU, new Fraction(this.defu ** (i + 1)), "m");
			upper.push(prodU);
			
			let multL = operateFrac(new Fraction(coef), new Fraction(1, i + 1), "m");
			let prodL = operateFrac(multL, new Fraction(this.defl ** (i + 1)), "m");
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

/** Operates on two Fractions.
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
	Takes two numbers. Returns either an integer or a LaTeX fraction depending on divisibilty.
	@param {number} n - Numerator (dividend)
	@param {number} d - Denominator (divisor)
*/
function convertToLatexFrac(n, d) {
	if (n % d == 0) {
		if (n / d == 1) {
			return "";
		} else {
			return (n / d).toString();
		}
	} else {
		let N = n;
		let D = d;
		let S = "";

		if (n < 0 && d > 0) {
			N = -n;
			S = "-";
		} else if (n > 0 && d < 0) {
			D = -d;
			S = "-";
		} else if (n < 0 && d < 0) {
			N = -n;
			D = -d;
		}
		
		return S + "\\frac{" + (N / gcd(n, d)) + "}{" + (D / gcd(n, d)) + "}";
	}
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