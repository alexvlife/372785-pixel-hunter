import AbstractView from "./abstract-view";
import getHeaderTemplate from "../templates/header.template";
import getLevelTemplate from "../templates/level.template";

const ElementOpacityValue = {
  MAX: 1,
  MIN: 0,
};

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

  get gameQuestionElements() {
    return this.element.querySelectorAll(`.game__option`);
  }

  bind() {
    const goBackButton = this.element.querySelector(`.back`);

    goBackButton.addEventListener(`click`, () => {
      this.onGoBackButtonClick();
    });

    for (let questionElement of this.gameQuestionElements) {
      questionElement.addEventListener(`click`, (evt) => {
        this.onAnswer(evt);
      });
    }
  }

  updateGameTimer(timeLeft) {
    this.gameTimerElement.textContent = timeLeft;
  }

  switchOpacityOfElement() {
    this.gameTimerElement.style.opacity = (+this.gameTimerElement.style.opacity === ElementOpacityValue.MAX)
      ? ElementOpacityValue.MIN
      : ElementOpacityValue.MAX;
  }

  onAnswer() {
  }

  onGoBackButtonClick() {
  }
}
