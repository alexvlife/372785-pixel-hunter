import AbstractView from "./abstract-view";
import getHeaderTemplate from "../templates/header.template";
import getResultTemplate from "../templates/result.template";

export default class ScreenStatsView extends AbstractView {

  constructor(finalGameState) {
    super();
    this.finalGameState = finalGameState;
  }

  get template() {
    return getHeaderTemplate() + getResultTemplate(this.finalGameState);
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
