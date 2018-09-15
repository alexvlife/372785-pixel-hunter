import AbstractPresenter from './abstract-presenter.js';
import ScreenGreetingView from '../views/screen-greeting-view.js';
import Router from '../router.js';

export default class ScreenGreetingPresenter extends AbstractPresenter {
  constructor() {
    super();
    this.view = new ScreenGreetingView();
    this.view.onGoNextButtonClick = () => this.goNextScreen();
  }

  goNextScreen() {
    Router.showScreenRules();
  }
}
