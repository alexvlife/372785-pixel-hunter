import ScreenIntroView from '../view/screen-intro-view.js';
import Router from '../router.js';

class ScreenIntroPresenter {
  constructor() {
    this.content = new ScreenIntroView();
    this.content.onGoNextButtonClick = () => this.goNextScreen();
  }

  get element() {
    return this.content.element;
  }

  goNextScreen() {
    Router.showScreenGreeting();
  }
}

export default ScreenIntroPresenter;