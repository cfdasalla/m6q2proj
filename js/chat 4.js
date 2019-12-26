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
	["m", "Hey, it’s me again!", right],
	["m", "I need help with my Math homework…", right],
	["m", "…that is, if you’re not busy right now.", right],
	["m", "Well, I’m free right now.", left],
	["m", "Why, what’s up?", left],
	["m", "The Math homework is so hard, I don’t even know where to start 😖", right],
	["m", "OK, let’s see…", left],
	["m", "What’s number 1?", left],
	["m", "Number 1 is \\(\\displaystyle\\frac{\\mathrm{d}}{\\mathrm{d}x}\\left(" + r1.latex() + "\\right)\\).", right],
	["m", "Oh, so it’s a rational function you’re being asked to differentiate now.", left],
	["m", "Yeah, and I don’t know how to go about it.", right],
	["m", "I can’t just expand the function just like how I did before I learned the product rule.", right],
	["m", "Speaking of product rule…", right],
	["m", "…is there some kind of quotient rule, too?", right],
	["m", "I was just about to get into that!", left],
	["m", "Yes, there actually is something called the <b>quotient rule</b>, used especially with rational functions like this.", left],
	["m", "Is it as complicated as the product rule?", right],
	["m", "Unfortunately…", left],
	["m", "…it’s actually a little worse.", left],
	["m", "Oh no 😭", right],
	["m", "Oh well, if it’s going to make my life easier, I might as well learn it.", right],
	["m", "Don’t worry, I’ll try to make it simple.", left],
	["m", "The quotient rule is in some ways similar, but in other ways different from the product rule.", left],
	["m", "Since we’re working with rational expressions, we’re going to use “low” and “high” for our mnemonic to make things easier.", left],
	["m", "In the quotient rule, we do <b>low-d-high minus high-d-low</b>.", left],
	["m", "That is, we multiply the denominator to the derivative of the numerator, then multiply the numerator to the derivative of the denominator, then subtract them.", left],
	["m", "That’s one of the most important differences of the quotient rule from the product rule; forgetting this will give you a very wrong answer.", left],
	["m", "OK, low-d-high minus high-d-low… got it!", right],
	["m", "It’s not as bad as it sounds!", right],
	["m", "Wait, we’re not yet done.", left],
	["m", "Whoops, sorry…", right],
	["m", "We take this difference, and divide that entire thing by the <b>square</b> of the second function.", left],
	["m", "Well, it does make sense that the result would also become a rational expression…", right],
	["m", "Let’s walk through that question you sent me earlier.", left],
	["m", "So we have two functions, \\(" + r1a.latex() + "\\) and \\(" + r1b.latex() + "\\).", left],
	["t", "What’s the derivative of \\(" + r1a.latex() + "\\)?", r1a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "It’s just a constant, so it’s easy to multiply that to the denominator.", left],
	["m", "By doing that, we get \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\).", left],
	["m", "Now…", left],
	["t", "What’s the derivative of \\(" + r1b.latex() + "\\)?", r1b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "It’s also a constant, so it’s easy to multiply that to the numerator.", left],
	["m", "By doing that, we get \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\).", left],
	["m", "Now we have our two products, \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\).", left],
	["m", "We’re now going to subtract them to get our numerator.", left],
	["t", "What’s the difference of \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r1b, r1a.derivative(), "m"), operatePoly(r1a, r1b.derivative(), "m"), "s").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Finally, we’re going to take our second function and square it for our denominator.", left],
	["t", "What’s the square of \\(" + r1b.latex() + "\\)?", operatePoly(r1b, r1b, "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now, when we put those together, our answer turns out to be \\(\\displaystyle" + r1.derivative().latex() + "\\).", left],
	["m", "OK, I think I’m starting to get it now…", right],
	["m", "Maybe doing number 2 will help?", right],
	["m", "Sure. What’s the question?", left],
	["m", "It’s \\(\\displaystyle\\frac{\\mathrm{d}}{\\mathrm{d}x}\\left(" + r2.latex() + "\\right)\\).", right],
	["m", "Alright, let’s start.", left],
	["t", "What’s the derivative of \\(" + r2a.latex() + "\\)?", r2a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Then, we multiply this to the denominator.", left],
	["t", "What’s the product of \\(" + r2b.latex() + "\\) and \\(" + r2a.derivative().latex() + "\\)?", operatePoly(r2b, r2a.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now…", left],
	["t", "What’s the derivative of \\(" + r2b.latex() + "\\)?", r2b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now, we multiply this to the numerator.", left],
	["t", "What’s the product of \\(" + r2a.latex() + "\\) and \\(" + r2b.derivative().latex() + "\\)?", operatePoly(r2a, r2b.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now we have our two products, \\(" + operatePoly(r2b, r2a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r2a, r2b.derivative(), "m").latex() + "\\).", left],
	["m", "Just like earlier, subtracting them will give us our numerator.", left],
	["t", "What’s the difference of \\(" + operatePoly(r2b, r2a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r2a, r2b.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r2b, r2a.derivative(), "m"), operatePoly(r2a, r2b.derivative(), "m"), "s").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Finally, we square our second function, \\(" + r2b.latex() + "\\), for our denominator.", left],
	["m", "You don't have to worry about expanding the denominator, by the way. It’s fine to just leave it unexpanded.", left],
	["m", "Then, we put the numerator and denominator together in our rational expression.", left],
	["t", "What’s the final answer?", [
		r2.derivative().latex(),
		r2.derivative(true).latex(),
		r2.derivative().latex(true),
		r2.derivative(true).latex(true)
	], "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?", true],
	["m", "Looks like you’re getting the hang of it now!", left],
	["m", "Yay! There’s only one item left!", right],
	["m", "It looks harder than the first two though…", right],
	["m", "Can you walk me through the procedure again?", right],
	["m", "It’s \\(\\displaystyle\\frac{\\mathrm{d}}{\\mathrm{d}x}\\left(" + r3.latex() + "\\right)\\).", right],
	["m", "Huh… so the numerator is of degree 2…", left],
	["m", "No worries, the procedure’s just the same.", left],
	["m", "The solution’s just going to be longer.", left],
	["m", "Alright, let’s start!", left],
	["t", "What’s the derivative of \\(" + r3a.latex() + "\\)?", r3a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now we multiply.", left],
	["t", "What’s the product of \\(" + r3b.latex() + "\\) and \\(" + r3a.derivative().latex() + "\\)?", operatePoly(r3b, r3a.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now…", left],
	["t", "What’s the derivative of \\(" + r3b.latex() + "\\)?", r3b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now we multiply.", left],
	["t", "What’s the product of \\(" + r3a.latex() + "\\) and \\(" + r3b.derivative().latex() + "\\)?", operatePoly(r3a, r3b.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now we subtract our two products to get our numerator.", left],
	["t", "What’s the difference of \\(" + operatePoly(r3b, r3a.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r3a, r3b.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r3b, r3a.derivative(), "m"), operatePoly(r3a, r3b.derivative(), "m"), "s").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Finally, we’ll square \\(" + r3b.latex() + "\\) for our denominator, and put our numerator and denominator together for the final answer.", left],
	["t", "What’s the final answer?", [
		r3.derivative().latex(),
		r3.derivative(true).latex(),
		r3.derivative().latex(true),
		r3.derivative(true).latex(true)
	], "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?", true],
	["m", "It looks like you’re getting the hang of the quotient rule!", left],
	["m", "Thanks again, (new character)!", right],
	["m", "So, just to clarify…", right],
	["m", "…we’re basically just doing <b>low-d-high minus high-d-low all over low squared</b>?", right],
	["m", "Yup!", left],
	["m", "Thanks! This is really gonna help me tomorrow in our quiz 😄", right],
	["m", "Good luck! 👍🏻", left],
	["m", "Thanks!", right]
];