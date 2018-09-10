import ScreenGameView from '../view/screen-game-view.js';
import Router from '../router.js';
import {PlayerAnswerTypeMap, checkPlayerAnswer, saveAnswerData} from '../answer-logic.js';
import {isGameEnded} from '../game-logic.js';
import {ONE_SECOND} from '../game-config.js';

class ScreenGamePresenter {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.gameModel.makeNewTimer();
    this.gameModel.timer.onTimeElapsed = () => {
      this.stopTimer();
      this.goNextScreen(``, this.gameModel.timer.timeLimit);
    };

    this.view = new ScreenGameView(this.gameModel.currentState, this.gameModel.currentQuestion);
    this.view.onGoBackButtonClick = () => this.goBackScreen();
    this.view.onAnswer = (evt) => {
      const playerAnswer = this.getPlayerAnswer(evt);
      if (playerAnswer) {
        this.stopTimer();
        this.goNextScreen(playerAnswer, this.gameModel.timer.timeLimit);
      }
    };

    this._timeout = null;
  }

  get element() {
    return this.view.element;
  }

  startTimer() {
    this._timeout = setTimeout(() => {
      this.gameModel.timer.tick();
      this.startTimer();
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(this._timeout);
  }

  getPlayerAnswer(evt) {
    return PlayerAnswerTypeMap[this.gameModel.currentQuestion.type](evt);
  }

  goNextScreen(playerAnswer, answerTime) {
    const answerKind = checkPlayerAnswer(playerAnswer, this.gameModel.currentQuestion.rightAnswer);
    const answer = saveAnswerData(this.gameModel.currentState.level, answerKind, answerTime);
    this.stopTimer();
    this.gameModel.updateState(answer);
    this.gameModel.updateCurrentQuestion();
    this.gameModel.makeNewTimer();

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
