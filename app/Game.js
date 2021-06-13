import { Quote } from './Quote.js';

class Game {
	// TODO: fetch those from some API? store in separate file?
	// TODO: implement .toLowerCase for text with big letters

	currentStep = 0;
	lastStep = 7;
	quotes = [
		{
			text: 'pan tadeusz',
			category: 'Utwór literacki',
		},
		{
			text: 'janko muzykant',
			category: 'Utwór literacki',
		},
		{
			text: 'akademia pana kleksa',
			category: 'Film',
		},
		{
			text: 'avengers',
			category: 'Film',
		},
		{
			text: 'thor',
			category: 'Film',
		},
	];

	constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
		this.lettersWrapper = lettersWrapper;
		this.categoryWrapper = categoryWrapper;
		this.wordWrapper = wordWrapper;
		this.outputWrapper = outputWrapper;

		/* draw single quote from array of quotes */
		const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
		this.categoryWrapper.innerHTML = category;
		this.quote = new Quote(text);
	}

	guess(letter, event) {
		/* disable button after click */
		event.target.disabled = true;
		console.log(letter);
		if (this.quote.guess(letter)) {
			this.drawQuote();
		} else {
			this.currentStep++;
			document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
			if (this.currentStep == this.lastStep) {
				this.loosing();
			}
		}
	}

	drawLetters() {
		/* generate alphabet by converting numbers to letters using .toString(36),
       number 10 = a, 11 = b, thats why we are starting from 10 and ending on 36 because this will gave us 26 letters */
		for (let i = 10; i < 36; i++) {
			const label = i.toString(36);
			const button = document.createElement('button');
			button.innerHTML = label;
			button.addEventListener('click', (event) => this.guess(label, event));
			this.lettersWrapper.appendChild(button);
		}
	}

	drawQuote() {
		const content = this.quote.getContent();
		// console.log(content);
		this.wordWrapper.innerHTML = content;
		if (!content.includes('_')) {
			this.winning();
		}
	}

	start() {
		document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
		this.drawLetters();
		this.drawQuote();
	}

	winning() {
		this.wordWrapper.innerHTML = 'You have won :)';
		this.lettersWrapper.innerHTML = '';
	}

	loosing() {
		this.wordWrapper.innerHTML = 'You loose! Game over!';
		this.lettersWrapper.innerHTML = '';
	}
}

const game = new Game({
	lettersWrapper: document.getElementById('letters'),
	categoryWrapper: document.getElementById('category'),
	wordWrapper: document.getElementById('word'),
	outputWrapper: document.getElementById('output'),
});
game.start();
