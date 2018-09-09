import ScreenRulesView from '../view/screen-rules-view.js';
import Router from '../router.js';

class ScreenRulesPresenter {
  constructor() {
    this.content = new ScreenRulesView();

    this.content.onPlayerNameInput = (evt) => this.switchStateGoNextButton(evt);

    this.content.onGoNextButtonClick = (evt) => {
      evt.preventDefault();
      const playerName = this.getPlayerName();
      this.goScreenGame(playerName);
    };

    this.content.onGoBackButtonClick = () => this.goBackScreen();
  }

  get element() {
    return this.content.element;
  }

  switchStateGoNextButton(evt) {
    const canProceed = evt.target.value ? true : false;
    this.content.switchProceedState(canProceed);
  }

  getPlayerName() {
    const playerNameInput = this.element.querySelector(`.rules__input`);
    return playerNameInput.value;
  }

  goScreenGame(playerName) {
    Router.showScreenGame(playerName);
  }

  goBackScreen() {
    Router.showScreenGreeting();
  }

}

export default ScreenRulesPresenter;
