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
	/** Makes a polynomial using four randomly generated numbers. Also makes upper and lower bounds for the definite integral. */
	constructor() {
		/** The sign of the term of degree 3. */
		this.sgn3 = sgn[d3.randomInt(0,2)()];

		/** The coefficient of the term of degree 3. */
		this.deg3 = d3.randomInt(minCoef, maxCoef + 1)();

		/** The sign of the term of degree 2. */
		this.sgn2 = sgn[d3.randomInt(0,2)()];

		/** The coefficient of the term of degree 2. */
		this.deg2 = d3.randomInt(minCoef, maxCoef + 1)();

		/** The sign of the term of degree 1. */
		this.sgn1 = sgn[d3.randomInt(0,2)()];

		/** The coefficient of the term of degree 1. */
		this.deg1 = d3.randomInt(minCoef, maxCoef + 1)();

		/** The sign of the term of degree 0. */
		this.sgn0 = sgn[d3.randomInt(0,2)()];

		/** The coefficient of the term of degree 0. */
		this.deg0 = d3.randomInt(minCoef, maxCoef + 1)();

		/** The lower bound of the definite integral. */
		this.defl = d3.randomInt(minBound, maxBound + 1)();

		/** The upper bound of the definite integral. */
		this.defu = d3.randomInt(minBound, maxBound + 1)();

		if (this.sgn3 == "+") {
			this.sgn3 = "";
        }
	}
	
	/** Forces the polynomial to be of degree 2; i.e., quadratic. */
	forceMax2() {
		this.deg3 = 0;
		
		if (this.sgn2 == "+") {
			this.sgn2 = "";
		}
	}
	
	/** Forces the polynomial to be of degree 1; i.e., linear. */
	forceMax1() {
		this.deg3 = 0;
		this.deg2 = 0;
		
		if (this.sgn1 == "+") {
			this.sgn1 = "";
		}
	}
	
	/** Forces the polynomial to be of degree 0; i.e., a constant. */
	forceMax0() {
		this.deg3 = 0;
		this.deg2 = 0;
		this.deg1 = 0;
		
		if (this.sgn0 == "+") {
			this.sgn0 = "";
		}
	}
	
	/** Randomly assigns zero coefficients to terms. */
	randomZero() {
		let tf = [true, false, false, false, false];
		
		if (tf[d3.randomInt(0, tf.length + 1)()]) {
			this.deg3 = 0;
		}
		
		if (tf[d3.randomInt(0, tf.length + 1)()]) {
			this.deg2 = 0;
		}
		
		if (tf[d3.randomInt(0, tf.length + 1)()]) {
			this.deg1 = 0;
		}
		
		if (tf[d3.randomInt(0, tf.length + 1)()]) {
			this.deg0 = 0;
		}
	}
	
	/** Returns the LaTeX code of the equation for display in #question. */
	display() {
		let trm3 = this.sgn3 + this.deg3 + "x^3";
		let trm2 = this.sgn2 + this.deg2 + "x^2";
		let trm1 = this.sgn1 + this.deg1 + "x";
		let trm0 = this.sgn0 + this.deg0;
		
		if (this.deg3 == 0) {
			trm3 = "";
			
			if (this.sgn2 == "+") {
				this.sgn2 = "";
			}
			
			trm2 = this.sgn2 + this.deg2 + "x^2";
		}
		
		if (this.deg2 == 0) {
			trm2 = "";
			
			if (trm3 == "" && this.sgn1 == "+") {
				this.sgn1 = "";
			}
			
			trm1 = this.sgn1 + this.deg1 + "x";
		}
		
		if (this.deg1 == 0) {
			trm1 = "";
			
			if (trm3 == "" && trm2 == "" && this.sgn0 == "+") {
				this.sgn0 = "";
			}
			
			trm0 = this.sgn0 + this.deg0;
		}
		
		if (this.deg0 == 0) {
			trm0 = "";
		}
		
		if (this.deg3 == 1) {
			trm3 = this.sgn3 + "x^3";
		}
		if (this.deg2 == 1) {
			trm2 = this.sgn2 + "x^2";
		}
		if (this.deg1 == 1) {
			trm1 = this.sgn1 + "x";
		}
		
		if (trm3 + trm2 + trm1 + trm0 != "") {
			return trm3 + trm2 + trm1 + trm0;
		} else {
			return "0";
		}
	}
	
	/** Returns the LaTeX code for the derivative. Used to check input. */
	derivative() {
		let trm2 = this.sgn3 + (this.deg3 * 3) + "x^2";
		let trm1 = this.sgn2 + (this.deg2 * 2) + "x";
		let trm0 = this.sgn1 + this.deg1;
		
		if (this.deg3 == 0) {
			trm2 = "";
		}
		if (this.deg2 == 0) {
			trm1 = "";
		}
		if (this.deg1 == 0) {
			trm0 = "";
		}
		
		if (trm2 + trm1 + trm0 != "") {
			return trm2 + trm1 + trm0;
		} else {
			return "0";
		}
	}
	
	/** Returns the LaTeX code for the indefinite integral. Used to check input. */
	indefinite() {
		let trm4 = this.sgn3 + convertToLatexFrac(this.deg3, 4) + "x^4";
		let trm3 = this.sgn2 + convertToLatexFrac(this.deg2, 3) + "x^3";
		let trm2 = this.sgn1 + convertToLatexFrac(this.deg1, 2) + "x^2";
		let trm1 = this.sgn0 + this.deg0 + "x";
		
		if (this.deg3 == 0) {
			trm4 = "";
		}
		if (this.deg2 == 0) {
			trm3 = "";
		}
		if (this.deg1 == 0) {
			trm2 = "";
		}
		if (this.deg0 == 0) {
			trm1 = "";
		}
		
		if (this.deg0 == 1) {
			trm1 = this.sgn0 + "x";
		}
		
		if (trm4 + trm3 + trm2 + trm1 != "") {
			return trm4 + trm3 + trm2 + trm1 + "+C";
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
	
	switch (d3.randomInt(0,101)() % 4) {
		case 0:
			charot.forceMax0();
			break;
		case 1:
			charot.forceMax1();
			break;
		case 2:
			charot.forceMax2();
			break;
	}
	
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
