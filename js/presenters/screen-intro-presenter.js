import AbstractPresenter from './abstract-presenter.js';
import ScreenIntroView from '../views/screen-intro-view.js';
import Router from '../router.js';

export default class ScreenIntroPresenter extends AbstractPresenter {
  constructor() {
    super();
    this.view = new ScreenIntroView();
    this.view.onGoNextButtonClick = () => this.goNextScreen();
  }

  goNextScreen() {
    Router.showScreenGreeting();
  }
}
