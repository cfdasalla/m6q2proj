let currentRecipient = io;

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
	["m", "You're from Block G, right?", right],
	["m", "Yeah!", left, 2000],
	["m", "You must be the guy IO told me about.", left, 4000],
	["m", "Yeah. I've been having trouble with Math lately.", right],
	["m", "He said you could help me with our current lesson.", right],
	["m", "Sure! I just finished my Bio project, so I can help you right now.", left, 5000],
	["m", "Really? Thanks!", right],
	["m", "The lesson's <b>product rule</b>, right?", left, 3000],
	["m", "Yeah.", right],
	["m", "I can differentiate pretty well now, but the functions have been getting harder to work with.", right],
	["m", "For example, one item from our homework was \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r1a.display() + ")(" + r1b.display() + ")\\).", right],
	["m", "I expand3e the function, which gave me \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r1.display() + ")\\).", right],
	["m", "Then I differentiated it, and I got \\(" + r1.derivative().display() + "\\).", right],
	["m", "It's all good, until I get bigger polynomials and it gets much harder to expand.", right],
	["m", "Is there a way to make things easier?", right],
	["m", "Oh, definitely.", left, 2500],
	["m", "When differentiating, we have something called the <b>product rule</b> made especially for this kind of functions.", left, 6000],
	["m", "Really? I've never heard of that before 😮", right],
	["m", "It's really useful, especially when the two functions being multiplied get messy.", left, 4000],
	["m", "What the product rule basically says is that if you have two functions being multiplied, and you're looking for the derivative of their product…", left, 7000],
	["m", "…you can take the first function and multiply it to the derivative of the second…", left, 4000],
	["m", "…then take the second function and multiply it to the derivative of the first…", left, 4000],
	["m", "…and finally, add the two products.", left, 2000],
	["m", "Hold on, that was so confusing 😵", right],
	["m", "Let's go through it one by one using the item you gave me earlier.", left, 1500],
	["m", "So we have two functions, \\(" + r1a.display() + "\\) and \\(" + r1b.display() + "\\).", left, 4000],
	["t", "What's the derivative of \\(" + r1b.display() + "\\)?", r1b.derivative().display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "It's just a constant, so it's easy to multiply that to the first function.", left, 3500],
	["m", "By doing that, we get \\(" + operatePoly(r1a, r1b.derivative(), "m").display() + "\\).", left, 4000],
	["m", "Now…", left],
	["t", "What's the derivative of \\(" + r1a.display() + "\\)?", r1a.derivative().display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "It's also a constant, so it's easy to multiply that to the second function.", left, 3500],
	["m", "By doing that, we get \\(" + operatePoly(r1b, r1a.derivative(), "m").display() + "\\).", left, 4000],
	["m", "Now we have our two products, \\(" + operatePoly(r1a, r1b.derivative(), "m").display() + "\\) and \\(" + operatePoly(r1b, r1a.derivative(), "m").display() + "\\).", left, 6000],
	["m", "All we have to do now is add them, and we'll get the answer!", left, 3000],
	["t", "What's the sum of \\(" + operatePoly(r1a, r1b.derivative(), "m").display() + "\\) and \\(" + operatePoly(r1b, r1a.derivative(), "m").display() + "\\)?", operatePoly(operatePoly(r1a, r1b.derivative(), "m"), operatePoly(r1b, r1a.derivative(), "m"), "a").display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Now, what was the answer you got earlier?", left, 2000],
	["m", "OMG! 🤯", right],
	["m", "It's also \\(" + r1.derivative().display() + "\\)!", right],
	["m", "See? The product rule works, and it works well!", left, 2000],
	["m", "To practice you more, let's have another example.", left, 2000],
	["m", "This time, let's have one function with degree 1 and the other with degree 2.", left, 3000],
	["m", "Let's have \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r2a.display() + ")(" + r2b.display() + ")\\).", left, 4000],
	["t", "What's the derivative of \\(" + r2b.display() + "\\)?", r2b.derivative().display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "It's just a constant, so it's easy to multiply that to the first function.", left, 3500],
	["t", "What's the product of \\(" + r2a.display() + "\\) and \\(" + r2b.derivative().display() + "\\)?", operatePoly(r2a, r2b.derivative(), "m").display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Now…", left],
	["t", "What's the derivative of \\(" + r2a.display() + "\\)?", r2a.derivative().display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Since this isn't a constant anymore, multiplying will be a bit harder now.", left, 3500],
	["t", "What's the product of \\(" + r2b.display() + "\\) and \\(" + r2a.derivative().display() + "\\)?", operatePoly(r2b, r2a.derivative(), "m").display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Now we have our two products, \\(" + operatePoly(r2a, r2b.derivative(), "m").display() + "\\) and \\(" + operatePoly(r2b, r2a.derivative(), "m").display() + "\\).", left, 6000],
	["m", "Just like earlier, adding them will give us our answer.", left, 3000],
	["t", "What's the sum of \\(" + operatePoly(r2a, r2b.derivative(), "m").display() + "\\) and \\(" + operatePoly(r2b, r2a.derivative(), "m").display() + "\\)?", operatePoly(operatePoly(r2a, r2b.derivative(), "m"), operatePoly(r2b, r2a.derivative(), "m"), "a").display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Looks like you're getting the hang of it now!", left, 2500],
	["m", "I'll give you one more question, this time with both functions having degree 2.", left, 3500],
	["m", "Let's have \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r3a.display() + ")(" + r3b.display() + ")\\).", left, 4000],
	["t", "What's the derivative of \\(" + r3b.display() + "\\)?", r3b.derivative().display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Now we multiply.", left, 1500],
	["t", "What's the product of \\(" + r3a.display() + "\\) and \\(" + r3b.derivative().display() + "\\)?", operatePoly(r3a, r3b.derivative(), "m").display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Now…", left],
	["t", "What's the derivative of \\(" + r3a.display() + "\\)?", r3a.derivative().display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Now we multiply.", left, 1500],
	["t", "What's the product of \\(" + r3b.display() + "\\) and \\(" + r3a.derivative().display() + "\\)?", operatePoly(r3b, r3a.derivative(), "m").display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Now we add our two products to get the answer.", left, 2500],
	["t", "What's the sum of \\(" + operatePoly(r3a, r3b.derivative(), "m").display() + "\\) and \\(" + operatePoly(r3b, r3a.derivative(), "m").display() + "\\)?", operatePoly(operatePoly(r3a, r3b.derivative(), "m"), operatePoly(r3b, r3a.derivative(), "m"), "a").display(), "That's right!", "I don't think that's right…", "Let's try again.", "Is it ", "?"],
	["m", "Great! Now you're on your way to mastering the product rule!", left, 2000],
	["m", "Thank you so much, (new character)!", right],
	["m", "Hopefully I don't forget how to do this…", right],
	["m", "Is there some way for me to remember this easier?", right],
	["m", "Oh! I forgot!", left, 1000],
	["m", "There's a mnemonic I use to remember the product rule easily.", left, 3000],
	["m", "It's <b>first-d-second + second-d-first</b>.", left, 2000],
	["m", "Basically, first times derivative of second plus second times derivative of first.", left, 4000],
	["m", "Whoa! That actually makes it easier to remember! 😲", right],
	["m", "Thanks for the mnemonic and for teaching me the product rule!", right],
	["m", "No problem!", left, 1000],
	["m", "Oh no! I just remembered!", left, 2000],
	["m", "What is it?", right],
	["m", "I still have a reaction paper due tomorrow!", left, 2500],
	["m", "Sorry, I have to go!", left, 1500],
	["m", "It's alright!", right],
	["m", "Good luck with that reaction paper!", right],
	["m", "Thanks!", left, 1000]
];
