class Game {
  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
  }

  guess(letter) {
    console.log(letter);
  }
  start() {
    /* generate alphabet by converting numbers to letters using .toString(36),
       number 10 = a, 11 = b, thats why we are starting from 10 and ending on 36 because this will gave us 26 letters */
    for (let i = 10; i < 36; i++) {
      const label = i.toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", () => this.guess(label));
      this.lettersWrapper.appendChild(button);
    }
  }
}
