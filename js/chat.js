let left = "left";
let right = "right";

/** The typing animation. */
let isTyping = `<div class="loading">
	<div></div>
	<div></div>
	<div></div>
</div>`

/** The Recipient class. */
class Recipient {
	constructor(first, last, picture, correct, wrong, again, middle = "") {
		this.first = first;
		this.last = last;
		this.middle = middle;
		this.correct = correct;
		this.wrong = wrong;
		this.again = again;
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
		this.options = options;
	}
	
	add() {
		let optionButtons = "";
		
		for (let i of this.options) {
			optionButtons += `<button class="choice btn">${i}</button>\n`
		}
		
		return `<div class="animated faster fadeInUp choose">
<div class="question h5 mt-4">${this.question}</div>
<div class="choices mb-4">
${optionButtons}
</div>
</div>`
	}
}

/** Calisto's Recipient object. */
let cal = new Recipient("Calisto", "Lucero", "images/cal dp.png", "tama!", "mali...", "ulitin kaya natin?");

/** IO's recipient object. */
let io = new Recipient("Ian", "Kona", "images/io dp.png", "Yes!", "I don't think that's right...", "Why don't we try again?", "Okelani");

/** Last poll added. */
let lastPoll;

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
	
	if (d == 0) {
		$("#chat").append(x.add());
	} else {
		if (s == "left") {
			addMessage(isTyping, s);
			setTimeout(function() {
				replaceLastMessage(m);
			}, d);
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
	
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	
	$("#chat div").last().one("animationend", function() {
		$("html").animate({scrollTop: ((parseFloat($("body").css("height").slice(0, -2))) + 100).toString()}, 800);
	});
	
	setTimeout(f, d + d3.randomInt(1000, 1501)());
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
}

/** Adds a poll to the chat. */
function addPoll(q, o, c, f = function() {}, pre = "", post = "") {
	let x = new Poll(q, o);
	let y = $(x.add()).appendTo("#chat");
	
	addPollClicks(y.find(".choice"), c, f, pre, post);
	colorButtons();
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	
	$("#chat").last().one('animationend', function() {
		$("html").animate({scrollTop: ((parseFloat($("body").css("height").slice(0, -2))) + 100).toString()}, 800);
	});
	
	lastPoll = x;
}

/** Sets selected poll option to active and disables remaining options. */
function pollSelect(a) {
	$(a).addClass("active");
	$(a).siblings().prop("disabled", true);
	$(a).siblings().off();
}

/** Adds click events to poll choices. */
function addPollClicks(a, b, f = function() {}, pre = "", post = "") {
	for (let i = 0; i < a.length; i++) {
		if (i != b) {
			$(a[i]).one("click", function() {
				let newOptions = lastPoll.options.slice(0, i).concat(lastPoll.options.slice(i + 1, lastPoll.options.length));
				let newCorrect;
				
				if (i < b) {
					newCorrect = b - 1;
				} else {
					newCorrect = b;
				}
				
				pollSelect(this);
				addMessage(pre + lastPoll.options[$(this).index()] + post, "right");
				
				setTimeout(function() {
					addMessage(currentRecipient.wrong, "left", function() {
						setTimeout(function() {
							addMessage(currentRecipient.again, "left", function() {
								addPoll(lastPoll.question, newOptions, newCorrect, f, pre, post);
							});
						}, d3.randomInt(0, 501)());
					}, d3.randomInt(1000, 2001)());
				}, d3.randomInt(1001, 1501)());
			});
		} else {
			$(a[i]).one("click", function() {
				pollSelect(this);
				addMessage(pre + lastPoll.options[$(this).index()] + post, "right");
				setTimeout(function() {
					let x = d3.randomInt(2000, 3001)();
					
					addMessage(currentRecipient.correct, "left", undefined, x);
					setTimeout(f, x + d3.randomInt(1000, 2001)());
				}, d3.randomInt(1000, 2001)());
			});
		}
	}
}

/** Adds button classes corresponding to current chat color. */
function colorButtons() {
	$("#chat .choice").addClass("btn-outline-" + $("#chat").attr("class").match(new RegExp(currentRecipient.first.toLowerCase()))[0]);
}

function toggleOnline() {
	if ($("#online_dot").hasClass("online")) {
		$("#online_dot").removeClass("online");
		$("#online_dot").addClass("offline");
	} else {
		$("#online_dot").removeClass("offline");
		$("#online_dot").addClass("online");
	}
}

$(function() {
	$("#header").parent().css("position", "sticky");
	$("#header").parent().css("position", "-webkit-sticky");
	$("#header").parent().css("top", "0");
	$("#header").parent().css("background-color", "white");
	$("#header").parent().css("z-index", 1);
	
	$("#recipient").text(currentRecipient.fullName());
	$("#picture").attr("src", currentRecipient.picture);
	$("#chat").addClass(currentRecipient.first.toLowerCase());
});