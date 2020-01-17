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

/** Tells whether a game is currently in progress. */
let gameInProgress = false;

/** Object containing modes. */
let allowed = {d: true,
			   i: true,
			   f: true};

/** Number of questions. */
let qCount = 0;

/** Current question number. */
let qCurrent = 1;

/** Current upper bound for definite integrals. */
let currU = 0

/** Current lower bound for definite integrals. */
let currL = 0;

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
let current;

/** Creates a new, randomly generated equation. */
function generatePolynomial() {
	current = new Polynomial();
	current.randomize(d3.randomInt(0, maxDeg + 1)(), zeroCoef, fracCoef);
}

/** Checks if answer is correct. */
function check() {
	let modes = {d: current.derivative().latex(),
				 i: current.indefinite().latex(),
				 f: current.definite(currL, currU)};
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
	let modes = {d: current.derivative().latex(),
				 i: current.indefinite().latex(),
				 f: current.definite(currL, currU)};
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
		generatePolynomial();
		place();

		mathField.select();
		mathField.write("");
	}

	if (qCurrent <= qCount) {
		$("#check").prop("disabled", false);
		$("#skip").prop("disabled", false);
	}

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
function place() {
	let dots = $("#progress .dot");

	dots.eq(qCurrent - 1).removeClass("soonQ");
	dots.eq(qCurrent - 1).addClass("currentQ");

	if (qCurrent <= qCount) {
		randomMode();

		switch (mode) {
			case "d":
				$("#question").html("\\( \\displaystyle \\frac{\\mathrm{d}} {\\mathrm{d} x} \\left(" + current.latex() + "\\right) \\)");
				$("#question").css("color", "var(--red)");
				break;
			case "i":
				$("#question").html("\\( \\displaystyle \\int {\\left(" + current.latex() + "\\right) \\mathrm{d} x} \\)");
				$("#question").css("color", "var(--blue)");
				break;
			case "f":
				currU = d3.randomInt(minBound, maxBound + 1)();
				currL = greaterLower ? d3.randomInt(minBound, maxBound + 1)() : d3.randomInt(currU, maxBound + 1)();

				$("#question").html("\\( \\displaystyle \\int ^{" + currU + "} _{" + currL + "} {\\left(" + current.latex() + "\\right) \\mathrm{d} x} \\)");
				$("#question").css("color", "var(--green)");
				break;
		}

		mathField.focus();
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	} else {
		gameInProgress = false;
    $("#main").hide();
    $("#result").hide();
		$("#stats").show();
		$("#restart").focus();
	}
}

/** Starts game proper. */
function gameProper() {
	gameInProgress = true;

	minCoef = parseInt($("#min_coef").val());
	maxCoef = parseInt($("#max_coef").val());
	minBound = parseInt($("#min_intb").val());
	maxBound = parseInt($("#max_intb").val());
	zeroCoef = $("#allow_zero").prop("checked");
	maxDeg = parseInt($("#max_deg").val());
	greaterLower = $("#greater_lower").prop("checked");
	fracCoef = $("#allow_frac").prop("checked");

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

	generatePolynomial();
	place();
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
		$("#greater_lower").prop("disabled", true);
	} else {
		$("#min_intb").prop("disabled", false);
		$("#max_intb").prop("disabled", false);
		$("#greater_lower").prop("disabled", false);
	}

	if (parseInt($("#question_count").val()) <= 0) $("#question_count").addClass("is-invalid"); else $("#question_count").removeClass("is-invalid");

	if (parseInt($("#min_coef").val()) <= 0 || parseInt($("#min_coef").val()) > parseInt($("#max_coef").val())) $("#min_coef").addClass("is-invalid"); else $("#min_coef").removeClass("is-invalid");

	if (parseInt($("#max_coef").val()) <= 0 || parseInt($("#max_coef").val()) < parseInt($("#min_coef").val())) $("#max_coef").addClass("is-invalid"); else $("#max_coef").removeClass("is-invalid");

	if (parseInt($("#min_intb").val()) > parseInt($("#max_intb").val())) $("#min_intb").addClass("is-invalid"); else $("#min_intb").removeClass("is-invalid");

	if (parseInt($("#max_intb").val()) < parseInt($("#min_intb").val())) $("#max_intb").addClass("is-invalid"); else $("#max_intb").removeClass("is-invalid");

	if ($("#choose").find('.is-invalid').length > 0) $("#start").prop("disabled", true); else $("#start").prop("disabled", false);
}

/** Startup function. Also used to restart. */
function startup() {
	$("#choose").show();
	$("#main").hide();
	$("#stats").hide();
	checkForm();

	$("#progress").empty();
	$("input").first().focus();
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
});

$("#restart").click(startup);

$("form").submit(function(e){ e.preventDefault(); });

window.addEventListener("beforeunload", function(x) {
	if (gameInProgress) {
		x.preventDefault();
		x.returnValue = "";
	}
});

$("#back").click(function() {
	history.back();

	window.onpopstate(function() {
		window.location("../");
	});
});

$(startup);
