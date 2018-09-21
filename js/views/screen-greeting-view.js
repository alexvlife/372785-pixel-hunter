import AbstractView from "./abstract-view";
import getGreetingTemplate from "../templates/greeting.template";

export default class ScreenGreetingView extends AbstractView {

  get template() {
    return getGreetingTemplate();
  }

  get goNextButton() {
    return this._element.querySelector(`.greeting__continue`);
  }

  bind() {
    this.goNextButton.addEventListener(`click`, this.onGoNextButtonClick);
  }

  removeEventListeners() {
    this.goNextButton.removeEventListener(`click`, this.onGoNextButtonClick);
  }

  onGoNextButtonClick() {
  }
}
