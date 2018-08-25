export class Answer {
  constructor(isTrue, time) {
    this.isTrue = isTrue;
    this.time = time;
    this.score = 0;
  }
  calcScoring(AnswerTimeType, AnswerScoreType) {
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
    this.score *= this.isTrue;
    return this.score;
  }
}
