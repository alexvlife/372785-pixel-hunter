import {showScreen} from "../utilsForBrowser";

export default class AbstractPresenter {
  constructor() {
    if (new.target === AbstractPresenter) {
      throw new Error(`Can't instantiate AbstractPresenter, only concrete one`);
    }
  }

  show() {
    showScreen(this.view.element);
  }
}
