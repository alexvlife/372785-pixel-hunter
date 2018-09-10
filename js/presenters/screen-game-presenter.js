import AbstractPresenter from './abstract-presenter.js';
import ScreenGameView from '../view/screen-game-view.js';
import Router from '../router.js';
import {PlayerAnswerTypeMap, checkPlayerAnswer, saveAnswerData} from '../answer-logic.js';
import {isGameEnded} from '../game-logic.js';
import {ONE_SECOND} from '../game-config.js';

class ScreenGamePresenter extends AbstractPresenter {
  constructor(gameModel) {
    super();
    this.gameModel = gameModel;
    this.gameModel.addPlayerAnswer = (evt) => {
      this.gameModel.playerAnswer = PlayerAnswerTypeMap[this.gameModel.currentQuestion.type](evt);
    };
    this.gameModel.saveAnswerData = () => {
      const answerKind = checkPlayerAnswer(this.gameModel.playerAnswer, this.gameModel.currentQuestion.rightAnswer);
      this.gameModel.answerData = saveAnswerData(this.gameModel.currentState.level, answerKind, this.gameModel.timer.timeLeft);
    };
    this.gameModel.timer.onTimeElapsed = () => {
      this.stopTimer();
      this.gameModel.playerAnswer = ``;
      this.goNextScreen();
    };

    this.view = new ScreenGameView(this.gameModel.currentState, this.gameModel.currentQuestion);
    this.view.updateGameTimer(this.gameModel.timer.timeLeft);
    this.view.onGoBackButtonClick = () => this.goBackScreen();
    this.view.onAnswer = (evt) => {
      this.gameModel.addPlayerAnswer(evt);
      if (this.gameModel.playerAnswer) {
        this.stopTimer();
        this.goNextScreen();
      }
    };

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
    this.stopTimer();
    this.gameModel.saveAnswerData();
    this.gameModel.updateState(this.gameModel.answerData);
    this.gameModel.updateCurrentQuestion();
    this.gameModel.timer.reset();

    if (isGameEnded(this.gameModel.currentState, this.gameModel.questions)) {
      Router.showScreenStats(this.gameModel.currentState);
    } else {
      Router.showScreenGameLevel(this.gameModel);
    }
  }

  goBackScreen() {
    Router.showScreenGreeting();
  }
}

export default ScreenGamePresenter;
