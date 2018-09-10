import AbstractView from "./abstract-view";
import getHeaderTemplate from "../templates/header.template";

export default class ScreenHeaderView extends AbstractView {

  constructor(gameState, timeLimit) {
    super();
    this.gameState = gameState;
    this.timeLimit = timeLimit;
  }

  get template() {
    return getHeaderTemplate(this.gameState.lives, this.timeLimit);
  }

  bind() {
    const goBackButton = this.element.querySelector(`.back`);

    goBackButton.addEventListener(`click`, () => {
      this.onGoBackButtonClick();
    });
  }

  onGoBackButtonClick() {
  }
}
