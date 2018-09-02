import {AnswerScoreType} from '../game-logic';
import {AnswerTimeType} from '../game-config';

export default class Answer {
  constructor(isCorrect, time) {
    this.isCorrect = isCorrect;
    this.time = time;
    this.score = 0;
  }
  calcScoring() {
    switch (true) {
      case (this.time <= AnswerTimeType.FAST):
        this.score = AnswerScoreType.CORRECT + AnswerScoreType.FAST;
        break;
      case (this.time > AnswerTimeType.SLOW):
        this.score = AnswerScoreType.CORRECT + AnswerScoreType.SLOW;
        break;
      default:
        this.score = AnswerScoreType.CORRECT;
        break;
    }
    this.score *= this.isCorrect;
    return this.score;
  }
}
