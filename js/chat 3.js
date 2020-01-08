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
	["m", "r", "Hi, (new character)!"],
	["m", "r", "You’re from Block G, right?"],
	["m", "l", "Yeah!"],
	["m", "l", "You must be the guy IO was telling me about."],
	["m", "r", "Yeah. I’ve been having trouble with Math lately."],
	["m", "r", "He said you could help me with our current lesson."],
	["m", "l", "Sure! I just finished my Bio project, so I can help you right now."],
	["m", "r", "Really? Thanks!"],
	["m", "l", "The lesson’s <b>product rule</b>, right?"],
	["m", "r", "Yeah."],
	["m", "r", "I can differentiate pretty well now, but the functions have been getting harder to work with."],
	["m", "r", "For example, one item from our homework was \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r1a.latex() + ")(" + r1b.latex() + ")\\)."],
	["m", "r", "I expanded the function, which gave me \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r1.latex() + ")\\)."],
	["m", "r", "Then I differentiated it, and I got \\(" + r1.derivative().latex() + "\\)."],
	["m", "r", "It’s all good, until I get bigger polynomials and it gets much harder to expand."],
	["m", "r", "Is there a way to make things easier?"],
	["m", "l", "Oh, definitely."],
	["m", "l", "When differentiating, we have something called the <b>product rule</b> made especially for this kind of functions."],
	["m", "r", "Really? I’ve never heard of that before 😮"],
	["m", "l", "It’s really useful, especially when the two functions being multiplied get messy."],
	["m", "l", "What the product rule basically says is that if you have two functions being multiplied, and you’re looking for the derivative of their product…"],
	["m", "l", "…you can take the first function and multiply it to the derivative of the second…"],
	["m", "l", "…then take the second function and multiply it to the derivative of the first…"],
	["m", "l", "…and finally, add the two products."],
	["m", "r", "Hold on, that was so confusing 😵"],
	["m", "l", "Let’s go through it one by one using the item you gave me earlier."],
	["m", "l", "So we have two functions, \\(" + r1a.latex() + "\\) and \\(" + r1b.latex() + "\\)."],
	["t", "What’s the derivative of \\(" + r1b.latex() + "\\)?", r1b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "It’s just a constant, so it’s easy to multiply that to the first function."],
	["m", "l", "By doing that, we get \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\)."],
	["m", "l", "Now…"],
	["t", "What’s the derivative of \\(" + r1a.latex() + "\\)?", r1a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "It’s also a constant, so it’s easy to multiply that to the second function."],
	["m", "l", "By doing that, we get \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\)."],
	["m", "l", "Now we have our two products, \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\)."],
	["m", "l", "All we have to do now is add them, and we’ll get the answer!"],
	["t", "What’s the sum of \\(" + operatePoly(r1a, r1b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r1b, r1a.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r1a, r1b.derivative(), "m"), operatePoly(r1b, r1a.derivative(), "m"), "a").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now, what was the answer you got earlier?"],
	["m", "r", "OMG! 🤯"],
	["m", "r", "It’s also \\(" + r1.derivative().latex() + "\\)!"],
	["m", "l", "See? The product rule works, and it works well!"],
	["m", "l", "To practice you more, let’s have another example."],
	["m", "l", "This time, let’s have one function with degree 1 and the other with degree 2."],
	["m", "l", "Let’s have \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r2a.latex() + ")(" + r2b.latex() + ")\\)."],
	["t", "What’s the derivative of \\(" + r2b.latex() + "\\)?", r2b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "It’s just a constant, so it’s easy to multiply that to the first function."],
	["t", "What’s the product of \\(" + r2a.latex() + "\\) and \\(" + r2b.derivative().latex() + "\\)?", operatePoly(r2a, r2b.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now…"],
	["t", "What’s the derivative of \\(" + r2a.latex() + "\\)?", r2a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Since this isn’t a constant anymore, multiplying will be a bit harder now."],
	["t", "What’s the product of \\(" + r2b.latex() + "\\) and \\(" + r2a.derivative().latex() + "\\)?", operatePoly(r2b, r2a.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now we have our two products, \\(" + operatePoly(r2a, r2b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r2b, r2a.derivative(), "m").latex() + "\\)."],
	["m", "l", "Just like earlier, adding them will give us our answer."],
	["t", "What’s the sum of \\(" + operatePoly(r2a, r2b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r2b, r2a.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r2a, r2b.derivative(), "m"), operatePoly(r2b, r2a.derivative(), "m"), "a").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Looks like you’re getting the hang of it now!"],
	["m", "l", "I’ll give you one more question, this time with both functions having degree 2."],
	["m", "l", "Let’s have \\(\\frac{\\mathrm{d}}{\\mathrm{d}x}(" + r3a.latex() + ")(" + r3b.latex() + ")\\)."],
	["t", "What’s the derivative of \\(" + r3b.latex() + "\\)?", r3b.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now we multiply."],
	["t", "What’s the product of \\(" + r3a.latex() + "\\) and \\(" + r3b.derivative().latex() + "\\)?", operatePoly(r3a, r3b.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now…"],
	["t", "What’s the derivative of \\(" + r3a.latex() + "\\)?", r3a.derivative().latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now we multiply."],
	["t", "What’s the product of \\(" + r3b.latex() + "\\) and \\(" + r3a.derivative().latex() + "\\)?", operatePoly(r3b, r3a.derivative(), "m").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Now we add our two products to get the answer."],
	["t", "What’s the sum of \\(" + operatePoly(r3a, r3b.derivative(), "m").latex() + "\\) and \\(" + operatePoly(r3b, r3a.derivative(), "m").latex() + "\\)?", operatePoly(operatePoly(r3a, r3b.derivative(), "m"), operatePoly(r3b, r3a.derivative(), "m"), "a").latex(), "That’s right!", "I don’t think that’s right…", "Let’s try again.", "Is it ", "?"],
	["m", "l", "Great! Now you’re on your way to mastering the product rule!"],
	["m", "r", "Thank you so much, (new character)!"],
	["m", "r", "Hopefully I don’t forget how to do this…"],
	["m", "r", "Is there some way for me to remember this easier?"],
	["m", "l", "Oh! I forgot!"],
	["m", "l", "There’s a mnemonic I use to remember the product rule easily."],
	["m", "l", "It’s <b>first-d-second + second-d-first</b>."],
	["m", "l", "Basically, first times derivative of second plus second times derivative of first."],
	["m", "r", "Whoa! That actually makes it easier to remember! 😲"],
	["m", "r", "Thanks for the mnemonic and for teaching me the product rule!"],
	["m", "l", "No problem!"],
	["m", "l", "Oh no! I just remembered!"],
	["m", "r", "What is it?"],
	["m", "l", "I still have a reaction paper due tomorrow!"],
	["m", "l", "Sorry, I have to go!"],
	["m", "r", "It’s alright!"],
	["m", "r", "Good luck with that reaction paper!"],
	["m", "l", "Thanks!"]
];