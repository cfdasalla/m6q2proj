let left = "left";
let right = "right";

/** The typing animation. */
let isTyping = `<div class="loading">
	<div></div>
	<div></div>
	<div></div>
</div>`

let typedPollInputs = [];

/**
	Shuffles an array.
	From https://stackoverflow.com/a/2450976
*/
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/** The Recipient class. */
class Recipient {
	constructor(first, last, picture, middle = "") {
		this.first = first;
		this.last = last;
		this.middle = middle;
		this.picture = picture;
	}
	
	fullName() {
		return this.middle != "" ? this.first + " " + this.middle + " " + this.last : this.first + " " + this.last;
	}
}

/** The Message class. */
class Message {
	constructor(message, sender) {
		this.message = message;
		this.sender = sender;
	}
	
	add() {
		return `<div class="animated faster fadeInUp ${this.sender}">${this.message}</div>`
	}
}

/** The Poll class. */
class Poll {
	constructor(question, options) {
		this.question = question;
		this.options = {};
		this.replies = {};
		
		if (Object.values(options).every(a => a instanceof Array)) {
			for (let i in options) {
				this.options[i] = options[i][0];
				this.replies[i] = options[i][1];
			}
		} else {
			for (let i in options) {
				this.options[i] = options[i];
			}
		}
	}
	
	add() {
		let optionButtonsA = [];
		let optionButtonsS = "";
		
		for (let i in this.options) {
			optionButtonsA.push(`<button class="choice choice_${i} btn">${this.options[i]}</button>\n`);
		}
		
		optionButtonsA = shuffle(optionButtonsA);
		
		for (let j of optionButtonsA) {
			optionButtonsS += j;
		}
		
		return `<div class="animated faster fadeInUp choose">
<div class="question h5 mt-4">${this.question}</div>
<div class="choices mb-4">
${optionButtonsS}
</div>
</div>`
	}
}

class TypedPoll {
	constructor(question) {
		this.question = question;
		this.field = "poll_input_" + ($("[id*=\"poll_input_\"]").length + 1);
	}
	
	add() {
		return `<div class="animated faster fadeInUp choose">
<div class="question h5 mt-4">${this.question}</div>
<span id="${this.field}" class="mb-4"></span>
<button class="btn ml-2">Send</button>
</div>`;
	}
}

/** Calisto's Recipient object. */
let cal = new Recipient("Calisto", "Lucero", "../images/cal dp.png");

/** IO's recipient object. */
let io = new Recipient("Ian", "Kona", "../images/io dp.png", "Okelani");

/** Last poll added. */
let lastPoll;

/** Last input poll added. */
let lastTypedPoll;

/**
	Returns a random millisecond duration representing how long it takes to read/type a message of the specified length.
	
	@param {number} l - Length of message.
	@param {boolean} [read] - Determines whether or not delay should take into account message being read instead of typed. Defaults to false.
	@param {boolean} [animate] - Determines whether or not to add 800 ms to output to compensate for message animation. Defaults to true.
*/
function timeDelay(l, read = false, animate = true) {
	/*
	According to my research:
	• average reading speed of a person is around 250 to 300 wpm
	• professional typists type at around 65 to 75 wpm
	• 1 wpm = 4 - 5 cpm
	*/
	if (read) {
		return Math.trunc(d3.randomInt(Math.trunc((60000 / 1000) * l), Math.trunc((60000 / 1500) * l) + 1)() / 4) + (animate ? 800 : 0);
		// ORIGINAL: return (l * 10) - 100 > 200 ? d3.randomInt((l * 10) - 100, (l * 10) + 100)() : d3.randomInt(200, (l * 10) + 100)();
	} else {
		return Math.trunc(d3.randomInt(Math.trunc((60000 / 260) * l), Math.trunc((60000 / 375) * l) + 1)() / 4) + (animate ? 800 : 0);
		// ORIGINAL: return (l * 30) - 300 > 600 ? d3.randomInt((l * 30) - 300, (l * 30) + 300)() : d3.randomInt(600, (l * 30) + 300)();
	}
}

/** Adds a message to the chat. */
function addMessage(m, s, f = function() {}, d = 0) {
	let x = new Message(m, s);
	let y = $("#chat div[class~=left], #chat div[class~=right]");
	let z = y.last();
	let u = $("#chat div[class~=choose]").last();
	
	if (z.prev().index() > u.index()) {
		if (y.length != 0) {
			if (z.attr("class").match(new RegExp(s)) != null) {
				z.css("margin-bottom", "1px");
				if (s == "left") {
					z.css("border-bottom-left-radius", "0");	
				} else {
					z.css("border-bottom-right-radius", "0");
				}
			}
		}
	}
	
	let del = timeDelay(m.length);
	
	if (d == 0) {
		$("#chat").append(x.add());
	} else {
		if (s == "left") {
			addMessage(isTyping, s);
			setTimeout(function() {
				replaceLastMessage(m);
			}, del);
		} else {
			$("#chat").append(x.add());
		}
	}
	
	z = $("#chat div[class~=left], #chat div[class~=right]").last();
	u = $("#chat div[class~=choose]").last();
	
	if (z.prev().index() > u.index()) {
		if (z.prev().attr("class").match(new RegExp(s)) != null) {
			z.css("margin-top", "1px");

			if (s == "left") {
				z.css("border-top-left-radius", "0");
			} else {
				z.css("border-top-right-radius", "0");
			}
		}
	}
	
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	
	updateScroll();
	
	setTimeout(f, d + del);
}

/** Removes last message from the chat. */
function removeLastMessage() {
	let x = $("#chat div[class~=left], #chat div[class~=right]").last();
	x.removeClass("fadeInUp");
	
	if(x.attr("class").match(new RegExp("left")) != null) {
		x.addClass("fadeOutLeft");
	} else {
		x.addClass("fadeOutRight");
	}
	
	x.on("animationend", function() {x.remove();});
}

/** Replaces last message in the chat. */
function replaceLastMessage(n) {
	let x = $("#chat div[class~=left], #chat div[class~=right]").last();
	
	x.html(n);	
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	updateScroll();
}

/** Adds a poll to the chat. */
function addPoll(q, o, c, r, w, u, pre = "", post = "", f = function() {}) {
	let x = new Poll(q, o);
	let y = $(x.add()).appendTo("#chat");
	
	addPollClicks(y.find(".choice"), c, r, w, u, pre, post, f);
	colorButtons();
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	
	updateScroll();
	
	lastPoll = x;
}

/** Sets selected poll option to active and disables remaining options. */
function pollSelect(a) {
	$(a).addClass("active");
	$(a).siblings().prop("disabled", true);
	$(a).siblings().off();
}

/** Adds click events to poll choices. */
function addPollClicks(a, c, r, w, u, pre = "", post = "", f = function() {}) {
	for (let i of a) {
		if ($(i).attr('class').match(new RegExp("choice_."))[0].slice(-1) != c) {
			$(i).one("click", function() {
				pollSelect(this);
				
				if (Object.keys(lastPoll.replies).length != 0) {
					addMessage(lastPoll.replies[$(this).attr('class').match(new RegExp("choice_."))[0].slice(-1)], "right");
				} else {
					addMessage(pre + lastPoll.options[$(this).attr('class').match(new RegExp("choice_."))[0].slice(-1)] + post, "right");
				}
				
				delete lastPoll.options[$(this).attr('class').match(new RegExp("choice_."))[0].slice(-1)];
				
				setTimeout(function() {
					addMessage(w, "left", function() {
						setTimeout(function() {
							addMessage(u, "left", function() {
								let newOptions = {};
								
								if (Object.keys(lastPoll.replies).length != 0) {
									for (let j in lastPoll.options) {
										newOptions[j] = [lastPoll.options[j], lastPoll.replies[j]];
									}
								} else {
									newOptions = lastPoll.options;
								}
								
								setTimeout(function() {
									addPoll(lastPoll.question, newOptions, c, r, w, u, pre, post, f);
								}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true) + timeDelay(lastPoll.question.length));
							}, timeDelay(u.length, false, false));
						}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
					}, timeDelay(w.length, false, false));
				}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
			});
		} else {
			$(i).one("click", function() {
				pollSelect(this);
				
				if (Object.keys(lastPoll.replies).length != 0) {
					addMessage(lastPoll.replies[$(this).attr('class').match(new RegExp("choice_."))[0].slice(-1)], "right");
				} else {
					addMessage(pre + lastPoll.options[$(this).attr('class').match(new RegExp("choice_."))[0].slice(-1)] + post, "right");
				}
				
				setTimeout(function() {
					addMessage(r, "left", function() {
						setTimeout(f, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
					}, timeDelay(r.length, false, false));
				}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
			});
		}
	}
}

function addTypedPoll(q, c, r, w, u, pre = "", post = "", d = false, f = function() {}) {
	let x = new TypedPoll(q);
	let y = $(x.add()).appendTo("#chat");
	
	function checkTP(ans) {
		typedPollInputs[x.field.slice(x.field.match(/(_)(?!.*\1)/).index + 1)].blur();
		
		let open = d ? "\\(\\displaystyle" : "\\(";
		addMessage(pre + open + typedPollInputs[x.field.slice(x.field.match(/(_)(?!.*\1)/).index + 1)].latex() + "\\)" + post, "right");
		
		let truthy = false;
		
		if (c instanceof Array) {
			truthy = c.includes(ans);
		} else {
			truthy = ans == c;
		}
		
		if (truthy) {
			setTimeout(function() {
				addMessage(r, "left", function() {
					setTimeout(f, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
				}, timeDelay(r.length, false, false));
			}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
		} else {
			setTimeout(function() {
				addMessage(w, "left", function() {
					setTimeout(function() {
						addMessage(u, "left", function() {
							setTimeout(function() {
								addTypedPoll(lastTypedPoll.question, c, r, w, u, pre, post, d, f);
							}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true) + timeDelay(lastTypedPoll.question.length));
						}, timeDelay(u.length, false, false));
					}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
				}, timeDelay(w.length, false, false));
			}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
		}
		
		$("#" + lastTypedPoll.field).siblings("button").prop("disabled", true);
	}
	
	typedPollInputs[x.field.slice(x.field.match(/(_)(?!.*\1)/).index + 1)] = MQ.MathField($("#" + x.field)[0], {
		spaceBehavesLikeTab: true,
		charsThatBreakOutOfSupSub: '+-',
		handlers: {
			enter: function() {
				checkTP(typedPollInputs[x.field.slice(x.field.match(/(_)(?!.*\1)/).index + 1)].latex());
			}
		}
	});
	
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	
	updateScroll();
	
	lastTypedPoll = x;
	
	typedPollInputs[x.field.slice(x.field.match(/(_)(?!.*\1)/).index + 1)].focus();
	$("#" + lastTypedPoll.field).siblings("button").one("click", function() {
		checkTP(typedPollInputs[x.field.slice(x.field.match(/(_)(?!.*\1)/).index + 1)].latex());
	});
	$("#" + lastTypedPoll.field).siblings("button").addClass("btn-" + $("#chat").attr("class").match(new RegExp(currentRecipient.first.toLowerCase()))[0]);
}

/** Adds button classes corresponding to current chat color. */
function colorButtons() {
	$("#chat .choice").addClass("btn-outline-" + $("#chat").attr("class").match(new RegExp(currentRecipient.first.toLowerCase()))[0]);
}

function toggleOnline() {
	if ($("#online_dot").hasClass("online")) {
		$("#online_dot").removeClass("online");
		$("#online_dot").addClass("offline");
		$("#chat").append(`<div class="status animated faster fadeInUp">${currentRecipient.first} is now offline.</div>`);
	} else {
		$("#online_dot").removeClass("offline");
		$("#online_dot").addClass("online");
		$("#chat").append(`<div class="status animated faster fadeInUp">${currentRecipient.first} is now online.</div>`);
	}
	updateScroll();
}

function updateScroll() {
	window.scroll({top: $("body").css("height").slice(0, -2), left: 0, behavior: 'smooth'});
}

$(function() {
	$("#chat button").addClass("btn-" + currentRecipient.first.toLowerCase());
	
	$("#recipient").text(currentRecipient.fullName());
	$("#picture").attr("src", currentRecipient.picture);
	$("#chat").addClass(currentRecipient.first.toLowerCase());
});
