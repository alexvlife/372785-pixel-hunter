import ScreenGreetingView from '../view/screen-greeting-view.js';
import Router from '../router.js';

class ScreenGreetingPresenter {
  constructor() {
    this.content = new ScreenGreetingView();
    this.content.onGoNextButtonClick = () => this.goNextScreen();
  }

  get element() {
    return this.content.element;
  }

  goNextScreen() {
    Router.showScreenRules();
  }
}

export default ScreenGreetingPresenter;
