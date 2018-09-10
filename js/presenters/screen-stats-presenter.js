import ScreenStatsView from '../view/screen-stats-view.js';
import Router from '../router.js';

class ScreenStatsPresenter {
  constructor(finalGameState) {
    this.view = new ScreenStatsView(finalGameState);
    this.view.onGoBackButtonClick = () => this.goBackScreen();
  }

  get element() {
    return this.view.element;
  }

  goBackScreen() {
    Router.showScreenGreeting();
  }
}

export default ScreenStatsPresenter;
