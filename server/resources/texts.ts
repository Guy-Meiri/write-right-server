const texts = [
	"Don't cry because it's over, smile because it happened.",
	"I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle.",
	"Be yourself; everyone else is already taken.",
	"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
	"Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
	"You've gotta dance like there's nobody watching and Love like you'll never be hurt.",
	"You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
	"A room without books is like a body without a soul.",
	"So many books, so little time.",
	"You only live once, but if you do it right, once is enough.",
	"Be the change that you wish to see in the world.",
	"In three words I can sum up everything I've learned about life: it goes on.",
	'Friendship ... is born at the moment when one man says to another "What! You too? I thought that no one but myself . . .',
	"If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
	"Don’t walk behind me… I may not leadWalk beside me… just be my friend",
	"No one can make you feel inferior without your consent.",
	"If you tell the truth, you don't have to remember anything.",
	"A friend is someone who knows all about you and still loves you.",
	"Always forgive your enemies; nothing annoys them so much.",
	"People will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
];

const getRandomText = () => {
	return texts[Math.floor(Math.random() * texts.length)];
};
module.exports = { texts, getRandomText };
