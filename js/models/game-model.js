import {AnswerTimeType, EMPTY_ANSWER_DATA, INITIAL_GAME_STATE} from "../game-config";
import {checkPlayerAnswer, PlayerAnswerTypeMap, saveAnswerData} from "../answer-logic";
import {getNewGameState} from "../game-logic";
import {makeTimer} from "../timer";

export default class GameModel {
  constructor(playerName, questions) {
    this.playerName = playerName;
    this.questions = questions;
    this.timer = makeTimer(AnswerTimeType.LIMIT);
    this.defaultAnswers = this.questions.map((name, index) => {
      return saveAnswerData(index, EMPTY_ANSWER_DATA, EMPTY_ANSWER_DATA);
    });
    this.currentState = Object.assign({}, this.initialState, {
      answers: this.defaultAnswers
    });
    this.currentQuestion = this.questions[this.currentState.level];
  }

  get initialState() {
    return Object.freeze(INITIAL_GAME_STATE);
  }

  saveAnswerData() {
    const answerKind = checkPlayerAnswer(this.playerAnswer, this.currentQuestion.rightAnswer);
    this.answerData = saveAnswerData(this.currentState.level, answerKind, this.timer.timeLeft);
    this.updateState();
  }

  updateState() {
    this.currentState = getNewGameState(this.currentState, this.answerData);
    this.updateCurrentQuestion();
  }

  updateCurrentQuestion() {
    this.currentQuestion = this.questions[this.currentState.level];
  }

  addPlayerAnswer(evt) {
    this.playerAnswer = PlayerAnswerTypeMap[this.currentQuestion.type](evt);
  }

}
