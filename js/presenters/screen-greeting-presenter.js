import AbstractPresenter from './abstract-presenter.js';
import ScreenGreetingView from '../view/screen-greeting-view.js';
import Router from '../router.js';

class ScreenGreetingPresenter extends AbstractPresenter {
  constructor() {
    super();
    this.view = new ScreenGreetingView();
    this.view.onGoNextButtonClick = () => this.goNextScreen();
  }

  goNextScreen() {
    Router.showScreenRules();
  }
}

export default ScreenGreetingPresenter;
