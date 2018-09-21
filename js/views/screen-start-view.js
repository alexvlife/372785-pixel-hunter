import AbstractView from "./abstract-view";
import getGreetingTemplate from "../templates/greeting.template";
import getIntroTemplate from "../templates/intro.template";

const TRANSITION_STYLE_VALUE = `opacity 2s linear`;

const OpacityStyleValue = {
  SHOW: `1`,
  HIDE: `0`,
};

const GreetingElementStyle = {
  POSITION: `absolute`,
  TOP: `5%`,
  LEFT: `10%`,
};

export default class ScreenStartView extends AbstractView {

  get template() {
    return getIntroTemplate() + getGreetingTemplate();
  }

  get introElement() {
    return this._element.querySelector(`.intro`);
  }

  get greetingElement() {
    return this._element.querySelector(`.greeting`);
  }

  get goNextButton() {
    return this._element.querySelector(`.greeting__continue`);
  }

  bind() {
    this.goNextButton.addEventListener(`click`, this.onGoNextButtonClick);
    this.greetingElement.style.opacity = OpacityStyleValue.HIDE;
    this.greetingElement.style.position = GreetingElementStyle.POSITION;
    this.greetingElement.style.top = GreetingElementStyle.TOP;
    this.greetingElement.style.left = GreetingElementStyle.LEFT;
  }

  showGreeting() {
    this.greetingElement.style.opacity = OpacityStyleValue.SHOW;
    this.greetingElement.style.transition = TRANSITION_STYLE_VALUE;
  }

  hideIntro() {
    this.introElement.style.opacity = OpacityStyleValue.HIDE;
    this.introElement.style.transition = TRANSITION_STYLE_VALUE;
  }

  removeEventListeners() {
    this.goNextButton.removeEventListener(`click`, this.onGoNextButtonClick);
  }

  onGoNextButtonClick() {
  }
}
