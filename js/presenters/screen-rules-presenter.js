import AbstractPresenter from './abstract-presenter.js';
import ScreenRulesView from '../views/screen-rules-view.js';
import Router from '../router.js';

export default class ScreenRulesPresenter extends AbstractPresenter {
  constructor() {
    super();
    this.view = new ScreenRulesView();

    this.view.onPlayerNameInput = (evt) => this.switchStateGoNextButton(evt);

    this.view.onGoNextButtonClick = (evt) => {
      evt.preventDefault();
      const playerName = this.getPlayerName();
      this.goScreenGame(playerName);
    };

    this.view.onGoBackButtonClick = () => this.goBackScreen();
  }

  switchStateGoNextButton(evt) {
    const canProceed = evt.target.value ? true : false;
    this.view.switchProceedState(canProceed);
  }

  getPlayerName() {
    const playerNameInput = this.view.element.querySelector(`.rules__input`);
    return playerNameInput.value;
  }

  goScreenGame(playerName) {
    this.view.removeEventListeners();
    Router.showScreenGame(playerName);
  }

  goBackScreen() {
    this.view.removeEventListeners();
    Router.showScreenGreeting();
  }

}
