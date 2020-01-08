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
	["m", "r", "Hey, it’s me again!"],
	["m", "r", "I need help with my Math homework…"],
	["m", "r", "…that is, if you’re not busy right now."],
	["m", "l", "Well, I’m free right now."],
	["m", "l", "Why, what’s up?"],
	["m", "r", "The Math homework is so hard, I don’t even know where to start 😖"],
	["m", "l", "OK, let’s see…"],
	["m", "l", "What’s number 1?"],
	["m", "r", "Number 1 is \\(\\displaystyle\\frac{\\mathrm{d}}{\\mathrm{d}x}\\left(" + r1.latex() + "\\right)\\)."],
	["m", "l", "Oh, so it’s a rational function you’re being asked to differentiate now."],
	["m", "r", "Yeah, and I don’t know how to go about it."],
	["m", "r", "I can’t just expand the function just like how I did before I learned the product rule."],
	["m", "r", "Speaking of product rule…"],
	["m", "r", "…is there some kind of quotient rule, too?"],
	["m", "l", "I was just about to get into that!"],
	["m", "l", "Yes, there actually is something called the <b>quotient rule</b>, used especially with rational functions like this."],
	["m", "r", "Is it as complicated as the product rule?"],
	["m", "l", "Unfortunately…"],
	["m", "l", "…it’s actually a little worse."],
	["m", "r", "Oh no 😭"],
	["m", "r", "Oh well, if it’s going to make my life easier, I might as well learn it."],
	["m", "l", "Don’t worry, I’ll try to make it simple."],
	["m", "l", "The quotient rule is in some ways similar, but in other ways different from the product rule."],
	["m", "l", "Since we’re working with rational expressions, we’re going to use “low” and “high” for our mnemonic to make things easier."],
	["m", "l", "In the quotient rule, we do <b>low-d-high minus high-d-low</b>."],
	["m", "l", "That is, we multiply the denominator to the derivative of the numerator, then multiply the numerator to the derivative of the denominator, then subtract them."],
	["m", "l", "That’s one of the most important differences of the quotient rule from the product rule; forgetting this will give you a very wrong answer."],
	["m", "r", "OK, low-d-high minus high-d-low… got it!"],
	["m", "r", "It’s not as bad as it sounds!"],
	["m", "l", "Wait, we’re not yet done."],
	["m", "r", "Whoops, sorry…"],
	["m", "l", "We take this difference, and divide that entire thing by the <b>square</b> of the second function."],
	["m", "r", "Well, it does make sense that the result would also become a rational expression…"],
	["m", "l", "Let’s walk through that question you sent me earlier."],
	["m", "l", "So we have two functions, \\(" + r1a.latex() + "\\) and \\(" + r1b.latex() + "\\)."],
	["t", "What’s the derivative of \\(" + r1a.latex() + "\\)?", r1a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "It’s just a constant, so it’s easy to multiply that to the denominator."],
	["m", "l", "By doing that, we get \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\)."],
	["m", "l", "Now…"],
	["t", "What’s the derivative of \\(" + r1b.latex() + "\\)?", r1b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "It’s also a constant, so it’s easy to multiply that to the numerator."],
	["m", "l", "By doing that, we get \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\)."],
	["m", "l", "Now we have our two products, \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\)."],
	["m", "l", "We’re now going to subtract them to get our numerator."],
	["t", "What’s the difference of \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r1b, r1a.derivative(), "m"), operatePoly(r1a, r1b.derivative(), "m"), "s").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Finally, we’re going to take our second function and square it for our denominator."],
	["t", "What’s the square of \\(" + r1b.latex() + "\\)?", operatePoly(r1b, r1b, "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now, when we put those together, our answer turns out to be \\(\\displaystyle" + r1.derivative().latex() + "\\)."],
	["m", "r", "OK, I think I’m starting to get it now…"],
	["m", "r", "Maybe doing number 2 will help?"],
	["m", "l", "Sure. What’s the question?"],
	["m", "r", "It’s \\(\\displaystyle\\frac{\\mathrm{d}}{\\mathrm{d}x}\\left(" + r2.latex() + "\\right)\\)."],
	["m", "l", "Alright, let’s start."],
	["t", "What’s the derivative of \\(" + r2a.latex() + "\\)?", r2a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Then, we multiply this to the denominator."],
	["t", "What’s the product of \\(" + r2b.latex() + "\\) and \\(" + r2a.derivative().latex() + "\\)?", operatePoly(r2b, r2a.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now…"],
	["t", "What’s the derivative of \\(" + r2b.latex() + "\\)?", r2b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now, we multiply this to the numerator."],
	["t", "What’s the product of \\(" + r2a.latex() + "\\) and \\(" + r2b.derivative().latex() + "\\)?", operatePoly(r2a, r2b.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now we have our two products, \\(" + operatePoly(r2b, r2a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r2a, r2b.derivative(), "m").latex() + "\\)."],
	["m", "l", "Just like earlier, subtracting them will give us our numerator."],
	["t", "What’s the difference of \\(" + operatePoly(r2b, r2a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r2a, r2b.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r2b, r2a.derivative(), "m"), operatePoly(r2a, r2b.derivative(), "m"), "s").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Finally, we square our second function, \\(" + r2b.latex() + "\\), for our denominator."],
	["m", "l", "You don't have to worry about expanding the denominator, by the way. It’s fine to just leave it unexpanded."],
	["m", "l", "Then, we put the numerator and denominator together in our rational expression."],
	["t", "What’s the final answer?", [
		r2.derivative().latex(),
		r2.derivative(true).latex(),
		r2.derivative().latex(true),
		r2.derivative(true).latex(true)
	], "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?", true],
	["m", "l", "Looks like you’re getting the hang of it now!"],
	["m", "r", "Yay! There’s only one item left!"],
	["m", "r", "It looks harder than the first two though…"],
	["m", "r", "Can you walk me through the procedure again?"],
	["m", "r", "It’s \\(\\displaystyle\\frac{\\mathrm{d}}{\\mathrm{d}x}\\left(" + r3.latex() + "\\right)\\)."],
	["m", "l", "Huh… so the numerator is of degree 2…"],
	["m", "l", "No worries, the procedure’s just the same."],
	["m", "l", "The solution’s just going to be longer."],
	["m", "l", "Alright, let’s start!"],
	["t", "What’s the derivative of \\(" + r3a.latex() + "\\)?", r3a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now we multiply."],
	["t", "What’s the product of \\(" + r3b.latex() + "\\) and \\(" + r3a.derivative().latex() + "\\)?", operatePoly(r3b, r3a.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now…"],
	["t", "What’s the derivative of \\(" + r3b.latex() + "\\)?", r3b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now we multiply."],
	["t", "What’s the product of \\(" + r3a.latex() + "\\) and \\(" + r3b.derivative().latex() + "\\)?", operatePoly(r3a, r3b.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now we subtract our two products to get our numerator."],
	["t", "What’s the difference of \\(" + operatePoly(r3b, r3a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r3a, r3b.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r3b, r3a.derivative(), "m"), operatePoly(r3a, r3b.derivative(), "m"), "s").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Finally, we’ll square \\(" + r3b.latex() + "\\) for our denominator, and put our numerator and denominator together for the final answer."],
	["t", "What’s the final answer?", [
		r3.derivative().latex(),
		r3.derivative(true).latex(),
		r3.derivative().latex(true),
		r3.derivative(true).latex(true)
	], "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?", true],
	["m", "l", "It looks like you’re getting the hang of the quotient rule!"],
	["m", "r", "Thanks again, (new character)!"],
	["m", "r", "So, just to clarify…"],
	["m", "r", "…we’re basically just doing <b>low-d-high minus high-d-low all over low squared</b>?"],
	["m", "l", "Yup!"],
	["m", "r", "Thanks! This is really gonna help me tomorrow in our quiz 😄"],
	["m", "l", "Good luck! 👍🏻"],
	["m", "r", "Thanks!"]
];