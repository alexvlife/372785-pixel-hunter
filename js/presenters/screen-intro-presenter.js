import ScreenIntroView from '../view/screen-intro-view.js';
import Router from '../router.js';

class ScreenIntroPresenter {
  constructor() {
    this.view = new ScreenIntroView();
    this.view.onGoNextButtonClick = () => this.goNextScreen();
  }

  get element() {
    return this.view.element;
  }

  goNextScreen() {
    Router.showScreenGreeting();
  }
}

export default ScreenIntroPresenter;
