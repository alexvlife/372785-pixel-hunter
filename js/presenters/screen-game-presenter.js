import AbstractPresenter from './abstract-presenter.js';
import ScreenGameView from '../views/screen-game-view.js';
import Router from '../router.js';
import {isGameEnded} from '../game-logic.js';
import {EMPTY_ANSWER_DATA, ONE_SECOND} from '../game-config.js';
import {TIME_TO_FLASH} from '../timer.js';

const FLASH_TIMEOUT = 500;

export default class ScreenGamePresenter extends AbstractPresenter {
  constructor(gameModel) {
    super();
    this.gameModel = gameModel;
    this.gameModel.timer.onTimeElapsed = () => {
      this.stopFlash();
      this.gameModel.playerAnswer = EMPTY_ANSWER_DATA;
      this.gameModel.saveAnswerData();
      this.goNextScreen();
    };
    this.gameModel.timer.onTimeToFlash = () => {
      this.startFlash();
    };

    this.view = this.generateView();

    this._timeout = null;
  }

  init() {
    this.startTimer();
    this.show();
  }

  startTimer() {
    this._timeout = setTimeout(() => {
      this.gameModel.timer.tick();
      this.view.updateGameTimer(this.gameModel.timer.timeLeft);
      if (this.gameModel.timer.timeLeft <= TIME_TO_FLASH) {
        this.view.switchOpacityOfElement();
      }
      if (!isGameEnded(this.gameModel.currentState, this.gameModel.questions)) {
        this.startTimer();
      }
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(this._timeout);
  }

  startFlash() {
    this._flashTimeout = setTimeout(() => {
      this.view.switchOpacityOfElement();
    }, FLASH_TIMEOUT);
  }

  stopFlash() {
    clearTimeout(this._flashTimeout);
  }

  goNextScreen() {
    if (isGameEnded(this.gameModel.currentState, this.gameModel.questions)) {
      this.stopTimer();
      Router.showScreenStats(this.gameModel);
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
