import ScreenGameView from '../view/screen-game-view.js';
import Router from '../router.js';
import {PlayerAnswerTypeMap, checkPlayerAnswer, saveAnswerData} from '../answer-logic.js';
import {isGameEnded} from '../game-logic.js';
import {ONE_SECOND} from '../game-config.js';

class ScreenGamePresenter {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.gameModel.addPlayerAnswer = (evt) => {
      this.gameModel.playerAnswer = PlayerAnswerTypeMap[this.gameModel.currentQuestion.type](evt);
    };
    this.gameModel.makeNewTimer();
    this.gameModel.timer.onTimeElapsed = () => {
      this.stopTimer();
      this.gameModel.playerAnswer = ``;
      this.goNextScreen(this.gameModel.playerAnswer, this.gameModel.timer.timeLimit);
    };

    this.view = new ScreenGameView(this.gameModel.currentState, this.gameModel.currentQuestion);
    this.view.updateGameTimer(this.gameModel.timer.timeLimit);
    this.view.onGoBackButtonClick = () => this.goBackScreen();
    this.view.onAnswer = (evt) => {
      this.gameModel.addPlayerAnswer(evt);
      if (this.gameModel.playerAnswer) {
        this.stopTimer();
        this.goNextScreen(this.gameModel.playerAnswer, this.gameModel.timer.timeLimit);
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
      this.view.updateGameTimer(this.gameModel.timer.timeLimit);
      this.startTimer();
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(this._timeout);
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
