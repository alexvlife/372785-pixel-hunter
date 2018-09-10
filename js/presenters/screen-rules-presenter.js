import ScreenRulesView from '../view/screen-rules-view.js';
import Router from '../router.js';

class ScreenRulesPresenter {
  constructor() {
    this.view = new ScreenRulesView();

    this.view.onPlayerNameInput = (evt) => this.switchStateGoNextButton(evt);

    this.view.onGoNextButtonClick = (evt) => {
      evt.preventDefault();
      const playerName = this.getPlayerName();
      this.goScreenGame(playerName);
    };

    this.view.onGoBackButtonClick = () => this.goBackScreen();
  }

  get element() {
    return this.view.element;
  }

  switchStateGoNextButton(evt) {
    const canProceed = evt.target.value ? true : false;
    this.view.switchProceedState(canProceed);
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
