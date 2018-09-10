import AbstractPresenter from './abstract-presenter.js';
import ScreenStatsView from '../view/screen-stats-view.js';
import Router from '../router.js';

class ScreenStatsPresenter extends AbstractPresenter {
  constructor(finalGameState) {
    super();
    this.view = new ScreenStatsView(finalGameState);
    this.view.onGoBackButtonClick = () => this.goBackScreen();
  }

  goBackScreen() {
    Router.showScreenGreeting();
  }
}

export default ScreenStatsPresenter;
