function * queueFunc() {
	let count = 0;
	
	while (count < messages.length) {
		let x = messages[count];
		
		switch(x[0]) {
			case "m":
				yield new Message(x[1], x[2]).add();
				count++;
				break;
			case "p":
				while (true) {
					let p = new Poll(x[1], x[2], x[3]).add();
					
					for (let i of p.el.find(".choice")) {
						$(i).one("click", function() {
							queue.next($(this));
							$(this).addClass("active");
							$(this).siblings().prop("disabled", true);
						});
					}
					
					let c = yield p;
					let ans = c.attr("class").match("choice_.")[0].slice(-1);
					yield new Message("r", (Object.entries(p.base.replies).length === 0 ? x[7] + p.base.options[ans] + x[8] : p.base.replies[ans])).add();
					
					if (c.attr("class").match(new RegExp("choice_" + x[3])) == null) {
						delete x[2][c.attr("class").match(new RegExp("choice_."))[0].slice(-1)];
						
						yield new Message("l", x[5]).add();
						yield new Message("l", x[6]).add();
					} else {
						yield new Message("l", x[4]).add();
						break;
					}
				}
				
				count++;
				break;
			case "t":
				while (true) {
					let p = new TypedPoll(x[1], x[2]).add();
					
					p.input.focus();
					
					p.el.find(".send").one("click", function() {
						queue.next();
						p.input.blur();
						$(this).prop("disabled", true);
					});
					
					let c = yield p;
					
					let ans = p.input.latex();
					yield new Message("r", x[6] + "\\(" + (x[8] ? "\\displaystyle" : "") + ans + "\\)" + x[7]).add();
					
					let truthy = false;
					
					if (p.tp.correct instanceof Array) {
						truthy = p.tp.correct.includes(ans);
					} else {
						truthy = ans == p.tp.correct;
					}
					
					if (truthy) {
						yield new Message("l", x[3]).add();
						break;
					} else {
						yield new Message("l", x[4]).add();
						yield new Message("l", x[5]).add();
					}
				}
				
				count++;
				break;
		}
		
		updateScroll();
	}
	
	return setTimeout(function() {
		toggleOnline();
		setTimeout(function() {
			$("#chat").append(`<a class="btn btn-${currentRecipient.first.toLowerCase()} animated fadeInUp faster" href="${nextChapter}" role="button" style="display:inline-block" id="next">Next</a>`);
			$("#next").focus();
			updateScroll();
		}, 2000);
	}, timeDelay($("#chat div[class~=left], #chat div[class~=right]").last().get(0).innerText.length, true));
}

let queue = queueFunc();

$(function() {
	$("#chat").append(`<button class="btn btn-${currentRecipient.first.toLowerCase()} my-3" id="start" style="animation-duration: 250ms;">Start</button>`);
	$("#start").focus();
	
	$("#recipient").text(currentRecipient.fullName);
	$("#picture").attr("src", "../images/" + currentRecipient.picture);
	$("#chat").addClass(currentRecipient.first.toLowerCase());
	
	$("#start").click(function() {
		$("#start").addClass("animated fadeOut");
		started = true;
		$("#start").one("animationend", function() {
			$("#start").hide();
			toggleOnline();
			setTimeout(function() {
				queue.next();
			}, d3.randomInt(1000, 2001)());
		});
	});
});

window.addEventListener("beforeunload", function(x) {
	if (started) {
		x.preventDefault();
		x.returnValue = "";
	}
});
