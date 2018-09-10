import AbstractView from "./abstract-view";
import getLevelTemplate from "../templates/level.template";

export default class ScreenGameView extends AbstractView {

  constructor(gameState, currentQuestion) {
    super();
    this.gameState = gameState;
    this.currentQuestion = currentQuestion;
  }

  get template() {
    return getLevelTemplate(this.gameState.answers, this.currentQuestion);
  }

  bind() {
    this._element.addEventListener(`click`, (evt) => {
      this.onAnswer(evt);
    });
  }

  onAnswer() {
  }
}
