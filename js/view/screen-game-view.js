import AbstractView from "./abstract-view";
import getHeaderTemplate from "../templates/header.template";
import getLevelTemplate from "../templates/level.template";
import {UserAnswerTypeMap, checkUserAnswer, saveAnswerData} from "../answer-logic";
import {getNewGameState, goStatsScreen} from "../game-logic";
import getStatsScreenElement from "../screen-04-stats";
import getGameScreenElement from "../screen-03-game";
import {showScreen} from "../utilsForBrowser";

export default class ScreenGameView extends AbstractView {

  constructor(gameState, questions) {
    super();
    this.gameState = gameState;
    this.questions = questions;
    this.currentQuestion = questions[gameState.level];
  }

  get template() {
    return getHeaderTemplate(this.gameState.lives)
      + getLevelTemplate(this.gameState.answers, this.currentQuestion);
  }

  bind() {
    const goBackButton = this.element.querySelector(`.back`);

    goBackButton.addEventListener(`click`, () => {
      this.onGoBackButtonClick();
    });

    this._element.addEventListener(`click`, (evt) => {
      this.onAnswer(evt);
    });
  }

  onAnswer(evt) {
    const userAnswer = this.getUserAnswer(evt);

    if (userAnswer) {
      const answerTime = 15; // заглушка (в данном задании - таймер не требуется).
      const answerKind = checkUserAnswer(userAnswer, this.currentQuestion.rightAnswer);
      const answer = saveAnswerData(this.gameState.level, answerKind, answerTime);
      const newGameState = getNewGameState(this.gameState, answer);
      const nextScreen = (goStatsScreen(newGameState, this.questions)) ? getStatsScreenElement(newGameState)
        : getGameScreenElement(newGameState, this.questions);
      showScreen(nextScreen);
    }
  }

  getUserAnswer(evt) {
    return UserAnswerTypeMap[this.currentQuestion.type](evt);
  }

  onGoBackButtonClick() {
  }
}
