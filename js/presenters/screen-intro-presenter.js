import AbstractPresenter from './abstract-presenter.js';
import ScreenIntroView from '../view/screen-intro-view.js';
import Router from '../router.js';

class ScreenIntroPresenter extends AbstractPresenter {
  constructor() {
    super();
    this.view = new ScreenIntroView();
    this.view.onGoNextButtonClick = () => this.goNextScreen();
  }

  goNextScreen() {
    Router.showScreenGreeting();
  }
}

export default ScreenIntroPresenter;
