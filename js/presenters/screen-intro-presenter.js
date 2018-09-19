import AbstractPresenter from './abstract-presenter.js';
import ScreenIntroView from '../views/screen-intro-view.js';

export default class ScreenIntroPresenter extends AbstractPresenter {
  constructor() {
    super();
    this.view = new ScreenIntroView();
  }
}
