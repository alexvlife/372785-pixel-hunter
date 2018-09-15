import AbstractPresenter from './abstract-presenter.js';
import ScreenErrorView from '../views/screen-error-view.js';

export default class ScreenErrorPresenter extends AbstractPresenter {
  constructor(error) {
    super();
    this.view = new ScreenErrorView(error);
  }
}
