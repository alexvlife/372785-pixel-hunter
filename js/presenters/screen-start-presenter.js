import AbstractPresenter from './abstract-presenter.js';
import ScreenStartView from '../views/screen-start-view.js';
import Router from '../router.js';

export default class ScreenStartPresenter extends AbstractPresenter {
  constructor() {
    super();
    this.view = new ScreenStartView();
    this.view.onGoNextButtonClick = () => this.goNextScreen();
  }

  goNextScreen() {
    this.view.removeEventListeners();
    Router.showScreenRules();
  }

  onDataLoad() {
    this.view.hideIntro();
    this.view.showGreeting();
  }
}
