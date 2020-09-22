import { Quote } from "./Quote.js";
class Game {
  currentStep = 0;
  lastStep = 7;
  quotes = [
    {
      text: "pan tadeusz",
      category: "Utwór literacki",
    },
    {
      text: "janko muzykant",
      category: "Utwór literacki",
    },
    {
      text: "matrix",
      category: "Film",
    },
    {
      text: "ace ventura",
      category: "Film",
    },
    {
      text: "kontakt",
      category: "Film",
    },
    {
      text: "ja irena i ja",
      category: "Film",
    },
    {
      text: "mars",
      category: "Film",
    },
  ];
  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;

    const { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
  }

  guess(letter, event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName("step")[
        this.currentStep
      ].style.opacity = 1;
      document
        .getElementsByClassName("step")
        [this.currentStep].classList.add("shake");
      if (this.currentStep == this.lastStep) {
        this.losing();
      }
    }
    console.log(this.currentStep);
  }
  drawLetters() {
    for (let i = 10; i < 36; i++) {
      const label = i.toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (event) => this.guess(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }
  drawQuote() {
    const content = this.quote.getContent();

    this.wordWrapper.innerHTML = content;
    if (!content.includes("_")) {
      this.wining();
    }
  }
  start() {
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
  }
  resetGame() {
    this.quote.guessed = [];
    this.currentStep = 0;

    const { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);

    const images = [...document.getElementsByClassName("step")];
    images.forEach((element) => {
      element.style.opacity = 0.1;
      element.classList.remove("shake");
    });
    document.querySelector(
      "#output > div:nth-child(1) > img"
    ).style.opacity = 1;
    game.start();
  }
  wining() {
    this.wordWrapper.innerHTML = "Gratulacje, wygałeś";
    this.lettersWrapper.innerHTML = "";
    const btn = document.createElement("button");
    btn.innerHTML = "Reset";
    btn.addEventListener("click", () => {
      this.resetGame();
    });
    this.wordWrapper.appendChild(btn);
    this.categoryWrapper.innerHTML = "";
  }
  losing() {
    this.wordWrapper.innerHTML = "Przegrałeś";
    this.lettersWrapper.innerHTML = "";
    const btn = document.createElement("button");
    btn.innerHTML = "Reset";
    btn.addEventListener("click", () => {
      this.resetGame();
    });
    this.wordWrapper.appendChild(btn);
    this.categoryWrapper.innerHTML = "";
  }
}
const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});
game.start();
