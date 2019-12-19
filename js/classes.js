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
	constructor(c = [], e = [], l = 0, u = 0) {
		/** Coefficients of each term of the polynomial. */
		this.coefficients = c;
		
		/** Any extra terms (e.g., logarithms, trig functions) appended to the end of the polynomial. */
		this.extras = e;
		
		/** The lower bound of the definite integral. */
		this.defl = l;

		/** The upper bound of the definite integral. */
		this.defu = u;
		
		return this;
	}
	
	/** Sets values of polynomial. Call without parameters to clear polynomial. */
	setValues(c = [], e = [], l = 0, u = 0) {
		this.coefficients = c;
		this.extras = e;
		this.defl = l;
		this.defu = u;
		
		return this;
	}
	
	/** Assigns random values to coefficients. */
	randomize(max) {
		let sgn = ["+", "-"];
		
		for (let i = 0; i <= max; i++) {
			this.coefficients.push(parseInt(sgn[d3.randomInt(0,2)()] + d3.randomInt(minCoef, maxCoef + 1)()));
		}
		
		this.defl = d3.randomInt(minBound, maxBound + 1)();
		
		if (greaterLower == true) {
			this.defu = d3.randomInt(minBound, maxBound + 1)();
		} else {
			this.defu = d3.randomInt(this.defl, maxBound + 1)();
		}
		
		return this;
	}
	
	/** Randomly assigns zero coefficients to terms. */
	randomZero() {
		let tf = [true, false, false, false, false];
		
		for (let i = 0; i < this.coefficients.length; i++) {
			if (tf[d3.randomInt(0, tf.length + 1)()]) {
				this.coefficients[i] = 0;
			}
		}
		
		return this;
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
					/*
					if (this.coefficients[i - 1] == 0) {
						terms[i - 1] = "";
					}*/
				}
			}
		}
		
		for (let i = terms.length - 1; i >= 0; i--) {
			if (terms[i] != "") { final += terms[i][0] == "-" ? terms[i] : "+" + terms[i]; }
		}
		
		for (let i of this.extras) {
			final += i[0] == "-" ? i : "+" + i;
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
		}
		
		return answerEq;
	}
	
	/** Returns the LaTeX code for the indefinite integral. Used to check input. */
	indefinite() {
		let answerEq = new Polynomial();
		
		for (let i = 0; i < this.coefficients.length; i++) {
			answerEq.coefficients[i + 1] = new Fraction(this.coefficients[i], i + 1);
		}
		
		answerEq.coefficients[0] = "C";
		
		return answerEq;
	}
	
	/** Returns the value of the definite integral. Used to check input. */
	definite() {
		let upper = [];
		let lower = [];
		let upA;
		let lwA;
		
		for (let i = 0; i < this.coefficients.length; i++) {
			let coef = this.coefficients[i];
			
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
	
	/** Copies values from another polynomial to current polynomial. */
	copy(other) {
		this.setValues();
		
		for (let c = 0; c < other.coefficients.length; c++) {
			if (other.coefficients[c] instanceof Fraction) {
				this.coefficients[c] = new Fraction(other.coefficients[c].n, other.coefficients[c].d);
			} else {
				this.coefficients[c] = other.coefficients[c];
			}
		}
		
		this.defl = other.defl;
		this.defu = other.defu;
		
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
*/
function operatePoly(a, b, operation) {
	let result = new Polynomial;
	let A = [];
	let B = [];
	
	let resultC = [];
	let resultE = [];
	
	for (let i = 0; i < a.coefficients.length; i++) {
		A[i] = a.coefficients[i] != undefined ? a.coefficients[i] : 0;
	}
	
	for (let i = 0; i < b.coefficients.length; i++) {
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
						resultC[i + j] += operate(A[i], B[j], "m");
					}
				}
			}
			break;
		case "d":
			let tempPoly = new Polynomial();
			let remainder = 0;
			tempPoly.copy(a);
			
			if (A.length < B.length) {
				resultE.push("\\frac{" + a.display() + "}{" + b.display() + "}");
			} else {
				for (let g = a.coefficients.length - b.coefficients.length; g >= 0; g--) {
					for (let h = 0; h < g; h++) {
						tempPoly.coefficients[h] = 0;
					}

					let tempMult = new Polynomial();
					tempMult.copy(tempPoly);

					for (let i = 0; i < tempPoly.coefficients.length - 1; i++) {
						tempMult.coefficients[i] = 0;
					}

					tempMult.coefficients.shift();

					let tempSubt = operatePoly(b, tempMult, "m");
					let tempDiff = operatePoly(tempPoly, tempSubt, "s");
					
					let newDivi = new Polynomial();
					newDivi.copy(tempDiff);
					newDivi.coefficients[tempDiff.coefficients.length - 2] = a.coefficients[tempDiff.coefficients.length - 2];
					
					tempPoly = newDivi;
					resultC[g] = tempMult.coefficients[tempMult.coefficients.length - 1];
					remainder = A[0] - tempSubt.coefficients[0];
				}
			}
			
			resultE.push("\\frac{" + remainder + "}{" + b.display() + "}");
			break;
	}
	
	for (let g = resultC.length - 1; g >= 0; g--) {
		if (resultC[g] == 0) {
			resultC.pop();
		} else {
			break;
		}
	}
	
	result.coefficients = resultC;
	result.extras = resultE;
	
	return result;
}

/**
	Takes two numbers. Returns either an integer or a LaTeX fraction depending on divisibilty.
	@param {number} n - Numerator (dividend)
	@param {number} d - Denominator (workPoly)
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