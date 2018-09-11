import AbstractPresenter from './abstract-presenter.js';
import ScreenGameView from '../view/screen-game-view.js';
import Router from '../router.js';
import {isGameEnded} from '../game-logic.js';
import {EMPTY_STRING, ONE_SECOND} from '../game-config.js';

class ScreenGamePresenter extends AbstractPresenter {
  constructor(gameModel) {
    super();
    this.gameModel = gameModel;
    this.gameModel.timer.onTimeElapsed = () => {
      this.gameModel.playerAnswer = EMPTY_STRING;
      this.gameModel.saveAnswerData();
      this.goNextScreen();
    };

    this.view = this.generateView();

    this._timeout = null;
  }

  startTimer() {
    this._timeout = setTimeout(() => {
      this.gameModel.timer.tick();
      this.view.updateGameTimer(this.gameModel.timer.timeLeft);
      this.startTimer();
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(this._timeout);
  }

  goNextScreen() {
    if (isGameEnded(this.gameModel.currentState, this.gameModel.questions)) {
      this.stopTimer();
      Router.showScreenStats(this.gameModel.currentState);
    } else {
      this.gameModel.timer.reset();
      this.view = this.generateView();
      this.show();
    }
  }

  generateView() {
    const view = new ScreenGameView(this.gameModel.currentState, this.gameModel.currentQuestion);
    view.updateGameTimer(this.gameModel.timer.timeLeft);
    view.onGoBackButtonClick = () => this.goBackScreen();
    view.onAnswer = (evt) => {
      this.gameModel.addPlayerAnswer(evt);
      if (this.gameModel.playerAnswer) {
        this.gameModel.saveAnswerData();
        this.goNextScreen();
      }
    };
    return view;
  }

  goBackScreen() {
    Router.showScreenGreeting();
  }
}

export default ScreenGamePresenter;
