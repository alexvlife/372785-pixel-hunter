import AbstractPresenter from './abstract-presenter.js';
import ScreenErrorView from '../view/screen-error-view.js';

class ScreenErrorPresenter extends AbstractPresenter {
  constructor(error) {
    super();
    this.view = new ScreenErrorView(error);
  }
}

export default ScreenErrorPresenter;
