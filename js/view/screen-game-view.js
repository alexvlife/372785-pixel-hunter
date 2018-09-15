import AbstractView from "./abstract-view";
import getHeaderTemplate from "../templates/header.template";
import getLevelTemplate from "../templates/level.template";

export default class ScreenGameView extends AbstractView {

  constructor(gameState, currentQuestion) {
    super();
    this.gameState = gameState;
    this.currentQuestion = currentQuestion;
  }

  get template() {
    return getHeaderTemplate(this.gameState.lives)
      + getLevelTemplate(this.gameState.answers, this.currentQuestion);
  }

  get gameTimerElement() {
    return this.element.querySelector(`.game__timer`);
  }

  bind() {
    const goBackButton = this.element.querySelector(`.back`);

    goBackButton.addEventListener(`click`, () => {
      this.onGoBackButtonClick();
    });

    this._element.addEventListener(`click`, (evt) => {
      this.onAnswer(evt);
    });
  }

  updateGameTimer(timeLeft) {
    this.gameTimerElement.innerHTML = timeLeft;
  }

  startFlash() {
    this.gameTimerElement.style.opacity ^= 1;
  }

  stopFlash() {
    clearTimeout(this._flashTimeout);
  }

  onAnswer() {
  }

  onGoBackButtonClick() {
  }
}
