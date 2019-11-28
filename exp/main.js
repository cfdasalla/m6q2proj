/* notes:
- change color pag derivative / integral
- make it look better (bootstrap)

- constant, linear, quad

- rules (derivative):
--- power rule
--- log & ln
--- e
--- exponent
--- product & quotient
--- chain (dulo na lang)
- rules (integral):
--- reverse power rule

- storyline: PHY6
--- go reggie!
*/

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
class Equation {
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
	
	randomize(max) {
		for (let i = 0; i < max; i++) {
			this.coefficients.push(d3.randomInt(minCoef, maxCoef + 1)());
			this.signs.push(sgn[d3.randomInt(0,2)()]);
		}
		
		if (this.signs[this.signs.length - 1] == "+") {
			this.signs[this.signs.length - 1] = "";
		}
		
		this.defl = d3.randomInt(minBound, maxBound + 1)();
		this.defu = d3.randomInt(minBound, maxBound + 1)();
	}
	
	/** Forces the polynomial to the degree specified. */
	forceMax(max) {
		for (let i = this.coefficients.length - 1; i > max; i--) {
			this.coefficients[i] = 0;
		}
		
		if (this.signs[max] == "+") {
			this.signs[max] = "";
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
						if (this.coefficients[i] == 1) {
							terms[i] = this.signs[i] + "x^" + i;
						} else {
							terms[i] = this.signs[i] + this.coefficients[i] + "x^" + i;
						}
						break;
				}

				if (this.coefficients[i] == 0) {
					terms[i] = "";

					if (i > 0) {
						if (this.signs[i - 1] == "+" && this.coefficients.slice(i, this.coefficients.length).every(function(a) { if (a == 0) { return true } })) {
							this.signs[i - 1] = "";
						}

						switch (i - 1) {
							case 0:
								terms[i - 1] = this.signs[i - 1] + this.coefficients[i - 1];
								break;
							case 1:
								if (this.coefficients[i - 1] == 1) {
									terms[i - 1] = this.signs[i - 1] + "x";
								} else {
									terms[i - 1] = this.signs[i - 1] + this.coefficients[i - 1] + "x";
								}
								break;
							default:
								if (this.coefficients[i - 1] == 1) {
									terms[i - 1] = this.signs[i - 1] + "x^" + (i - 1);
								} else {
									terms[i - 1] = this.signs[i - 1] + this.coefficients[i - 1] + "x^" + (i - 1);
								}
								break;
						}
					}

					if (this.coefficients[i - 1] == 0) {
						terms[i - 1] = "";
					}
				}
			}
		}
		
		for (let i = terms.length - 1; i >= 0; i--) {
			final += terms[i];
		}
		
		if (final == "") { final = "0" }
		
		return final;
	}
	
	/** Returns the LaTeX code for the derivative. Used to check input. */
	derivative() {
		let answerEq = new Equation();
		
		for (let i = 1; i < this.coefficients.length; i++) {
			answerEq.coefficients[i - 1] = i * this.coefficients[i];
			answerEq.signs[i - 1] = this.signs[i];
		}
		
		return answerEq.display();
	}
	
	/** Returns the LaTeX code for the indefinite integral. Used to check input. */
	indefinite() {
		let answerEq = new Equation();
		
		for (let i = 0; i < this.coefficients.length; i++) {
			answerEq.coefficients[i + 1] = convertToLatexFrac(this.coefficients[i], i + 1);
			answerEq.signs[i + 1] = this.signs[i];
		}
		
		console.log(answerEq);
		
		if (answerEq.display() != "0") {
			return answerEq.display() + "+C";
		} else {
			return "C";
		}
	}
	
	/** Returns the value of the definite integral. Used to check input. */
	definite() {
		let cof4 = parseInt(this.sgn3 + this.deg3);
		let cof3 = parseInt(this.sgn2 + this.deg2);
		let cof2 = parseInt(this.sgn1 + this.deg1);
		let cof1 = parseInt(this.sgn0 + this.deg0);
	
		let mlt4 = operateFrac(new Fraction(cof4), new Fraction(1, 4), "m");
		let mlt3 = operateFrac(new Fraction(cof3), new Fraction(1, 3), "m");
		let mlt2 = operateFrac(new Fraction(cof2), new Fraction(1, 2), "m");
		let mlt1 = new Fraction(cof1);

		let upB4 = operateFrac(mlt4, new Fraction(this.defu ** 4), "m");
		let upB3 = operateFrac(mlt3, new Fraction(this.defu ** 3), "m");
		let upB2 = operateFrac(mlt2, new Fraction(this.defu ** 2), "m");
		let upB1 = operateFrac(mlt1, new Fraction(this.defu), "m");

		let lwB4 = operateFrac(mlt4, new Fraction(this.defl ** 4), "m");
		let lwB3 = operateFrac(mlt3, new Fraction(this.defl ** 3), "m");
		let lwB2 = operateFrac(mlt2, new Fraction(this.defl ** 2), "m");
		let lwB1 = operateFrac(mlt1, new Fraction(this.defl), "m");

		let upA = [upB4, upB3, upB2, upB1].reduce(function(a, b) {
			return operateFrac(a, b, "a");
		});

		let lwA = [lwB4, lwB3, lwB2, lwB1].reduce(function(a, b) {
			return operateFrac(a, b, "a");
		});

		let ans = operateFrac(upA, lwA, "s");

		return ans.latex();
	}
}

/** Array containing + and - operators/signs. */
let sgn = ["+", "-"];

/** Object containing modes. */
let allowed = {d: true,
			   i: true,
			   f: true};

/** Number of questions. */
let qCount = 0;

/** Current question number. */
let qCurrent = 1;

/** Minimum term coefficient in Equations. */
let minCoef;

/** Maximum term coefficient in Equations. */
let maxCoef ;

/** Minimum definite integral bound in Equations. */
let minBound;

/** Maximum definite integral bound in Equations. */
let maxBound;

/** Determines whether Equations will have missing terms. */
let zeroCoef;

/** Number of correct answers. */
let tamaC = 0;

/** Number of incorrect answers. */
let chieC = 0;

/** Number of skips. */
let skipC = 0;

/** Current mode; e.g., derivative / integral mode. */
let mode;

/** Boolean determining whether or not question was repeat due to a CHIE!. */
let chieRepeat = false;

/** <span> element referring to the math input text box. */
let mathFieldSpan = document.getElementById('answer');

let MQ = MathQuill.getInterface(2);

/** Variable referring to the actual input field for answer. */
let mathField = MQ.MathField(mathFieldSpan, {
	spaceBehavesLikeTab: true,
	charsThatBreakOutOfSupSub: '+-',
	handlers: {
		enter: function() {
			check();
			mathField.blur();
		}
	}
});

/** The equation that gets displayed. */
let charot;

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
	let aN = a.n;
	let aD = a.d;
	let bN = b.n;
	let bD = b.d;
	let lcd = lcm(aD, bD);
	let aN2 = aN * lcd / aD;
	let bN2 = bN * lcd / bD;
	
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

/** Creates a new, randomly generated equation. */
function newEq() {
	charot = new Equation();
	charot.randomize(d3.randomInt(0,11)());
	
	if (zeroCoef) { charot.randomZero(); }
}

/** Checks if answer is correct. */
function check() {
	let modes = {d: charot.derivative(),
				 i: charot.indefinite(),
				 f: charot.definite()};
	let dots = $("#progress .dot");
	
    $("#check").prop("disabled", true);
    $("#skip").prop("disabled", true);
    
	dots.eq(qCurrent - 1).removeClass("currentQ");
	
	if (mathField.latex() === modes[mode]) {
		if (chieRepeat == false) {
			tamaC += 1;
			$("#result").text("TAMA!");
			$("#answer").css("background", "lime");
			$("#answer .mq-matrixed").css("background", "lime");
			dots.eq(qCurrent - 1).addClass("tamaQ");
		} else {
			$("#result").text("SAYANG!");
			$("#answer").css("background", "yellow");
			$("#answer .mq-matrixed").css("background", "yellow");
			dots.eq(qCurrent - 1).addClass("sayangQ");
		}
		
		setTimeout(function() {
			refresh(true);
		}, 1000);
		
		chieRepeat = false;
		qCurrent++;
	} else {
		if (chieRepeat == false) {
			chieC += 1;
		}
		
		$("#result").text("MALI!");
		$("#answer").css("background", "red");
		$("#answer .mq-matrixed").css("background", "red");
		dots.eq(qCurrent - 1).addClass("chieQ");
		
		setTimeout(function() {
			refresh(false);
		}, 1000);
		
		chieRepeat = true;
	}
	
	updateCounters();
}

/* Fills in input field with correct answer while skipping current question. */
function skip() {
	let modes = {d: charot.derivative(),
				 i: charot.indefinite(),
				 f: charot.definite()};
	let dots = $("#progress .dot");
    
	dots.eq(qCurrent - 1).removeClass("currentQ");
	
	mathField.select();
	mathField.write("");
    $("#check").prop("disabled", true);
    $("#skip").prop("disabled", true);
    
	mathField.write(modes[mode]);
	
    if (chieRepeat == true) {
        chieC -= 1;
    }
    
	skipC += 1;
	$("#result").text("SKIP!");
	$("#answer").css("background", "dodgerblue");
	$("#answer .mq-matrixed").css("background", "dodgerblue");
	dots.eq(qCurrent - 1).addClass("skipQ");
	
	setTimeout(function() {
		refresh(true);
	}, 1000);
	
	qCurrent++;
	chieRepeat = false;
	updateCounters();
}

/**
	Clears out equation and input area.
	@param {bool} correct - Boolean variable for correctness of answer
*/
function refresh(correct) {
	if (correct == true) {
		newEq(minCoef, maxCoef);
		lagay();
	}
	
	if (qCurrent <= qCount) {
		$("#check").prop("disabled", false);
		$("#skip").prop("disabled", false);
	}
	
	mathField.select();
	mathField.write("");
	mathField.focus();
	
	$("#result").html("");
	$("#answer").css("background", "initial");
	$("#answer .mq-matrixed").css("background", "initial");
}

/** Generates a random mode based on allowed modes. */
function randomMode() {
	let modeList = Object.keys(allowed).filter(key => allowed[key] === true);
	
	mode = modeList[d3.randomInt(0,modeList.length)()];
}

/** Places equation into #question. */
function lagay() {
	let dots = $("#progress .dot");
	
	dots.eq(qCurrent - 1).removeClass("soonQ");
	dots.eq(qCurrent - 1).addClass("currentQ");
	
	if (qCurrent <= qCount) {
		randomMode();

		switch (mode) {
			case "d":
				$("#question").html("\\( \\displaystyle \\frac{\\mathrm{d}} {\\mathrm{d} x} (" + charot.display() + ") \\)");
				$("#question").css("color", "red");
				break;
			case "i":
				$("#question").html("\\( \\displaystyle \\int {(" + charot.display() + ") \\mathrm{d} x} \\)");
				$("#question").css("color", "blue");
				break;
			case "f":
				$("#question").html("\\( \\displaystyle \\int ^{" + charot.defu + "} _{" + charot.defl + "} {(" + charot.display() + ") \\mathrm{d} x} \\)");
				$("#question").css("color", "green");
				break;
		}

		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	} else {
        $("#main").hide();
        $("#result").hide();
		$("#stats").show();
	}
}

/** Starts game proper. */
function gameProper() {
	minCoef = parseInt($("#min_coef").val());
	maxCoef = parseInt($("#max_coef").val());
	minBound = parseInt($("#min_intb").val());
	maxBound = parseInt($("#max_intb").val());
	zeroCoef = $("#allow_zero").prop("checked");
	
	$("#choose").hide();
    $("#main").show();
    $("#progress").show();
    $("#result").show();
    
	allowed.d = $("#inc_d").is(":checked");
	allowed.i = $("#inc_i").is(":checked");
	allowed.f = $("#inc_f").is(":checked");
	
	qCurrent = 1;
	qCount = parseInt($("#question_count").val());
    
    minCoef = parseInt($("#min_coef").val());
    maxCoef = parseInt($("#max_coef").val());
	
	$("#check").prop("disabled", false);
	$("#skip").prop("disabled", false);
	
	progressDots();
	resetCounters();
	
	newEq();
	lagay();
}

/** Updates tama, chie, and skip counters. */
function updateCounters() {
	$("#tamaC").text(tamaC);
	$("#chieC").text(chieC);
	$("#skipC").text(skipC);
}

/** Resets tama, chie, and skip counters. */
function resetCounters() {
	tamaC = 0;
	chieC = 0;
	skipC = 0;
	
	updateCounters();
}

/** Places progress dots below answer input field. */
function progressDots() {
	for (let i = 0; i < qCount; i++) {
		$("#progress").append("<span class='dot soonQ'>&bull; </span>");
	}
}

/** Checks startup form details. */
function checkForm() {
	$("#choose").find("*").removeClass("is-invalid");
	$("#choose").find("*").prop("disabled", false);
    
    for (let z of ["question_count", "min_coef", "max_coef", "min_intb", "max_intb"]) {
        $("#" + z).val() == "" ? $("#" + z).addClass("is-invalid") : $("#" + z).removeClass("is-invalid");
    }
	
	$("#question_types :checked").length == 0 ? $("#question_types input").addClass("is-invalid") : $("#question_types input").removeClass("is-invalid");
	
	if (!$("#inc_f").is(":checked")) {
		$("#min_intb").prop("disabled", true);
		$("#max_intb").prop("disabled", true);
	} else {
		$("#min_intb").prop("disabled", false);
		$("#max_intb").prop("disabled", false);
	}
	
	parseInt($("#question_count").val()) <= 0 ? $("#question_count").addClass("is-invalid") : $("#question_count").removeClass("is-invalid");
	
	parseInt($("#min_coef").val()) <= 0 || parseInt($("#min_coef").val()) > parseInt($("#max_coef").val()) ? $("#min_coef").addClass("is-invalid") : $("#min_coef").removeClass("is-invalid");
	
	parseInt($("#max_coef").val()) <= 0 || parseInt($("#max_coef").val()) < parseInt($("#min_coef").val()) ? $("#max_coef").addClass("is-invalid") : $("#max_coef").removeClass("is-invalid");
	
	parseInt($("#min_intb").val()) > parseInt($("#max_intb").val()) ? $("#min_intb").addClass("is-invalid") : $("#min_intb").removeClass("is-invalid");
	
	parseInt($("#max_intb").val()) < parseInt($("#min_intb").val()) ? $("#max_intb").addClass("is-invalid") : $("#max_intb").removeClass("is-invalid");
	
	$("#choose").find('.is-invalid').length > 0 ? $("#start").prop("disabled", true) : $("#start").prop("disabled", false);
}

/** Startup function. Also used to restart. */
function startup() {
	$("#choose").show();
	$("#main").hide();
	$("#stats").hide();
	checkForm();
	
	$("#progress").empty();
    $("#advanced").hide();
}

$("#choose").change(checkForm);

$("#min_coef").change(function() {
	$("#min_coef").attr("max", $("#max_coef").val());
	$("#max_coef").attr("min", $("#min_coef").val());
});

$("#max_coef").change(function() {
	$("#min_coef").attr("max", $("#max_coef").val());
	$("#max_coef").attr("min", $("#min_coef").val());
});

$("#min_intb").change(function() {
	$("#min_intb").attr("max", $("#max_intb").val());
	$("#max_intb").attr("min", $("#min_intb").val());
});

$("#max_intb").change(function() {
	$("#min_intb").attr("max", $("#max_intb").val());
	$("#max_intb").attr("min", $("#min_intb").val());
});

$("#check").click(check);

$("#skip").click(skip);

$("#start").click(gameProper);

$("#questionCount").keypress(function(e) {
    if (e.which === 13) {
        gameProper();
    }
})

$("#advancedLink").click(function() {
    if ($("#advanced").css("display") == "none") {
        $("#advanced").slideDown();
    } else {
        $("#advanced").slideUp();
    }
})

$("#restart").click(startup);

$("form").submit(function(e){ e.preventDefault(); });

$(startup);
