import {AnswerTimeType, EMPTY_STRING, INITIAL_GAME_STATE} from "./game-config";
import {saveAnswerData} from "./answer-logic";
import {getNewGameState} from "./game-logic";
import {makeTimer} from "./timer";

class GameModel {
  constructor(playerName, questions) {
    this.playerName = playerName;
    this.questions = questions;
    this.timer = makeTimer(AnswerTimeType.LIMIT);
    this.defaultAnswers = this.questions.map((name, index) => {
      return saveAnswerData(index, EMPTY_STRING, EMPTY_STRING);
    });
    this.currentState = Object.assign({}, this.initialState, {
      answers: this.defaultAnswers
    });
    this.currentQuestion = this.questions[this.currentState.level];
  }

  get initialState() {
    return Object.freeze(INITIAL_GAME_STATE);
  }

  updateState(answer) {
    this.currentState = getNewGameState(this.currentState, answer);
  }

  updateCurrentQuestion() {
    this.currentQuestion = this.questions[this.currentState.level];
  }

  addPlayerAnswer() {
  }

  saveAnswerData() {
  }
}

export default GameModel;
