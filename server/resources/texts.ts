const texts = [
	"Don't cry because it's over, smile because it happened.",
	"I have a feeling we're not in Kansas anymore.",
	"Be yourself; everyone else is already taken.",
	"Fortune favors the brave.",
	"Where there is love there is life.",
	"If you're going through hell, keep going.",
	"The cure for boredom is curiosity. There is no cure for curiosity.",
	"A room without books is like a body without a soul.",
	"So many books, so little time.",
	"You only live once, but if you do it right, once is enough.",
	"Be the change that you wish to see in the world.",
	"In three words I can sum up everything I've learned about life: it goes on.",
	"The truth is rarely pure and never simple.",
	"Knowledge comes, but wisdom lingers.",
	"Questions are never indiscreet, answers sometimes are.",
	"No one can make you feel inferior without your consent.",
	"If you tell the truth, you don't have to remember anything.",
	"A friend is someone who knows all about you and still loves you.",
	"Always forgive your enemies; nothing annoys them so much.",
	"I can resist everything except temptation.",
];

const getRandomText = () => {
	return texts[Math.floor(Math.random() * texts.length)];
};
module.exports = { texts, getRandomText };
