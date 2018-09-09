import ScreenStatsView from '../view/screen-stats-view.js';
import Router from '../router.js';

class ScreenStatsPresenter {
  constructor(finalGameState) {
    this.content = new ScreenStatsView(finalGameState);
    this.content.onGoBackButtonClick = () => this.goBackScreen();
  }

  get element() {
    return this.content.element;
  }

  goBackScreen() {
    Router.showScreenGreeting();
  }
}

export default ScreenStatsPresenter;
