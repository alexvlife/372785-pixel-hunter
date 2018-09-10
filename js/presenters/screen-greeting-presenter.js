import ScreenGreetingView from '../view/screen-greeting-view.js';
import Router from '../router.js';

class ScreenGreetingPresenter {
  constructor() {
    this.view = new ScreenGreetingView();
    this.view.onGoNextButtonClick = () => this.goNextScreen();
  }

  get element() {
    return this.view.element;
  }

  goNextScreen() {
    Router.showScreenRules();
  }
}

export default ScreenGreetingPresenter;
