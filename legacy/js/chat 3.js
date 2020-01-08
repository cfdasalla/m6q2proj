let currentRecipient = io;

let nextChapter = "../4/"

// First example: d/dx (degree 1 * degree 1)

maxCoef = 10;

let [r1a, r1b] = [new Polynomial(), new Polynomial()];
r1a.randomize(1);
r1b.randomize(1);
let r1 = operatePoly(r1a, r1b, "m");

// Second example: d/dx (degree 2 * degree 1)

let [r2a, r2b] = [new Polynomial(), new Polynomial()];
r2a.randomize(2);
r2b.randomize(1);
let r2 = operatePoly(r2a, r2b, "m");

// Third example: d/dx (degree 2 * degree 2)

let [r3a, r3b] = [new Polynomial(), new Polynomial()];
r3a.randomize(2);
r3b.randomize(2);
let r3 = operatePoly(r3a, r3b, "m");

// For polls: question, options, correct answer, right feedback, wrong feedback, ulit feedback, prepend to answer, postpend to answer

let messages = [
	["m", "Hi, (new character)!", right],
	["m", "You’re from Block G, right?", right],
	["m", "Yeah!", left],
	["m", "You must be the guy IO was telling me about.", left],
	["m", "Yeah. I’ve been having trouble with Math lately.", right],
	["m", "He said you could help me with our current lesson.", right],
	["m", "Sure! I just finished my Bio project, so I can help you right now.", left],
	["m", "Really? Thanks!", right],
	["m", "The lesson’s <b>product rule</b>, right?", left],
	["m", "Yeah.", right],
	["m", "I can differentiate pretty well now, but the functions have been getting harder to work with.", right],
	["m", "For example, one item from our homework was \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r1a.latex() + ")(" + r1b.latex() + ")\\).", right],
	["m", "I expanded the function, which gave me \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r1.latex() + ")\\).", right],
	["m", "Then I differentiated it, and I got \\(" + r1.derivative().latex() + "\\).", right],
	["m", "It’s all good, until I get bigger polynomials and it gets much harder to expand.", right],
	["m", "Is there a way to make things easier?", right],
	["m", "Oh, definitely.", left],
	["m", "When differentiating, we have something called the <b>product rule</b> made especially for this kind of functions.", left],
	["m", "Really? I’ve never heard of that before 😮", right],
	["m", "It’s really useful, especially when the two functions being multiplied get messy.", left],
	["m", "What the product rule basically says is that if you have two functions being multiplied, and you’re looking for the derivative of their product…", left],
	["m", "…you can take the first function and multiply it to the derivative of the second…", left],
	["m", "…then take the second function and multiply it to the derivative of the first…", left],
	["m", "…and finally, add the two products.", left],
	["m", "Hold on, that was so confusing 😵", right],
	["m", "Let’s go through it one by one using the item you gave me earlier.", left],
	["m", "So we have two functions, \\(" + r1a.latex() + "\\) and \\(" + r1b.latex() + "\\).", left],
	["t", "What’s the derivative of \\(" + r1b.latex() + "\\)?", r1b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "It’s just a constant, so it’s easy to multiply that to the first function.", left],
	["m", "By doing that, we get \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\).", left],
	["m", "Now…", left],
	["t", "What’s the derivative of \\(" + r1a.latex() + "\\)?", r1a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "It’s also a constant, so it’s easy to multiply that to the second function.", left],
	["m", "By doing that, we get \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\).", left],
	["m", "Now we have our two products, \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\).", left],
	["m", "All we have to do now is add them, and we’ll get the answer!", left],
	["t", "What’s the sum of \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r1a, r1b.derivative(), "m"), operatePoly(r1b, r1a.derivative(), "m"), "a").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now, what was the answer you got earlier?", left],
	["m", "OMG! 🤯", right],
	["m", "It’s also \\(" + r1.derivative().latex() + "\\)!", right],
	["m", "See? The product rule works, and it works well!", left],
	["m", "To practice you more, let’s have another example.", left],
	["m", "This time, let’s have one function with degree 1 and the other with degree 2.", left],
	["m", "Let’s have \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r2a.latex() + ")(" + r2b.latex() + ")\\).", left],
	["t", "What’s the derivative of \\(" + r2b.latex() + "\\)?", r2b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "It’s just a constant, so it’s easy to multiply that to the first function.", left],
	["t", "What’s the product of \\(" + r2a.latex() + "\\) and \\(" + r2b.derivative().latex() + "\\)?", operatePoly(r2a, r2b.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now…", left],
	["t", "What’s the derivative of \\(" + r2a.latex() + "\\)?", r2a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Since this isn’t a constant anymore, multiplying will be a bit harder now.", left],
	["t", "What’s the product of \\(" + r2b.latex() + "\\) and \\(" + r2a.derivative().latex() + "\\)?", operatePoly(r2b, r2a.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now we have our two products, \\(" + operatePoly(r2a, r2b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r2b, r2a.derivative(), "m").latex() + "\\).", left],
	["m", "Just like earlier, adding them will give us our answer.", left],
	["t", "What’s the sum of \\(" + operatePoly(r2a, r2b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r2b, r2a.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r2a, r2b.derivative(), "m"), operatePoly(r2b, r2a.derivative(), "m"), "a").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Looks like you’re getting the hang of it now!", left],
	["m", "I’ll give you one more question, this time with both functions having degree 2.", left],
	["m", "Let’s have \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r3a.latex() + ")(" + r3b.latex() + ")\\).", left],
	["t", "What’s the derivative of \\(" + r3b.latex() + "\\)?", r3b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now we multiply.", left],
	["t", "What’s the product of \\(" + r3a.latex() + "\\) and \\(" + r3b.derivative().latex() + "\\)?", operatePoly(r3a, r3b.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now…", left],
	["t", "What’s the derivative of \\(" + r3a.latex() + "\\)?", r3a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now we multiply.", left],
	["t", "What’s the product of \\(" + r3b.latex() + "\\) and \\(" + r3a.derivative().latex() + "\\)?", operatePoly(r3b, r3a.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Now we add our two products to get the answer.", left],
	["t", "What’s the sum of \\(" + operatePoly(r3a, r3b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r3b, r3a.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r3a, r3b.derivative(), "m"), operatePoly(r3b, r3a.derivative(), "m"), "a").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "Great! Now you’re on your way to mastering the product rule!", left],
	["m", "Thank you so much, (new character)!", right],
	["m", "Hopefully I don’t forget how to do this…", right],
	["m", "Is there some way for me to remember this easier?", right],
	["m", "Oh! I forgot!", left],
	["m", "There’s a mnemonic I use to remember the product rule easily.", left],
	["m", "It’s <b>first-d-second + second-d-first</b>.", left],
	["m", "Basically, first times derivative of second plus second times derivative of first.", left],
	["m", "Whoa! That actually makes it easier to remember! 😲", right],
	["m", "Thanks for the mnemonic and for teaching me the product rule!", right],
	["m", "No problem!", left],
	["m", "Oh no! I just remembered!", left],
	["m", "What is it?", right],
	["m", "I still have a reaction paper due tomorrow!", left],
	["m", "Sorry, I have to go!", left],
	["m", "It’s alright!", right],
	["m", "Good luck with that reaction paper!", right],
	["m", "Thanks!", left]
];