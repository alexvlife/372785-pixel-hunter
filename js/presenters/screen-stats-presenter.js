import AbstractPresenter from './abstract-presenter.js';
import ScreenStatsView from '../views/screen-stats-view.js';
import Router from '../router.js';

export default class ScreenStatsPresenter extends AbstractPresenter {
  constructor(finalGameState) {
    super();
    this.view = new ScreenStatsView(finalGameState);
    this.view.onGoBackButtonClick = () => this.goBackScreen();
  }

  goBackScreen() {
    Router.showScreenGreeting();
  }
}
