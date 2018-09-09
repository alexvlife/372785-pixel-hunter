import {INITIAL_GAME_STATE} from "./game-config";
import {saveAnswerData} from "./answer-logic";
import {getNewGameState} from "./game-logic";

class GameModel {
  constructor(playerName, questions) {
    this.playerName = playerName;
    this.questions = questions;
    this.currentState = this.addCurrentState();
    this.currentQuestion = this.getCurrentQuestion();
  }

  get initialState() {
    return Object.freeze(INITIAL_GAME_STATE);
  }

  addCurrentState() {
    const answers = this.getDefaultAnswers();
    return Object.assign({}, this.initialState, {answers});
  }

  updateState(answer) {
    this.currentState = getNewGameState(this.currentState, answer);
  }

  getCurrentQuestion() {
    return this.questions[this.currentState.level];
  }

  updateCurrentQuestion() {
    this.currentQuestion = this.questions[this.currentState.level];
  }

  getDefaultAnswers() {
    return this.questions.map((name, index) => {
      return saveAnswerData(index, ``, ``);
    });
  }

}

export default GameModel;
