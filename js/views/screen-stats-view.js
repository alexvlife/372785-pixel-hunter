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

  get goBackButton() {
    return this.element.querySelector(`.back`);
  }

  bind() {
    this.goBackButton.addEventListener(`click`, this.onGoBackButtonClick);
  }

  removeEventListeners() {
    this.goBackButton.removeEventListener(`click`, this.onGoBackButtonClick);
  }

  onGoBackButtonClick() {
  }
}
