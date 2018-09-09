import ScreenGameView from '../view/screen-game-view.js';
import Router from '../router.js';
import {PlayerAnswerTypeMap, checkPlayerAnswer, saveAnswerData} from '../answer-logic.js';
import {goStatsScreen} from '../game-logic.js';

class ScreenGamePresenter {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.content = new ScreenGameView(this.gameModel.currentState, this.gameModel.currentQuestion);
    this.content.onGoNextButtonClick = () => this.goNextScreen();
    this.content.onGoBackButtonClick = () => this.goBackScreen();
    this.content.onAnswer = (evt) => {
      const playerAnswer = this.getPlayerAnswer(evt);
      if (playerAnswer) {
        this.goNextScreen(playerAnswer);
      }
    };
  }

  get element() {
    return this.content.element;
  }

  getPlayerAnswer(evt) {
    return PlayerAnswerTypeMap[this.gameModel.currentQuestion.type](evt);
  }

  goNextScreen(playerAnswer) {
    const answerTime = 15; // заглушка (в данном задании - таймер не требуется).
    const answerKind = checkPlayerAnswer(playerAnswer, this.gameModel.currentQuestion.rightAnswer);
    const answer = saveAnswerData(this.gameModel.currentState.level, answerKind, answerTime);
    this.gameModel.updateState(answer);
    this.gameModel.updateCurrentQuestion();

    if (goStatsScreen(this.gameModel.currentState, this.gameModel.questions)) {
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
